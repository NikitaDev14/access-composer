import { Action } from '@ngrx/store';

import { Access, UpdateAccessActionPayload } from "../models/access.model";
import { UserAccess } from "../fixtures/user.fixtures";

export const LOAD_USERS_ACCESS_ACTION = '[UsersActions] LOAD_USERS_ACCESS_ACTION';
export const USER_ACCESS_INITIALIZED_ACTION = '[UsersActions] ACCESS_INITIALIZED_ACTION';
export const UPDATE_USER_ACCESS_ACTION = '[UsersActions] UPDATE_USER_ACCESS_ACTION';
export const UPDATED_USER_ACCESS_ACTION = '[UsersActions] UPDATED_USER_ACCESS_ACTION';

export class LoadUsersAccessAction implements Action {
  public readonly type = LOAD_USERS_ACCESS_ACTION;
  constructor(public payload: UserAccess[]) { }
}

export class UserAccessInitializedAction implements Action {
  public readonly type = USER_ACCESS_INITIALIZED_ACTION;
  constructor(public payload: Access<boolean>) { }
}

export class UpdateUserAccessAction implements Action {
  public readonly type = UPDATE_USER_ACCESS_ACTION;
  constructor(public payload: UpdateAccessActionPayload) { }
}

export class UpdatedUserAccessAction implements Action {
  public readonly type = UPDATED_USER_ACCESS_ACTION;
  constructor(public payload: UpdateAccessActionPayload) { }
}

export type UsersActions =
  LoadUsersAccessAction |
  UserAccessInitializedAction |
  UpdateUserAccessAction |
  UpdatedUserAccessAction;
