import { NotificationsList } from "../models/notifications.model";

export interface NotificationsState {
  notifications: NotificationsList;
}

export const initialNotificationsState: NotificationsState = {
  notifications: new Map(),
};
