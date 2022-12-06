import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../states";
import { ClientInitializedAction } from "../../../actions/client.actions";
import { Router } from "@angular/router";
import { RoutePaths } from "../../../route-paths.enum";

@Component({
  selector: 'app-init-client-form',
  templateUrl: './init-client-form.component.html',
  styleUrls: ['./init-client-form.component.scss']
})
export class InitClientFormComponent {
  public initClientForm: FormGroup = this.fb.group({
    domain: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  public submit() {
    this.store.dispatch(new ClientInitializedAction(this.initClientForm.get('domain')?.value));

    this.router.navigate([RoutePaths.DEMO, RoutePaths.CLIENT_ACCESS]);
  }
}
