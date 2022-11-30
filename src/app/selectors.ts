import { createSelector } from "@ngrx/store";

import { AppState, ClientState, UsersState } from "./states";

export const selectClient = (appState: AppState): ClientState => appState.client;
export const selectUsers = (appState: AppState): UsersState => appState.users;
export const selectIsClientInitialized = createSelector(
  selectClient,
  (clientState: ClientState): boolean => !!clientState.clientAccess.client.domain,
);
