import { Client } from "../models/profile.model";
import { Access } from "../models/access.model";

export interface ClientAccessState {
  client: Client;
  access: Access<boolean>;
  isLoading: boolean;
}

export const initialClientState: ClientAccessState = {
    client: {
      domain: '',
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
};
