/*
 *
 * LaHistoryPage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLaHistoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Navigations from 'components/Navigations/Loadable';
import {
  Container, Grid, CardMedia, Typography, Box,
  Select, MenuItem, InputBase, List, ListItemIcon, ListItemText
} from '@material-ui/core';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import './LaHistory.scss';
import IconNonLaCo from 'images/non_la_co.png';
import IconLaCo from 'images/icon_la.jpg';
import zIndex from '@material-ui/core/styles/zIndex';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      "borderRadius": 50,
      "position": 'relative',
      "backgroundColor": theme.palette.background.paper,
      "border": '1px solid #ced4da',
      "fontSize": 13,
      "padding": '1px 60px 1px 10px',
      "transition": theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 50,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

function LinearProgressWithLabel(props: LinearProgressProps & { value: any }) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1} style={{position: 'relative'}}>
        {
          props.value ? (
            <span 
              className="icon--process--bar"
              style={{left: `${props.value}%`}}
            >
              <CardMedia
                component="img"
                className="img--process"
                image={IconLaCo}
                title="Icon Process Bar"
              />
            </span>
          ) : <></>
        }
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <CardMedia
            component="img"
            className="icon--display--success"
            image={IconNonLaCo}
            title="Icon Process"
          />
      </Box>
    </Box>
  );
}

const stateSelector = createStructuredSelector({
  laHistoryPage: makeSelectLaHistoryPage(),
});

interface Props {}

function LaHistoryPage(props: Props) {
  const classes = useStyles();
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: 'laHistoryPage', reducer: reducer });
  useInjectSaga({ key: 'laHistoryPage', saga: saga });

  const [progress, setProgress] = React.useState(50);

  const [time, setTime] = React.useState('ALL');
  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setTime(event.target.value as string);
  };

  const { laHistoryPage } = useSelector(stateSelector);
  const dispatch = useDispatch();
  return (
    <div>
      <Container className="header--la-history">
        <Grid
          container
          direction="row"
          justify="center"
          spacing={3}
          className="header--info"
        >
           <Typography component="h3">
              <FormattedMessage id="laHistoryPage.title"/>
            </Typography>
        </Grid>
        <div className="display--board">
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={2}>
              <CardMedia
                component="img"
                className="icon--display"
                image={IconLaCo}
                title="La Co"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography className="title--display" component="p">
                <FormattedMessage id="laHistoryPage.yourLa"/>
              </Typography>
              <Typography className="number--display" component="p">
                -
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <CardMedia
                component="img"
                className="icon--display"
                image={IconNonLaCo}
                title="Non La Co"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography className="title--display" component="p">
                <FormattedMessage id="laHistoryPage.yourLevel"/>
              </Typography>
              <Typography className="number--display" component="p">
                <FormattedMessage id="laHistoryPage.laCo"/>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.root}>
                <LinearProgressWithLabel value={progress} />
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Container className="la--history--content">
        <Grid
          container
          direction="row"
          justify="flex-end"
        >
          <Grid xs={6} item className="select-time--history">
            <Select
              labelId="check-list-calendar"
              id="calendar-select"
              value={time}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              <MenuItem value="ALL"><FormattedMessage id="laHistoryPage.filter.all"/></MenuItem>
              <MenuItem value="0"><FormattedMessage id="laHistoryPage.filter.toDay"/></MenuItem>
              <MenuItem value="1"><FormattedMessage id="laHistoryPage.filter.lastWeek"/></MenuItem>
              <MenuItem value="2"><FormattedMessage id="laHistoryPage.filter.lastMonth"/></MenuItem>
            </Select>
          </Grid>

        </Grid>
        <Grid 
          container
          direction="row"
          style={{padding: '20px'}}
        >
          <Grid item xs={12} className="item--history--point">
            <Grid container>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  className="icon--display"
                  image={IconLaCo}
                  title="La Co"
                />
              </Grid>
              <Grid item xs={7} className="box--info">
                <Typography className="title" component="h3">
                  Indika Saigon
                </Typography>
                <Typography className="time" component="p">
                  21:45 14 Feb 2020
                </Typography>
              </Grid>
              <Grid item xs={3} className="box--point">
                <Typography className="point" component="h3">
                  + 10 Lá
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="item--history--point">
            <Grid container>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  className="icon--display"
                  image={IconLaCo}
                  title="La Co"
                />
              </Grid>
              <Grid item xs={7} className="box--info">
                <Typography className="title" component="h3">
                  Indika Saigon
                </Typography>
                <Typography className="time" component="p">
                  21:45 14 Feb 2020
                </Typography>
              </Grid>
              <Grid item xs={3} className="box--point">
                <Typography className="point" component="h3">
                  + 10 Lá
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="item--history--point">
            <Grid container>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  className="icon--display"
                  image={IconLaCo}
                  title="La Co"
                />
              </Grid>
              <Grid item xs={7} className="box--info">
                <Typography className="title" component="h3">
                  Indika Saigon
                </Typography>
                <Typography className="time" component="p">
                  21:45 14 Feb 2020
                </Typography>
              </Grid>
              <Grid item xs={3} className="box--point">
                <Typography className="point" component="h3">
                  + 10 Lá
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Navigations {...props} />
    </div>
  );
}

export default memo(injectIntl(LaHistoryPage));
