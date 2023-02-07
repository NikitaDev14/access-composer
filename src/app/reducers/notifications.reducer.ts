import { initialNotificationsState, NotificationsState } from "../states/notifications.state";
import { NOTIFICATION_HIDE, NOTIFICATION_SHOW, NotificationActions } from "../actions/notification.actions";

export const notificationsReducer = (
  state: NotificationsState = initialNotificationsState,
  action: NotificationActions,
): NotificationsState => {
  switch (action.type) {
    case NOTIFICATION_SHOW: {
      return {
        ...state,
        notifications: new Map([
          ...state.notifications.entries(),
          [
            action.payload.id,
            action.payload,
          ],
        ]),
      };
    }

    case NOTIFICATION_HIDE: {
      state.notifications.delete(action.payload);

      return {
        ...state,
        notifications: new Map([
          ...state.notifications.entries(),
        ]),
      };
    }

    default:
      return state;
  }
};
