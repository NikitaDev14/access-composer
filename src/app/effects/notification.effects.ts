import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, filter, map, mergeMap, of, race, switchMap } from "rxjs";

import { AppState } from "../states";
import { NotificationFacadeService } from "../services/notification-facade.service";
import {
  NOTIFICATION_FORCE_HIDE,
  NOTIFICATION_SHOW, NotificationForceHide, NotificationHide,
  NotificationShow,
  NOTIFY_CLIENT_ACCESS,
  NotifyClientAccess
} from "../actions/notification.actions";
import { NotificationClientAccess, NotificationModel } from "../models/notifications.model";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class NotificationEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private notificationFacadeService: NotificationFacadeService,
  ) { }

  initClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NOTIFY_CLIENT_ACCESS),
      map((action: NotifyClientAccess) => action.payload),
      switchMap((payload: NotificationClientAccess) => ([
          ...this.notificationFacadeService
            .notificationsFactory(payload.prevValue, payload.newValue)
            .map((notification: NotificationModel) =>
              new NotificationShow(notification),
            ),
        ]),
      ),
    ),
  );

  hideNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NOTIFICATION_SHOW),
      map((action: NotificationShow) => action.payload),
      mergeMap((shownNotification: NotificationModel) =>
        race([
          of(shownNotification).pipe(
            delay(NotificationService.NOTIFICATIONS_DISPLAY_TIME),
          ),
          this.actions$.pipe(
            ofType(NOTIFICATION_FORCE_HIDE),
            map((forceHideAction: NotificationForceHide) => forceHideAction.payload),
            filter((forceHideNotification: NotificationModel) =>
              forceHideNotification.id === shownNotification.id,
            ),
          ),
        ]).pipe(
          map((notification: NotificationModel) =>
            new NotificationHide(notification.id),
          ),
        ),
      ),
    ),
  );
}
