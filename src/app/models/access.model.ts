export enum Tools {
  Gmail = 'Gmail',
  Jira = 'Jira',
  GitHub = 'GitHub',
  Slack = 'Slack',
  Postman = 'Postman',
  AWS = 'AWS',
}

export type Access<T> = {
  [key in keyof typeof Tools]: T;
};

export type ClientAccessItem = boolean;

export interface UpdateAccessActionPayload {
  userId: number;
  tool: Tools;
}
