import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { KeyValue } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable, shareReplay, Subscription, tap } from "rxjs";

import { AppState } from "../../../states";
import { Access } from "../../../models/access.model";
import { selectClientAccess, selectIsLoadingClientAccess } from "../../../selectors/client.selectors";
import { ClientAccessInitializeAction } from "../../../actions/client.actions";
import { initialClientState } from "../../../states/client.state";

@Component({
  selector: 'app-client-access-form',
  templateUrl: './client-access-form.component.html',
  styleUrls: ['./client-access-form.component.scss']
})
export class ClientAccessFormComponent implements OnInit, OnDestroy {
  public accessForm: FormGroup = this.getAccessFormGroup();

  public isLoading$!: Observable<boolean>;

  private formValuesSubscription$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectIsLoadingClientAccess).pipe(
      tap((isLoading: boolean) => {
        if (isLoading) {
          this.accessForm.disable();
        } else {
          this.accessForm.enable();
        }
      }),
      shareReplay(1),
    );

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
    }
  }
}
