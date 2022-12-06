import { CLIENT_ACCESS_INITIALIZED_ACTION, CLIENT_INITIALIZED_ACTION, ClientActions } from "../actions/client.actions";
import { ClientState, initialClientState } from "../states/client.state";

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

    case CLIENT_ACCESS_INITIALIZED_ACTION: {
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
