import { Access } from "./access.model";

export interface NotificationModel {
  id: number;
  text: string;
}

export type NotificationsList = Map<NotificationModel['id'], NotificationModel>;

export interface NotificationClientAccess {
  prevValue: Access<boolean>;
  newValue: Access<boolean>;
}
