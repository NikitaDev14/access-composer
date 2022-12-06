import { ClientAccessState } from "../states/client.state";

export const clientAccess: ClientAccessState = {
  client: {
    domain: 'google.com',
  },
  access: {
    Email: true,
    GitHub: false,
    Postman: false,
    Slack: false,
    Jira: false,
    AWS: true,
  }
};

