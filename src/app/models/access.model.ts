import { Client, User } from "./profile.model";

export enum Tools {
  Email,
  Jira,
  GitHub,
  Slack,
  Postman,
  AWS,
}

export type Access = {
  [key in keyof typeof Tools]: boolean;
}

export interface UserAccess {
  user: User;
  access: Access;
}

export interface ClientAccess {
  client: Client;
  access: Access;
}
