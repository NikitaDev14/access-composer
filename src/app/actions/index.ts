import { ClientActions } from "./client.actions";
import { UsersActions } from "./users.action";
import { NotificationActions } from "./notification.actions";

export type AppActions =
  ClientActions &
  UsersActions &
  NotificationActions;
