import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface LaHistoryPageState {
  readonly default: any;
}

/* --- ACTIONS --- */
type LaHistoryPageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = LaHistoryPageState;
type ContainerActions = LaHistoryPageActions;

export { RootState, ContainerState, ContainerActions };
