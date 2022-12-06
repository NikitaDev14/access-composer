import {
  LOAD_USERS_ACCESS_ACTION,
  UPDATE_USER_ACCESS_ACTION,
  UPDATED_USER_ACCESS_ACTION,
  USER_ACCESS_INITIALIZED_ACTION,
  UsersActions
} from "../actions/users.action";
import { initialUsersState, UserAccessItemState, UserAccessState, UsersState } from "../states/users.state";
import { Access, Tools } from "../models/access.model";
import { UserAccess } from "../fixtures/user.fixtures";

export const usersReducer = (
  state: UsersState = initialUsersState,
  action: UsersActions,
): UsersState => {
  switch (action.type) {
    case USER_ACCESS_INITIALIZED_ACTION: {
      return {
        ...state,
        usersAccess: state.usersAccess.map((userAccess: UserAccessState) => {
          return {
            ...userAccess,
            access: Object.fromEntries(
              Object.entries(userAccess.access).map((userAccessEntry: [string, UserAccessItemState]): [keyof Tools, UserAccessItemState] => {
                return [
                  userAccessEntry[0] as keyof Tools,
                  {
                    hasAccess: action.payload[userAccessEntry[0] as keyof Access<boolean>],
                    isLoading: false,
                  },
                ];
              }),
            ) as Access<UserAccessItemState>,
          };
        }),
      };
    }

    case LOAD_USERS_ACCESS_ACTION: {
      return {
        ...state,
        usersAccess: action.payload.map((userAccess: UserAccess) => {
          return {
            user: userAccess.user,
            access: Object.fromEntries(
              Object.entries(userAccess.access).map((accessEntry: [string, boolean]): [keyof Tools, UserAccessItemState] => {
                return [
                  accessEntry[0] as keyof Tools,
                  {
                    hasAccess: accessEntry[1],
                    isLoading: false,
                  }
                ];
              }),
            ) as Access<UserAccessItemState>,
          };
        }),
      };
    }

    case UPDATE_USER_ACCESS_ACTION: {
      return {
        ...state,
        usersAccess: state.usersAccess.map((userAccess: UserAccessState) => {
          if (userAccess.user.id !== action.payload.userId) {
            return userAccess;
          }

          return {
            ...userAccess,
            access: {
              ...userAccess.access,
              [action.payload.tool]: {
                hasAccess: userAccess.access[action.payload.tool].hasAccess,
                isLoading: true,
              },
            }
          };
        }),
      };
    }

    case UPDATED_USER_ACCESS_ACTION: {
      return {
        ...state,
        usersAccess: state.usersAccess.map((userAccess: UserAccessState) => {
          if (userAccess.user.id !== action.payload.userId) {
            return userAccess;
          }

          return {
            ...userAccess,
            access: {
              ...userAccess.access,
              [action.payload.tool]: {
                hasAccess: !userAccess.access[action.payload.tool].hasAccess,
                isLoading: false,
              },
            }
          };
        }),
      };
    }

    default:
      return state;
  }
};
