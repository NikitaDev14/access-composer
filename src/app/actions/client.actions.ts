import { Action } from '@ngrx/store';

import { Access } from "../models/access.model";

export const CLIENT_INITIALIZED_ACTION = '[ClientActions] CLIENT_INITIALIZED_ACTION';
export const CLIENT_ACCESS_INITIALIZED_ACTION = '[ClientActions] ACCESS_INITIALIZED_ACTION';

export class ClientInitializedAction implements Action {
  public readonly type = CLIENT_INITIALIZED_ACTION;
  constructor(public payload: string) { }
}

export class ClientAccessInitializedAction implements Action {
  public readonly type = CLIENT_ACCESS_INITIALIZED_ACTION;
  constructor(public payload: Access<boolean>) { }
}

export type ClientActions =
  ClientInitializedAction |
  ClientAccessInitializedAction;
