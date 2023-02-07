import { ActionReducerMap } from "@ngrx/store";

import { AppState } from "../states";
import { AppActions } from "../actions";
import { clientReducer } from "./client.reducer";
import { usersReducer } from "./users.reducer";
import { notificationsReducer } from "./notifications.reducer";

export const reducers: ActionReducerMap<AppState, AppActions> = {
  client: clientReducer,
  users: usersReducer,
  notifications: notificationsReducer,
};
