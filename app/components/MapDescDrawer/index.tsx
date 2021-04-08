/**
 *
 * MapDescDrawer
 *
 */
import React, {memo, useState} from 'react';

import Drawer from '@material-ui/core/Drawer';
import './drawer.scss';
import { FormattedMessage, injectIntl } from 'react-intl';
import Rating from '@material-ui/lab/Rating';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MapLocationResponse } from 'containers/MapDetailPage/types';
import { isUndefined, isEmpty, find, isArray } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import HCMDefaultImage from 'images/hcm.jpg';
import OcActive from 'images/oc.png';
import OcEmpty from 'images/oc_active.png';
import {TYPE} from 'utils/utils';
import { CardMedia } from '@material-ui/core';
import IconGiftDaiHoi from 'images/gift_dai_hoi.png';
// import styled from 'styles/styled-components';


interface Props {
  open: boolean;
  handleClose: () => void;
  getDirection: () => void;
  handleCheckIn: () => void;
  handleClickLike: () => void;
  location: MapLocationResponse;
  canCheckIn: boolean;
}

function MapDescDrawer(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDirection = () => {
    props.getDirection();
  };

  const { location } = props;
  const { business_time } = location;

  let activeTime = false;
  let openTimeText = 'Closed';
  if (!!business_time && isArray(business_time)) {
    activeTime = true;
    const timeData = find(business_time, ['is_today', true]);
    if (
      !isUndefined(timeData) &&
      !isUndefined(timeData.is_open) &&
      timeData.is_open &&
      !isUndefined(timeData.end) &&
      timeData.end
    ) {
      openTimeText = 'Open now / close at ' + timeData.end;
    }
  } else {
    openTimeText = 'Updating';
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const {open} = props;
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      className="map--desc-drawer"
    >
      <div className={TYPE === 'ASKVN' ? 'map--desc-dialog-scroll' : 'map--desc-dialog-scroll-dhd'}>

        <div className="map--desc-dialog-header">
          <IconButton
            onClick={props.handleClose}
            size="small"
            color="secondary"
            aria-label="close dialog"
          >
            <CloseIcon />
          </IconButton>
        </div>

        {!isUndefined(props.location.images) && (
          <Carousel
            infinite={true}
            arrows={false}
            keyBoardControl={false}
            responsive={responsive}
            showDots
          >
            {props.location.images.map((images, index) => {
              return (
                <div className="map--desc-dialog-image" key={index}>
                  <img src={images.url} />
                </div>
              );
            })}
          </Carousel>
        )}
        {isEmpty(props.location.images) && (
          <div className="map--desc-dialog-image">
            <img src={HCMDefaultImage} />
          </div>
        )}
        <Container>
          <div className="map--desc-dialog-wrap">
            <Typography
              variant="h5"
              gutterBottom
              className="map--desc-dialog-heading"
            >
              {props.location.location_name}
            </Typography>
            <div className="map--desc-dialog-heading-icon">
              <FavoriteIcon onClick={props.handleClickLike} />
              {!isUndefined(props.location.likes) ? props.location.likes : ''}
            </div>
          </div>
          <div className="map--desc-dialog-summary">
            <Button
              className="map--desc-dialog-opening-btn"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {openTimeText} <ArrowDropDownIcon />
            </Button>
            {activeTime && (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="map--desc-dialog-summary-opening-hour"
              >
                {business_time &&
                business_time.map((value, index) => (
                  <MenuItem
                    key={index}
                    className={value.is_today ? 'active' : ''}
                    onClick={handleClose}
                  >
                    {value.is_allday
                      ? 'All day'
                      : `${value.day_text}: ${value.start} - ${value.end}`}
                  </MenuItem>
                ))}
              </Menu>
            )}
            <div className="map--desc-dialog-summary-address">
              {props.location.address}
            </div>
          </div>
          <div className="map--desc-dialog-information">
            <div className="map--desc-dialog-information-about">
              <Typography
                variant="h6"
                gutterBottom
                className="map--desc-dialog-information-title"
              >
                <FormattedMessage id="mapDescDialog.about" />
              </Typography>
              <Typography className="map--desc-dialog-information-content">
                {ReactHtmlParser(props.location.description)}
              </Typography>
            </div>
            <List
              component="div"
              className="map--desc-dialog-information-list"
              aria-label="main information list"
            >
              {props.location.tags && (
                <ListItem button>
                  <ListItemIcon>
                    <FolderOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary={props.location.tags} />
                </ListItem>
              )}
              {props.location.price_range && (
                <ListItem button>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary={props.location.price_range} />
                </ListItem>
              )}
              {props.location.contact_info && (
                <ListItem button>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <a href={"tel:" + props.location.contact_info} style={{color: '#000'}}>
                    <ListItemText primary={props.location.contact_info} />
                  </a>
                </ListItem>
              )}
              {props.location.website && (
                <ListItem button>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <a rel="noopener noreferrer"
                     href={
                       !props.location.website.includes('http')  || !props.location.website.includes('https')
                         ? 'https://' + props.location.website : props.location.website
                     }
                     target="_blank" style={{color: '#000'}}>
                    <ListItemText primary={props.location.website} />
                  </a>
                </ListItem>
              )}
            </List>
            <div className="map--desc-dialog-information-rate">
              <Typography
                variant="h6"
                gutterBottom
                className="map--desc-dialog-information-title"
              >
                <FormattedMessage id="mapDescDialog.askVNRate" />
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography
                    gutterBottom
                    className="map--desc-dialog-information-rate-title"
                  >
                    <FormattedMessage id="mapDescDialog.autheticTraditional" />
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating
                    readOnly
                    name="size-large"
                    defaultValue={props.location.rate_authentic}
                    size="large"
                    icon={
                      <img
                        src={OcEmpty}
                        alt="Oc Empty"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                    emptyIcon={
                      <img
                        src={OcActive}
                        alt="Oc Active"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography
                    gutterBottom
                    className="map--desc-dialog-information-rate-title"
                  >
                    <FormattedMessage id="mapDescDialog.cleaness" />
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating
                    readOnly
                    name="size-large"
                    defaultValue={props.location.rate_cleaness}
                    size="large"
                    icon={
                      <img
                        src={OcEmpty}
                        alt="Oc Empty"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                    emptyIcon={
                      <img
                        src={OcActive}
                        alt="Oc Active"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography
                    gutterBottom
                    className="map--desc-dialog-information-rate-title"
                  >
                    <FormattedMessage id="mapDescDialog.decoration" />
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating
                    readOnly
                    name="size-large"
                    defaultValue={props.location.rate_decoration}
                    size="large"
                    icon={
                      <img
                        src={OcEmpty}
                        alt="Oc Empty"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                    emptyIcon={
                      <img
                        src={OcActive}
                        alt="Oc Active"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography
                    gutterBottom
                    className="map--desc-dialog-information-rate-title"
                  >
                    <FormattedMessage id="mapDescDialog.englishFriendLiness" />
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating
                    readOnly
                    name="size-large"
                    defaultValue={props.location.rate_friendliness}
                    size="large"
                    icon={
                      <img
                        src={OcEmpty}
                        alt="Oc Empty"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                    emptyIcon={
                      <img
                        src={OcActive}
                        alt="Oc Active"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography
                    gutterBottom
                    className="map--desc-dialog-information-rate-title"
                  >
                    <FormattedMessage id="mapDescDialog.reasonablePrice" />
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating
                    readOnly
                    name="size-large"
                    defaultValue={props.location.rate_reasonable}
                    size="large"
                    icon={
                      <img
                        src={OcEmpty}
                        alt="Oc Empty"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                    emptyIcon={
                      <img
                        src={OcActive}
                        alt="Oc Active"
                        className="map--desc-dialog-information-rate-image"
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    align="center"
                    className="map--desc-dialog-information-rate-get-point"
                  >
                    <FormattedMessage id="mapDescDialog.youCanGet" />{' '}
                    {props.location.reward_point || 0}{' '}
                    <FormattedMessage id="mapDescDialog.laHere" />
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
        <div className={TYPE !== 'ASKVN' ? 'map--desc-dialog-action action-dh' : 'map--desc-dialog-action'}>
          {TYPE !== 'ASKVN'  && (
            <Typography component="p" className="title--gift">
              <CardMedia
                component="img"
                className="icon--gift-dai-hoi"
                image={IconGiftDaiHoi}
                title="Gift Dai hoi"
              />
              ĐỪNG QUÊN CHECK IN ĐỂ NHẬN QUÀ NHÉ
            </Typography>
          )}
          <Container
            className={ TYPE !== 'ASKVN' ? (
              props.canCheckIn
                ? 'map--desc-dialog-action-event can-check-in position-dh'
                : 'map--desc-dialog-action-event position-dh'
            ) : (
              props.canCheckIn
                ? 'map--desc-dialog-action-event can-check-in'
                : 'map--desc-dialog-action-event'
            )

            }
          >
            <Button
              className={TYPE === 'ASKVN' ? 'map--desc-dialog-action-btn' : 'map--desc-dialog-action-btn map--desc-dialog-action-dai-hoi'}
              onClick={handleDirection}
            >
              <FormattedMessage id="mapDescDialog.getDirection" />
            </Button>
            {props.canCheckIn   && (
              <Button
                className={TYPE === 'ASKVN' ? 'map--desc-dialog-action-btn' : 'map--desc-dialog-action-btn map--desc-dialog-action-dai-hoi'}
                onClick={props.handleCheckIn}
              >
                <FormattedMessage id="mapDescDialog.checkIn" />
              </Button>
            )}
          </Container>
        </div>
      </div>
    </Drawer>
  );
}

export default memo(MapDescDrawer);
