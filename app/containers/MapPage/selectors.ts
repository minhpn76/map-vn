import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectMapPageDomain = (state: ApplicationRootState) => {
  return state.mapPage || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapPage
 */

const makeSelectMapPage = () =>
  createSelector(
    selectMapPageDomain,
    substate => {
      return substate;
    },
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectMapPageDomain,
    substate => {
      return substate.isLoading;
    },
  );
const makeSelectTravelMaps = () =>
  createSelector(
    selectMapPageDomain,
    substate => {
      return substate.travelMaps;
    },
  );

const makeSelectPostReadMore = () =>
  createSelector(
    selectMapPageDomain,
    substate => {
      return substate.postReadMore;
    },
  );

const makeSelectMapId = () =>
  createSelector(
    selectMapPageDomain,
    substate => {
      return substate.mapId;
    },
  );

const makeSelectSearchLocation = () => 
  createSelector(
    selectMapPageDomain,
    substate => {
      return substate.searchLocation;
    },
);

export default makeSelectMapPage;
export { 
  selectMapPageDomain, makeSelectTravelMaps,
  makeSelectIsLoading, makeSelectPostReadMore,
  makeSelectMapId, makeSelectSearchLocation
};
