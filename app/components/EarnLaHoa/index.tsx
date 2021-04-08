/**
 *
 * EarnLaHoa
 *
 */
import React, { memo } from 'react';

// import styled from 'styles/styled-components';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import {
  Container,
  Grid,
  CardMedia,
  Typography,
} from '@material-ui/core';
import 'containers/LaHistoryPage/LaHistory.scss';
import IconLaCo from 'images/icon_la.jpg';
import IconNonLaHoa from 'images/non_hoa.png';

interface Props {}

function EarnLaHoa(props: Props) {
  return (
    <div>
      <Grid 
          container
          spacing={3}
          direction="row"
          className="bx--infor--la"
        >
          <Grid item xs={12} className="infor--la">
            <CardMedia
              component="img"
              className="icon--la"
              image={IconNonLaHoa}
              title="La Hoa"
            />
          </Grid>
          
          <Grid container direction="row" className="bx_infor_point">
              <Grid item xs={1} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <span className="number--point">+2</span>
              </Grid>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  style={{width: '50px'}}
                  image={IconLaCo}
                  title="La Co"
                />
              </Grid>
              <Grid item xs={9} style={{display: 'flex', alignItems: 'center'}}>
                <Typography component="p">
                  <FormattedMessage id="earnLaCo.checkInAtDestination" />
                </Typography>
              </Grid>
          </Grid>
          <Grid container direction="row" className="bx_infor_point">
              <Grid item xs={1} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <span className="number--point">+10</span>
              </Grid>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  style={{width: '50px'}}
                  image={IconLaCo}
                  title="La Co"
                />
              </Grid>
              <Grid item xs={9} style={{display: 'flex', alignItems: 'center'}}>
                <Typography component="p">
                  <FormattedMessage id="earnLaCo.askQuestionVN" />
                </Typography>
              </Grid>
          </Grid>
          <Grid container direction="row" className="bx_infor_point">
              <Grid item xs={1} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <span className="number--point">+2</span>
              </Grid>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  style={{width: '50px'}}
                  image={IconLaCo}
                  title="La Co"
                />
              </Grid>
              <Grid item xs={9} style={{display: 'flex', alignItems: 'center'}}>
                <Typography component="p">
                  <FormattedMessage id="earnLaCo.recevied1LikeForAws" />
                </Typography>
              </Grid>
          </Grid>
          <Grid container direction="row" className="bx_infor_point">
              <Grid item xs={1} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <span className="number--point">+5</span>
              </Grid>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  style={{width: '50px'}}
                  image={IconLaCo}
                  title="La Co"
                />
              </Grid>
              <Grid item xs={9} style={{display: 'flex', alignItems: 'center'}}>
                <Typography component="p">
                <FormattedMessage id="earnLaCo.shareArticleOnFB" />
                </Typography>
              </Grid>
          </Grid>
          <Grid container direction="row" className="bx_infor_point">
              <Grid item xs={1} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <span className="number--point">+5</span>
              </Grid>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  style={{width: '50px'}}
                  image={IconLaCo}
                  title="La Co"
                />
              </Grid>
              <Grid item xs={9} style={{display: 'flex', alignItems: 'center'}}>
                <Typography component="p">
                <FormattedMessage id="earnLaCo.shareQuestionOnFB" />
                </Typography>
              </Grid>
          </Grid>
          <Grid container direction="row" className="bx_infor_point">
              <Grid item xs={1} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <span className="number--point">+1</span>
              </Grid>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  style={{width: '50px'}}
                  image={IconLaCo}
                  title="La Co"
                />
              </Grid>
              <Grid item xs={9} style={{display: 'flex', alignItems: 'center'}}>
                <Typography component="p">
                <FormattedMessage id="earnLaCo.openAppDaily" />
                </Typography>
              </Grid>
          </Grid>
        </Grid>
    </div>
  );
}

export default memo(injectIntl(EarnLaHoa));
