/*
 *
 * AppC reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  drawer: false,
};

function appCReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.DRAWER:
      return {
        ...state,
        drawer: action.payload
      };
    default:
      return state;
  }
}

export default appCReducer;
