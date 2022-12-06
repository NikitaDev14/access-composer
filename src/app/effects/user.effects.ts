import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, of } from "rxjs";

import { UPDATE_USER_ACCESS_ACTION, UpdatedUserAccessAction, UpdateUserAccessAction } from "../actions/users.action";
import { UpdateAccessActionPayload } from "../models/access.model";
import { AccessService } from "../services/access.service";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private accessService: AccessService,
  ) { }

  updateAccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_USER_ACCESS_ACTION),
      map((action: UpdateUserAccessAction) => action.payload),
      mergeMap((payload: UpdateAccessActionPayload) =>
        this.accessService.updateAccess().pipe(
          mergeMap(() =>
            of(new UpdatedUserAccessAction(payload)),
          ),
        )
      ),
    ),
  );
}
