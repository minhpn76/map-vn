/**
 *
 * ReadMore
 *
 */
import React, { memo } from 'react';

// import styled from 'styles/styled-components';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import './ReadMore.scss';
import {
  Container, IconButton, Typography, CardMedia
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BgLeft from 'images/bg_left.png';
import BgRight from 'images/bg_right.png';
import {
  PostReadMoreState
} from 'containers/MapPage/types';

interface Props {
  handleCloseReadMore: () => void;
  postReadMore: PostReadMoreState[];
  mapName: string;
  descriptionMap?: string;
}


function ReadMore(props: Props) {
  const mapListPost = props.postReadMore.map((post, index) => {
    return (
      <div className="post--item" key={index}>
        <a href={post.link} className="link--post" target="_blank">
          <Typography component="p">
            {post.title}
          </Typography>
        </a>
      </div>
    );
});
  return (
    <div className="popup--readmore">
      <div className="icon--bottom-left">
        <CardMedia
          component="img"
          alt="bg_left"
          image={BgLeft}
          title="bg_left"
        />
      </div>
      <div className="icon--bottom-right">
        <CardMedia
          component="img"
          alt="bg_left"
          image={BgRight}
          title="bg_left"
        />
      </div>
      <Container className="readmore">
        <div className="box--action">
          <IconButton
            onClick={props.handleCloseReadMore}
            className="btn--close"
            size="small"
            color="secondary"
            aria-label="close dialog"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="title--readmore">
          <h2 className="text"><FormattedMessage id="readMore.allAbout"/> {props.mapName}</h2>
          <Typography className="description" component="p">{props.descriptionMap}</Typography>
        </div>
        <div className="scroll-box">
          <div className="list--post">
            {mapListPost}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default memo(injectIntl(ReadMore));
