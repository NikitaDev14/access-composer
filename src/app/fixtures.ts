import { User } from "./models/profile.model";
import { Access, UserAccess } from "./models/access.model";

export const users: User[] = [{
  id: 1,
  name: 'Bill Gates',
  title: 'Developer',
  joiningDate: new Date('11/22/22'),
}, {
  id: 2,
  name: 'Tim Cook',
  title: 'Developer',
  joiningDate: new Date(),
}];

const developersAccess: Access = {
  AWS: false,
  Email: true,
  Jira: true,
  GitHub: true,
  Postman: true,
  Slack: true,
};

const newComerAccess: Access = {
  AWS: false,
  Email: true,
  Jira: false,
  GitHub: false,
  Postman: false,
  Slack: false,
};

export const usersAccess: UserAccess[] = [{
  user: users[0],
  access: developersAccess,
}, {
  user: users[1],
  access: newComerAccess,
}];
