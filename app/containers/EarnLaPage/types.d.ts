import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface EarnLaPageState {
  readonly default: any;
}

/* --- ACTIONS --- */
type EarnLaPageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = EarnLaPageState;
type ContainerActions = EarnLaPageActions;

export { RootState, ContainerState, ContainerActions };
