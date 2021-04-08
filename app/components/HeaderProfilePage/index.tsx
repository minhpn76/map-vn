/**
 *
 * HeaderProfilePage
 *
 */
import React, { memo } from 'react';

import {
  Container,
  Grid,
  CardMedia,
  Typography,
  Dialog,
  Button,
} from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import TopUpAccount from 'components/TopUpAccount/Loadable';
import EditProfile from 'images/edit_profile.png';
import FlagVN from 'images/flags/vn.png';
import IconNonLaCo from 'images/non_la_co.png';
import IconLaCo from 'images/icon_la.jpg';
import 'containers/ProfilePage/profile.scss';
import { IPointsResponse } from 'containers/ProfilePage/types';
import history from 'utils/history';

interface Props {
  isLogger: boolean;
  userName: string;
  userEmail: string;
  userAvatar: string;  
  points: IPointsResponse;
  logOut: () => void;
  typeMapField?: string;
}

function HeaderProfilePage(props: Props) {
  const { isLogger, userName, userEmail, userAvatar, points, typeMapField } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpenTopUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
  };
  const redirectLaHistory = () => {
    history.push('/profile/la-history');
  };
  const redirectEarnLa = () => {
    history.push('/profile/earn-la');
  };
  const handleCloseTopUp = () => {
    setOpen(false);
  };

  return (
    <>
      <Container className="header--profile-page">
        <Grid
          container
          direction="row"
          justify="center"
          spacing={3}
          className="header--info"
        >
          <Grid item xs={3}>
            {!isLogger ? (
              <CardMedia component="img" image={FlagVN} title="Ask Vietnamese" />
            ) : (
              <CardMedia component="img" image={userAvatar} title={userName} />
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography className="name--profile">
              {!isLogger ? <>Ask Vietnamese</> : <>{userName}</>}
            </Typography>
            <Typography className="description--profile">
              {!isLogger ? <>Ask Vietnamese</> : <>{userEmail}</>}
            </Typography>
          </Grid>
          <Grid item xs={2} className="icon--edit--profile">
            <Button onClick={handleOpenTopUp}>
              <CardMedia
                component="img"
                image={EditProfile}
                title="Edit Profile"
                style={{ cursor: 'pointer' }}
              />
            </Button>
          </Grid>
        </Grid>
        <div className="display--board">
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={2} onClick={() => redirectLaHistory()}>
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
                {!isLogger ? (
                  <>
                    -
                  </>
                ) : (
                  <>
                    {points.points}
                  </>
                )}
              </Typography>
            </Grid>
            <Grid item xs={2} onClick={() => redirectEarnLa()}>
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
          </Grid>
        </div>
      </Container>
      <TopUpAccount
        open={open}
        handleCloseTopUp={handleCloseTopUp}
        isLogger={isLogger}
        onLogout={props.logOut}
        typeMapField={typeMapField}
      ></TopUpAccount>
    </>
  );
}

export default memo(injectIntl(HeaderProfilePage));
