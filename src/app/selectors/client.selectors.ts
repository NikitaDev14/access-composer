import { createSelector } from "@ngrx/store";

import { AppState } from "../states";
import { Access } from "../models/access.model";
import { ClientState } from "../states/client.state";

export const selectClientState = (appState: AppState): ClientState => appState.client;

export const selectIsClientInitialized = createSelector(
  selectClientState,
  (clientState: ClientState): boolean => !!clientState.clientAccess.client.domain,
);

export const selectClientAccess = createSelector(
  selectClientState,
  (clientState: ClientState): Access<boolean> => clientState.clientAccess.access,
);

export const selectIsLoadingClientAccess = createSelector(
  selectClientState,
  (clientState: ClientState): boolean => clientState.clientAccess.isLoading,
);

export const selectIsInitializedClientAccess = createSelector(
  selectClientAccess,
  (clientAccess: Access<boolean>): boolean =>
    Object.values(clientAccess).some((clientAccessValue: boolean) => clientAccessValue),
);
