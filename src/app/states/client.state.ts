import { Client } from "../models/profile.model";
import { Access } from "../models/access.model";

export interface ClientAccessState {
  client: Client;
  access: Access<boolean>;
  isLoading: boolean;
}

export interface ClientState {
  clientAccess: ClientAccessState;
}

export const initialClientState: ClientState = {
  clientAccess: {
    client: {
      domain: 'google.com',
    },
    access: {
      Gmail: false,
      Slack: false,
      Postman: false,
      AWS: false,
      Jira: false,
      GitHub: false,
    },
    isLoading: false,
  },
};
