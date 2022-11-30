import { initialUsersState, UsersState } from "../states";
import { UsersActions } from "../actions/users.action";

export const usersReducer = (
  state: UsersState = initialUsersState,
  action: UsersActions,
): UsersState => {
  switch (action.type) {
    default:
      return state;
  }
};
