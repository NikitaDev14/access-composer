import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { mergeMap, of, withLatestFrom } from "rxjs";

import { UPDATE_USER_ACCESS_ACTION, UpdatedUserAccessAction, UpdateUserAccessAction } from "../actions/users.action";
import { AccessService } from "../services/access.service";
import { NotificationFacadeService } from "../services/notification-facade.service";
import { AppState } from "../states";
import { selectUsersAccess } from "../selectors/user.selectors";
import { UserAccessState } from "../states/users.state";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private accessService: AccessService,
    private notificationFacade: NotificationFacadeService,
  ) { }

  updateAccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_USER_ACCESS_ACTION),
      withLatestFrom(this.store.select(selectUsersAccess)),
      mergeMap(([action, usersState]: [UpdateUserAccessAction, UserAccessState[]]) =>
        this.accessService.updateAccess().pipe(
          mergeMap(() => {
            const userAccessState: UserAccessState = usersState.find((userState: UserAccessState) => userState.user.id === action.payload.userId)!;

            this.notificationFacade.notifyAboutUserAccess(
              action.payload.tool,
              userAccessState.user,
              !userAccessState.access[action.payload.tool].hasAccess,
              );

            return of(new UpdatedUserAccessAction(action.payload));
          }),
        ),
      ),
    ),
  );
}
