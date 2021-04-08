/*
 *
 * EarnLaPage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEarnLaPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Navigations from 'components/Navigations/Loadable';
import { Container, Grid, CardMedia, Typography } from '@material-ui/core';
import LinearProgress, {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import 'containers/LaHistoryPage/LaHistory.scss';
import IconNonLaCo from 'images/non_la_co.png';
import IconNonLaHoa from 'images/non_hoa.png';
import IconNonLaSen from 'images/non_sen.png';
import IconNonLaTrong from 'images/non_trong_dong.png';
import IconOcActive from 'images/oc_active.png';
import IconOc from 'images/oc.png';
import EarnLaCo from 'components/EarnLaCo/Loadable';
import EarnLaHoa from 'components/EarnLaHoa/Loadable';
import EarnLaSen from 'components/EarnLaSen/Loadable';
import EarnTrongDong from 'components/EarnTrongDong/Loadable';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});
let listBaseLa: any = [
  {
    icon: IconNonLaCo,
    name: <FormattedMessage id="earnLaPage.laCo" />,
    point: 0,
    prefix: <FormattedMessage id="earnLaPage.non" />,
    key: 'LA_CO',
  },
  {
    icon: IconNonLaHoa,
    name: <FormattedMessage id="earnLaPage.laHoa" />,
    point: 200,
    prefix: <FormattedMessage id="earnLaPage.non" />,
    key: 'LA_HOA',
  },
  {
    icon: IconNonLaSen,
    name: <FormattedMessage id="earnLaPage.laSen" />,
    point: 500,
    prefix: <FormattedMessage id="earnLaPage.non" />,
    key: 'LA_SEN',
  },
  {
    icon: IconNonLaTrong,
    name: <FormattedMessage id="earnLaPage.trongDong" />,
    point: 1000,
    prefix: <FormattedMessage id="earnLaPage.nonLa" />,
    key: 'TRONG_DONG',
  },
];

const stateSelector = createStructuredSelector({
  earnLaPage: makeSelectEarnLaPage(),
});

interface Props {}

function EarnLaPage(props: Props) {
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: 'earnLaPage', reducer: reducer });
  useInjectSaga({ key: 'earnLaPage', saga: saga });

  const classes = useStyles();
  const [chooseLa, setChooseLa] = React.useState('LA_CO');

  const handleChosseLa = (key: string) => {
    setChooseLa(key);
  };
  const mapEarnLa = (key: string) => {
    const swithComponentLa = {
      LA_CO: <EarnLaCo />,
      LA_HOA: <EarnLaHoa />,
      LA_SEN: <EarnLaSen />,
      TRONG_DONG: <EarnTrongDong />,
    };
    return swithComponentLa[key];
  };

  const { earnLaPage } = useSelector(stateSelector);
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
            <FormattedMessage id="earnLaPage.howToEarnLa" />
          </Typography>
        </Grid>
      </Container>
      <Container className="la--earn--content">
        <Grid container direction="row" spacing={2}>
          {listBaseLa.map((la, index) => {
            return (
              <Grid
                style={{ cursor: 'pointer' }}
                xs={3}
                item
                key={index}
                onClick={() => handleChosseLa(la.key)}
              >
                <div className="item--la">
                  <div className="circle">
                    <div className="icon">
                      <CardMedia
                        component="img"
                        className="icon--display"
                        image={la.icon}
                        title="La"
                      />
                    </div>
                  </div>
                  <Typography className="title" component="h5">
                    {la.prefix} <br></br>
                    {la.name}
                  </Typography>
                  <Typography className="point" component="p">
                    {la.point} <FormattedMessage id="earnLaPage.la" />
                  </Typography>
                </div>
              </Grid>
            );
          })}
        </Grid>
        <Grid container direction="row" spacing={2} className="side--bar">
          <Grid xs={10} item>
            <div className="line">
              <CardMedia
                component="img"
                className="icon-oc oc--1"
                image={IconOcActive}
                title="Oc 1"
              />
              <CardMedia
                component="img"
                className="icon-oc oc--2"
                image={IconOcActive}
                title="Oc 2"
              />
              <CardMedia
                component="img"
                className="icon-oc oc--3"
                image={IconOc}
                title="Oc 3"
              />
              <CardMedia
                component="img"
                className="icon-oc oc--4"
                image={IconOc}
                title="Oc 4"
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography className="redeem--desc" component="p">
            <FormattedMessage id="earnLaPage.notifyRedeem" />
          </Typography>
        </Grid>
        {mapEarnLa(chooseLa)}
      </Container>
      <Navigations {...props} />
    </div>
  );
}

export default memo(injectIntl(EarnLaPage));
