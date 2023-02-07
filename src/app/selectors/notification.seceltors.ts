import { createSelector } from "@ngrx/store";

import { AppState } from "../states";
import { NotificationsState } from "../states/notifications.state";
import { NotificationModel } from "../models/notifications.model";

const selectNotificationsState = (appState: AppState): NotificationsState => appState.notifications;

export const selectNotifications = createSelector(
  selectNotificationsState,
  (notificationsState: NotificationsState): NotificationModel[] => [...notificationsState.notifications.values()],
);
