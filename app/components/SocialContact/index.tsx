/**
 *
 * SocialContact
 *
 */
import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import IconMessenger from 'images/messenger.png';
import IconLocation from 'images/location.png';

// import styled from 'styles/styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import 'components/Header/header.scss';

interface Props {}

function SocialContact(props: Props) {
  return (
    <Grid item xs={8} className="alert--infor">
      <Typography className="typography">
        <FormattedMessage id="header.hello" />
      </Typography>
      <Typography className="typography">
        <FormattedMessage id="header.askVNSomething" />
      </Typography>
      <Grid container className="box--action--contact"
        direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <div className="box-messenger">
            <a
              href="https://m.me/askvietnamese"
              rel="noopener"
              target="_blank"
            >
              <CardMedia
                className="icon--messenger"
                component="img"
                image={IconMessenger}
                title="icon-messenger"
              />
            </a>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="box-location">
            <CardMedia
              className="icon--location"
              component="img"
              src={IconLocation}
              title="icon-location"
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default memo(SocialContact);
