import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { KeyValue } from "@angular/common";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AppState } from "../../../states";
import { Access, Tools } from "../../../models/access.model";
import { selectClientAccess } from "../../../selectors/client.selectors";
import { ClientAccessInitializeAction } from "../../../actions/client.actions";
import { RoutePaths } from "../../../route-paths.enum";
import { initialClientState } from "../../../states/client.state";

@Component({
  selector: 'app-client-access-form',
  templateUrl: './client-access-form.component.html',
  styleUrls: ['./client-access-form.component.scss']
})
export class ClientAccessFormComponent implements OnInit, OnDestroy {
  public accessForm: FormGroup = this.getAccessFormGroup();

  private formValuesSubscription$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.formValuesSubscription$ = this.store.select(selectClientAccess).subscribe((access: Access<boolean>) => {
      Object.entries(access).forEach((accessItem: [string, boolean]) => {
        this.accessForm.get(accessItem[0])?.patchValue(accessItem[1]);
      });
    });
  }

  ngOnDestroy() {
    this.formValuesSubscription$.unsubscribe();
  }

  private getAccessFormGroup(): FormGroup {
    const result = this.fb.group({});

    Object
      .entries(initialClientState.clientAccess.access)
      .forEach((accessItem: [string, boolean]) => {
        result.addControl(
          accessItem[0],
          this.fb.control(accessItem[1]),
        );
      });

    return result;
  }

  public trackFn(index: number, accessItem: KeyValue<string, AbstractControl>): string {
    return accessItem.key;
  }

  public submit() {
    if (this.accessForm.valid) {
      this.store.dispatch(new ClientAccessInitializeAction(this.accessForm.value as Access<boolean>));

      this.router.navigate([RoutePaths.DEMO, RoutePaths.USERS_ACCESS]);
    }
  }
}
