/**
 *
 * TopUpMessage
 *
 */
import React, {memo} from 'react';

import {
  Container,
  Typography,
  Dialog,
  IconButton,
  Button, CardMedia
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import history from 'utils/history';
import './topup-message.scss';
import {
  FormattedMessage, injectIntl
} from 'react-intl';
import IconYeahDaiHoi from 'images/yeah_dai_hoi.png';
// import {TYPE} from 'utils/utils';
import { ICheckInGift } from 'containers/MapDetailPage/types';
import ReactHtmlParser from 'react-html-parser';

interface Props {
  openMessage: boolean;
  handleCloseMessage: () => void;
  point: number;
  userName: string;
  checkInGift?: ICheckInGift;
  intl?: any;
  type: string;
}

function TopUpMessage(props: Props) {
  const {openMessage, handleCloseMessage, point, userName, checkInGift, type } = props;
  const handleClick = () => {
    if (!!userName) {
      history.push('/profile');
    } else {
      history.push('/signup');
    }
  };

  return (
    <>
      <Dialog
        open={openMessage}
        onClose={handleCloseMessage}
        fullScreen
        className="topup--messages"
      >
        <Container className={!!userName ? 'box--messages' : 'box--messages sign-up'}>
          <IconButton
            onClick={handleCloseMessage}
            className="btn--close"
            style={type === 'ASKVN' ? {top: '40px'} : {top: '0px'}}
            size="small"
            color="secondary"
            aria-label="close dialog"
          >
            <CloseIcon/>
          </IconButton>
          <div className={type !== 'ASKVN' ? 'bg--messages bg--daihoi' : 'bg--messages'}>
            {
              type !== 'ASKVN' && (<CardMedia
                component="img"
                className="icon--dai-hoi"
                image={IconYeahDaiHoi}
                title="Dai hoi"
              />)
            }
    
            <div className="content--messages">
              {
                type !== 'ASKVN' && (
                  <div className="title--dai-hoi">
                    <Typography component="p">
                      {checkInGift && ReactHtmlParser(checkInGift.header_text)}
                    </Typography>
                  </div>
                )
              }
              <div className="messages--box">
                <Typography className="messages--congrats"
                            component="p">
                  {
                    type === 'ASKVN' ?
                    (!!userName ? `${props.intl.formatMessage({
                      id: "mapDetail.TopUp.Congrat"
                    })} ${userName}` : `${props.intl.formatMessage({
                      id: 'mapDetail.TopUp.PleaseLogin'
                    })}`) : 
                    'Chúc mừng bạn nhận được'
                  }
                </Typography>
                {
                  type === 'ASKVN' ? (
                    !!userName && (<Typography className="messages--point" component="p">
                  <FormattedMessage id="topUpMessage.youJustReceived"/> <b
                  className="points">{point} <FormattedMessage id="topUpMessage.la"/></b></Typography>)
                  ) : (
                    <>
                    <Typography className={type !== 'ASKVN' ? 'messages--point mes--dai-hoi' : 'messages--point'} component="p">
                      <b>{checkInGift && checkInGift.gift_text}</b>
                    </Typography>
                    <CardMedia
                      component="img"
                      className="icon--gif"
                      src={checkInGift && checkInGift.img_link || ''}
                      title="Gif"
                    />
                    </>
                  )
                }
              </div>
              {
                type === 'ASKVN' && (
                  <Button className="btn--submit" onClick={handleClick}>{!!userName ? 'CHECK IT HERE' : 'SIGN UP'}</Button>
                )
              }
            </div>
          </div>
        </Container>
      </Dialog>
    </>
  );
}

export default memo(injectIntl(TopUpMessage));
