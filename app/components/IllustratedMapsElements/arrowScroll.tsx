import React from "react";
import { CardMedia } from '@material-ui/core';
import './element.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >
        {text}

        {/* <CardMedia
            component="img"
            image={arrowRightActive}
            title="arrow"
        /> */}
      </div>
    );
  };

export const ArrowLeft = Arrow({ text: <ArrowBackIcon/>, className: 'arrow-prev' });
export const ArrowRight = Arrow({ text: <ArrowForwardIcon/>, className: 'arrow-next' });