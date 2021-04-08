/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import MapPage from 'containers/MapPage/Loadable';
import MapDetailPage from 'containers/MapDetailPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import LaHistoryPage from 'containers/LaHistoryPage/Loadable';
import EarnLaPage from 'containers/EarnLaPage/Loadable';

import GlobalStyle from '../../global-styles';
import {useInjectReducer} from "../../utils/injectReducer";
import reducer from "./reducer";
import {useDispatch, useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import makeSelectApp from "./selectors";
import {isUndefined, includes} from 'lodash';
import './app.scss';

const stateSelector = createStructuredSelector({
  app: makeSelectApp(),
});

export default function App() {
  useInjectReducer({key: 'app', reducer: reducer});

  const {app} = useSelector(stateSelector);
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    setClassName('drawer');
    if (!isUndefined(app.router) && app.router.location && app.router.location.pathname) {
      const location = app.router.location;
      if (location.hash) {
        const selectedLocation = includes(location.hash, 'location');
        if(selectedLocation) {
          setClassName('drawer open');
        }else {
          setClassName('drawer');
        }
      }
    }
  }, [app]);

  return (
    <div className={className}>
      {/* <BrowserRouter> */}
      <Switch>
        <Route exact path="/"
               render={(props) => <HomePage {...props} />}
        />
        <Route exact path="/login"
               render={(props) => <LoginPage {...props} />}
        />
        <Route exact path="/maps"
               render={(props) => <MapPage {...props} />}
        />
        <Route exact path="/maps/:id"
               render={(props) => <MapDetailPage {...props} />}
        />
        <Route exact path="/booking" component={HomePage}/>
        <Route exact path="/profile"
               render={(props) => <ProfilePage {...props} />}
        />
        <Route exact path="/signup"
               render={(props) => <SignUpPage {...props} />}
        />
        <Route exact path="/profile/la-history"
               render={(props) => <LaHistoryPage {...props} />}
        />
        <Route exact path="/profile/earn-la"
               render={(props) => <EarnLaPage {...props} />}
        />
        <Route component={NotFoundPage}/>
      </Switch>
      {/* </BrowserRouter> */}
      <GlobalStyle/>
    </div>
  );
}
