import { Reducer, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { ContainerState as LanguageProviderState } from 'containers/LanguageProvider/types';
import { ContainerState as LoginPageState } from 'containers/LoginPage/types';
import { ContainerState as HomePageState } from 'containers/HomePage/types';
import { ContainerState as MapPageState } from 'containers/MapPage/types';
import { ContainerState as MapDetailPageState } from 'containers/MapDetailPage/types';
import { ContainerState as SignUpPageState } from 'containers/SignUpPage/types';
import { ContainerState as ProfilePageState } from 'containers/ProfilePage/types';
import { ContainerState as LaHistoryPage } from 'containers/LaHistoryPage/types';
import { ContainerState as EarnLaPage } from 'containers/EarnLaPage/types';
import { ContainerState as AppState } from 'containers/App/types';

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: (() => IterableIterator<any>) | undefined, args: any | undefined): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly language: LanguageProviderState;
  readonly app: AppState;
  // for testing purposes
  readonly test: any;
  readonly loginPage: LoginPageState;
  readonly homePage: HomePageState;
  readonly mapPage: MapPageState;
  readonly mapDetailPage: MapDetailPageState;
  readonly signUpPage: SignUpPageState;
  readonly profilePage: ProfilePageState;
  readonly laHistoryPage: LaHistoryPage;
  readonly earnLaPage: EarnLaPage;
}
