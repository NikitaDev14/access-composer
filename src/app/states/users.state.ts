import { User } from "../models/profile.model";
import { Access } from "../models/access.model";

export interface UserAccessItemState {
  hasAccess: boolean;
  isLoading: boolean;
}

export interface UserAccessState {
  user: User;
  access: Access<UserAccessItemState>;
}

export type UsersState = UserAccessState[]

export const initialUsersState: UsersState = [];
