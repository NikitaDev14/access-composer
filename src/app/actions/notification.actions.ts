import { Action } from "@ngrx/store";

import { NotificationClientAccess, NotificationModel } from "../models/notifications.model";

export const NOTIFICATION_SHOW = '[NotificationActions] NOTIFICATION_SHOW';
export const NOTIFICATION_HIDE = '[NotificationActions] NOTIFICATION_HIDE';
export const NOTIFY_CLIENT_ACCESS = '[NotificationActions] NOTIFY_CLIENT_ACCESS';

export class NotificationShow implements Action {
  public readonly type = NOTIFICATION_SHOW;
  constructor(public payload: NotificationModel) { }
}

export class NotificationHide implements Action {
  public readonly type = NOTIFICATION_HIDE;
  constructor(public payload: NotificationModel['id']) { }
}

export class NotifyClientAccess implements Action {
  public readonly type = NOTIFY_CLIENT_ACCESS;
  constructor(public payload: NotificationClientAccess) { }
}

export type NotificationActions =
  NotificationShow |
  NotificationHide |
  NotifyClientAccess;
