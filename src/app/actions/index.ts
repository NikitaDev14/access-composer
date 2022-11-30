import { ClientActions } from "./client.actions";
import { UsersActions } from "./users.action";

export type AppActions =
  ClientActions &
  UsersActions;
