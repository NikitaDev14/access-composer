import { Access } from "./access.model";

export interface NotificationModel {
  id: number;
  text: string;
}

export type NotificationsList = NotificationModel[];

export interface NotificationClientAccess {
  prevValue: Access<boolean>;
  newValue: Access<boolean>;
}
