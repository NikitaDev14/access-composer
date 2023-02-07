import { ClientState } from "./client.state";
import { UsersState } from "./users.state";
import { NotificationsState } from "./notifications.state";

export interface AppState {
  client: ClientState,
  users: UsersState,
  notifications: NotificationsState,
}
