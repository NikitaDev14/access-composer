import { ClientState } from "./client.state";
import { UsersState } from "./users.state";

export interface AppState {
  client: ClientState,
  users: UsersState,
}
