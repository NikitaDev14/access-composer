import { clientAccess } from "../fixtures/client.fixtures";
import { Client } from "../models/profile.model";
import { Access } from "../models/access.model";

export interface ClientAccessState {
  client: Client;
  access: Access<boolean>;
}

export interface ClientState {
  clientAccess: ClientAccessState;
}

export const initialClientState: ClientState = {
  clientAccess: clientAccess,
};
