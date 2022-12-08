import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";

import {
  CLIENT_ACCESS_INITIALIZE_ACTION, ClientAccessInitializeAction,
  ClientAccessInitializedAction
} from "../actions/client.actions";
import { Access } from "../models/access.model";
import { UserAccessInitializedAction } from "../actions/users.action";
import { NotificationFacadeService } from "../services/notification-facade.service";
import { selectClientAccess } from "../selectors/client.selectors";
import { AppState } from "../states";

@Injectable()
export class ClientEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private notificationFacadeService: NotificationFacadeService,
  ) { }

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CLIENT_ACCESS_INITIALIZE_ACTION),
      withLatestFrom(this.store.select(selectClientAccess)),
      switchMap(([action, currentAccess]: [ClientAccessInitializeAction, Access<boolean>]) => {
        debugger;

        this.notificationFacadeService.notifyAboutClientAccess(action.payload, currentAccess);

        return [
          new ClientAccessInitializedAction(action.payload),
          new UserAccessInitializedAction(action.payload),
        ];
      }),
    ),
  );
}
