import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the laHistoryPage state domain
 */

const selectLaHistoryPageDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by LaHistoryPage
 */

const makeSelectLaHistoryPage = () =>
  createSelector(
    selectLaHistoryPageDomain,
    substate => {
      return substate;
    },
  );

export default makeSelectLaHistoryPage;
export { selectLaHistoryPageDomain };
