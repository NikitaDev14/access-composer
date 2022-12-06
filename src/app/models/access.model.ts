export enum Tools {
  Email = 'Email',
  Jira = 'Jira',
  GitHub = 'GitHub',
  Slack = 'Slack',
  Postman = 'Postman',
  AWS = 'AWS',
}

export type Access<T> = {
  [key in keyof typeof Tools]: T;
}

export interface UpdateAccessActionPayload {
  userId: number;
  tool: Tools;
}
