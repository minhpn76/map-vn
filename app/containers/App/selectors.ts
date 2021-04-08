import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import {initialState} from "./reducer";

const selectRoute = (state: ApplicationRootState) => state.router;

/**
 * Default selector used by AppC
 */

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

const selectAppDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

const makeSelectApp = () =>
  createSelector(
    selectAppDomain,
    substate => {
      return substate;
    },
  );

export default makeSelectApp;

export { makeSelectLocation };
