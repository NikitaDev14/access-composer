import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { KeyValue } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable, shareReplay, Subscription, tap } from "rxjs";

import { AppState } from "../../../states";
import { Access } from "../../../models/access.model";
import { initialClientState } from "../../../states/client.state";
import { ClientService } from "../../../services/client.service";

@Component({
  selector: 'app-client-access-form',
  templateUrl: './client-access-form.component.html',
  styleUrls: ['./client-access-form.component.scss']
})
export class ClientAccessFormComponent implements OnInit {
  public accessForm: FormGroup = this.getAccessFormGroup();

  public isLoading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.clientService.isClientAccessLoading$().pipe(
      tap((isLoading: boolean) => {
        if (isLoading) {
          this.accessForm.disable();
        } else {
          this.accessForm.enable();
        }
      }),
      shareReplay(1),
    );

    Object.entries(this.clientService.getClientAccess()).forEach((accessItem: [string, boolean]) => {
      this.accessForm.get(accessItem[0])?.patchValue(accessItem[1]);
    });
  }

  private getAccessFormGroup(): FormGroup {
    const result = this.fb.group({});

    Object
      .entries(initialClientState.access)
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
      this.clientService.initializeAccess(this.accessForm.value as Access<boolean>);
    }
  }
}
