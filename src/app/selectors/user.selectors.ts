import { AppState } from "../states";
import { UserAccessState, UsersState } from "../states/users.state";
import { createSelector } from "@ngrx/store";

export const selectUsers = (appState: AppState): UsersState => appState.users;

export const selectUsersAccess = createSelector(
  selectUsers,
  (usersState: UsersState): UserAccessState[] => usersState.usersAccess,
);
