import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import IconMessenger from 'images/messenger.png';
import IconLocation from 'images/location.png';
import IconGirl from 'images/girl.png';
import IconLogoPC from 'images/logo_pc.png';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  FormattedMessage, injectIntl
} from 'react-intl';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconCorrect from 'images/correct.png';
import { translationMessages } from 'i18n';
import Menu from '@material-ui/core/Menu';
import { includes } from 'lodash';

// import styled from 'styles/styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import './header.scss';
import listNav from 'components/Navigations/menu';
import SocialContact from 'components/SocialContact';

import { Link, RouteChildrenProps } from 'react-router-dom';
import langEN from 'images/EN.png';
import langVN from 'images/VN.png';

const useStyles = makeStyles({
  navigationRoot: {
    // backgroundColor: '#fff',
    // position: 'fixed',
    // top: 0,
    // borderTop: '1px solid #ccc',
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

// interface Props {
//   changeLocale: (lang: string) => void;
//   lang: string;
//   intl?: any
//  }
interface Props extends RouteChildrenProps<any> {
  intl: any;
  changeLocale: (lang: string) => void;
  lang: string;
  mobileHide?: boolean;
}

function Header(props: Props) {
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLang = (lang: string) => {
    props.changeLocale(lang);
  };

  return (
    <div className={props.mobileHide ? "header--background mobile-hide" : "header--background"}>
      <Container className="header--container">
      <Grid container >
        <Grid item xs={2}>
          <Box component="span">
            <CardMedia
              className="icon--girl"
              component="img"
              image={IconGirl}
              title="icon-girl"
            />
            <CardMedia
              className="icon--logo-pc"
              component="img"
              image={IconLogoPC}
              title="icon-logo-pc"
            />
          </Box>
        </Grid>
        <Grid item xs={8} className="naviation--menu">
          <BottomNavigation
            value={value}
            classes={{
              root: classes.navigationRoot,
            }}
            showLabels
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
        </Grid>
        <SocialContact/>
        <Grid item xs={2} className="select--lang">
          <Button
            aria-controls="simple-lang"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <CardMedia
              component="img"
              image={props.lang === 'VN' ? langVN : langEN}
              title={props.lang}
              className="image--lang"
            />
            {props.lang} <ArrowDropDownIcon />
          </Button>
          <Menu
            id="simple-lang"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleLang('en')}>
              {props.lang === 'ENG' ? (
                <CardMedia
                  className="icon--correct"
                  component="img"
                  src={IconCorrect}
                />
              ) : (
                <div style={{ width: '20px', marginRight: '5px' }}></div>
              )}
              English
            </MenuItem>
            <MenuItem onClick={() => handleLang('vi')}>
              {props.lang === 'VN' ? (
                <CardMedia
                  className="icon--correct"
                  component="img"
                  src={IconCorrect}
                />
              ) : (
                <div style={{ width: '20px', marginRight: '5px' }}></div>
              )}
              Vietnamese
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
}

export default memo(injectIntl(Header));
