import { ClientState, initialClientState } from "../states";
import { ACCESS_INITIALIZED_ACTION, CLIENT_INITIALIZED_ACTION, ClientActions } from "../actions/client.actions";

export const clientReducer = (
  state: ClientState = initialClientState,
  action: ClientActions,
): ClientState => {
  switch (action.type) {
    case CLIENT_INITIALIZED_ACTION: {
      return {
        ...state,
        clientAccess: {
          ...state.clientAccess,
          client: {
            domain: action.payload,
          },
        },
      };
    }

    case ACCESS_INITIALIZED_ACTION: {
      return {
        ...state,
        clientAccess: {
          ...state.clientAccess,
          access: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
