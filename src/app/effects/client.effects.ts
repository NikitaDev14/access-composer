import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, of, switchMap } from "rxjs";

import { CLIENT_ACCESS_INITIALIZED_ACTION, ClientAccessInitializedAction } from "../actions/client.actions";
import { Access } from "../models/access.model";
import { UserAccessInitializedAction } from "../actions/users.action";

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
  ) { }

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CLIENT_ACCESS_INITIALIZED_ACTION),
      map((action: ClientAccessInitializedAction) => action.payload),
      switchMap((access: Access<boolean>) =>
        of(new UserAccessInitializedAction(access)),
      ),
    ),
  );
}
