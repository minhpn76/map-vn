import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the earnLaPage state domain
 */

const selectEarnLaPageDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by EarnLaPage
 */

const makeSelectEarnLaPage = () =>
  createSelector(
    selectEarnLaPageDomain,
    substate => {
      return substate;
    },
  );

export default makeSelectEarnLaPage;
export { selectEarnLaPageDomain };
