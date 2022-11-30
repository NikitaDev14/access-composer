import { ClientAccess, UserAccess } from "./models/access.model";
import { usersAccess } from "./fixtures";

export interface ClientState {
  clientAccess: ClientAccess;
}

export interface UsersState {
  usersAccess: UserAccess[];
}

export interface AppState {
  client: ClientState,
  users: UsersState,
}

export const initialClientState: ClientState = {
  clientAccess: {
    client: {
      domain: '',
    },
    access: {
      Email: false,
      GitHub: false,
      Postman: false,
      Slack: false,
      Jira: false,
      AWS: false,
    }
  },
};

export const initialUsersState: UsersState = {
  usersAccess: usersAccess,
};
