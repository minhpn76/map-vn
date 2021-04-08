/**
 *
 * Navigations
 *
 */
import React, { memo, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CardMedia from '@material-ui/core/CardMedia';
import { Link, RouteChildrenProps } from 'react-router-dom';
import { includes } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import './element.scss';
import listNav from './menu';

const useStyles = makeStyles({
  navigationRoot: {
    backgroundColor: '#fff',
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid #ccc',
    width: '100%',
    zIndex: 100,
  },
  actionRoot: {
    maxWidth: '140px',
    minWidth: '65px',
  },
  actionSelected: {
    color: '#fa9026 !important',
    fontSize: '0.7rem !important',
  },
  iconNavigation: {
    width: '24px',
  },
});

interface Props extends RouteChildrenProps<any> {
  intl: any;
}

function Navigations(props: Props) {
  const classes = useStyles();
  let value: string = 'home';

  listNav(props).map((data: any) => {
    if (props.match && props.match.path) {
      if (
        data.url === props.match.path ||
        includes(props.match.path, data.url)
      ) {
        value = data.value;
      }
    }
  });

  return (
    <div className="navigation--app">
        <BottomNavigation
          value={value}
          classes={{
            root: classes.navigationRoot,
          }}
        >
          {listNav(props).map((nav, index) => {
            return (
              <BottomNavigationAction
                key={index}
                component={Link}
                to={nav.url}
                label={nav.label}
                value={nav.value}
                icon={
                  <CardMedia
                    className={classes.iconNavigation}
                    component="img"
                    src={value === nav.value ? nav.icon_active : nav.icon}
                    title={nav.label}
                  />
                }
                classes={{
                  root: classes.actionRoot,
                  selected: classes.actionSelected,
                }}
              />
            );
          })}
        </BottomNavigation>
    </div>
  );
}

export default memo(injectIntl(Navigations));
