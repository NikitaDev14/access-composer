import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";

import {
  CLIENT_ACCESS_INITIALIZE_ACTION,
  ClientAccessInitializeAction,
  ClientAccessInitializedAction,
} from "../actions/client.actions";
import { Access } from "../models/access.model";
import { UserAccessInitializedAction } from "../actions/users.action";
import { NotificationFacadeService } from "../services/notification-facade.service";
import { selectClientAccess } from "../selectors/client.selectors";
import { AppState } from "../states";
import { AccessService } from "../services/access.service";
import { NotifyClientAccess } from "../actions/notification.actions";

@Injectable()
export class ClientEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private notificationFacadeService: NotificationFacadeService,
    private accessService: AccessService,
  ) { }

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CLIENT_ACCESS_INITIALIZE_ACTION),
      withLatestFrom(this.store.select(selectClientAccess)),
      switchMap(([action, currentAccess]: [ClientAccessInitializeAction, Access<boolean>]) =>
        this.accessService.updateAccess(2000).pipe(
          mergeMap(() => {
            return [
              new ClientAccessInitializedAction(action.payload),
              new UserAccessInitializedAction(action.payload),
              new NotifyClientAccess({
                prevValue: action.payload,
                newValue: currentAccess,
              }),
            ];
          }),
        ),
      ),
    ),
  );
}
