import { Access } from "../models/access.model";
import { User } from "../models/profile.model";

const developersAccess: Access<boolean> = {
  AWS: false,
  Email: true,
  Jira: true,
  GitHub: true,
  Postman: true,
  Slack: true,
};

const newComerAccess: Access<boolean> = {
  AWS: false,
  Email: false,
  Jira: false,
  GitHub: false,
  Postman: false,
  Slack: false,
};

export const users: User[] = [{
  id: 1,
  name: 'Test developer 1',
  title: 'Developer',
  joiningDate: new Date('11/22/22'),
}, {
  id: 2,
  name: 'Test developer 2',
  title: 'Developer',
  joiningDate: new Date(),
}];

export interface UserAccess {
  user: User;
  access: Access<boolean>;
}

export const initialTestUsers: UserAccess[] = [{
  user: users[0],
  access: developersAccess,
}, {
  user: users[1],
  access: newComerAccess,
}];
