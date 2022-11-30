import { Action } from '@ngrx/store';

import { Access } from "../models/access.model";

export const ADD_USER_ACCESS_ACTION = '[UsersActions] ADD_USER_ACCESS';

export class AddUserAccessAction implements Action {
  public readonly type = ADD_USER_ACCESS_ACTION;
  constructor(public payload: string) { }
}

export type UsersActions =
  AddUserAccessAction;
