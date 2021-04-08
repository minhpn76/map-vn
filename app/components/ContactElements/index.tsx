/**
 *
 * ContactElements
 *
 */
import React, { memo } from 'react';
import { Container, Grid } from '@material-ui/core';

// import styled from 'styles/styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SocialContact from 'components/SocialContact';
import './element.scss';

interface Props {}

function ContactElements(props: Props) {
  return (
    <Grid container className="infor--contact">
        <Grid item xs={2}></Grid>
        <SocialContact/>
    </Grid>
  );
}

export default memo(ContactElements);
