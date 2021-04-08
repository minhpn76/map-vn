/**
 *
 * ContactUs
 *
 */
import React, { memo } from 'react';

// import styled from 'styles/styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Container, Grid, CardMedia,
  Typography
} from '@material-ui/core';
import './element.scss';
import IconEmail from 'images/i_email.png';
import IconPhone from 'images/i_phone.png';
import IconFacebook from 'images/i_facebook.png';
import IconYoutube from 'images/i_youtube.png';
import IconInstagram from 'images/i_instagram.png';
import IconTwitter from 'images/i_twitter.png';
import { Link } from 'react-router-dom';
import LogoFooter from 'images/logo_footer.png';
import AppStore from 'images/app_store.png';
import GgPlay from 'images/gg_play.png';

interface Props {}

const listContact: any = [

  { icon: IconInstagram, link: "https://www.instagram.com/askvietnamese/", label: "instagram.com.askvietnamese", name: "instagram"},
  { icon: IconTwitter, link: "https://twitter.com/ask_vietnamese", label: "twitter.com/Ask_Vietnamese", name: "twitter"},
  { icon: IconFacebook, link: "https://www.facebook.com/askvietnamese", label: "fb.com/askvietnamese", name: "facebook"},
  { icon: IconYoutube, link: "https://youtu.be/Dt4rKACjB6k", label: "ASKVIETNAMESE", name: "youtube"},
];

const listDowload: any = [
  { icon: GgPlay, link: "#", name: "ggPlay"},
  { icon: AppStore, link: "#", name: "appStore"}
];

function ContactUs(props: Props) {
  return (
    <div className="section--contact">
      <Container className="element--container contact-us--container">
        {/* <div className="element--title-wrap">
          <div className="element--title">
            <FormattedMessage id="homePage.ContactUs"/>
          </div>
        </div>
        <div className="element-icon">
            <Grid
              container
              direction="row"
            >
            {
              listContact.map((item, index) => {
                return (
                  <Grid key={index} item xs={4} style={index > 2 ? {marginTop: '20px'} : {marginTop: '0'}}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"

                    >
                      <Grid item xs={2}>
                        <a>
                          <CardMedia
                            component="img"
                            image={item.icon}
                            title={item.name}
                          />
                        </a>
                      </Grid>
                      <Grid item xs={10}>
                        <a target="_blank" href={item.link}>
                          <Typography className="text--contact" component="p">{item.label}</Typography>
                        </a>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })
            }
            </Grid>

        {/* </div> */}
        <Grid
          container
        >
        <Grid xs={6} item>
          <CardMedia
            component="img"
            title="logo-footer"
            className="logo--footer"
            image={LogoFooter}
          />
          {/* <Typography component="h3" className="title--up">Logo Ask Vietnamese</Typography> */}
          <a href="#" className="title--down"><Typography component="p">contact@askvietnamese.vn</Typography></a>
          {/* <a href="#" className="title--down"><Typography component="p">+84 12 345 678</Typography></a> */}
          <Grid container className="list--contact">
            {
              listContact.map((item, index) => {
                return (
                  <Grid xs={1} item key={index}>
                    <a target="_blank" href={item.link}>
                      <CardMedia
                        className="img--social"
                        component="img"
                        image={item.icon}
                        title={item.name}
                      />
                    </a>
                  </Grid>
                );
              })
            }
          </Grid>


        </Grid>
        <Grid xs={2} item>
          <Typography component="h3" className="title--up">Our Product</Typography>
          <a href="#" className="title--down"><Typography component="p">Digital Map</Typography></a>
          <a href="#" className="title--down"><Typography component="p">Paper Map</Typography></a>
          <a href="#" className="title--down"><Typography component="p">FAQ  </Typography></a>
        </Grid>
        <Grid xs={2} item>
          <Typography component="h3" className="title--up">About us</Typography>
          <a href="#" className="title--down"><Typography component="p">Who we are</Typography></a>
          <a href="#" className="title--down"><Typography component="p">Blog</Typography></a>
          <a href="#" className="title--down"><Typography component="p">Our community</Typography></a>
        </Grid>
        <Grid xs={2} item>
          <Typography component="h3" className="title--up">For partners</Typography>
          <a href="#" className="title--down"><Typography component="p">Our Partners</Typography></a>
          <a href="#" className="title--down"><Typography component="p">Become partner</Typography></a>
          <a href="#" className="title--down"><Typography component="p">Contact us</Typography></a>
        </Grid>
        </Grid>
      </Container>
      <div className="information">
        <Container>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
              >
                {
                  listDowload.map((item, index) => {
                    return (
                      <Grid xs={3} item key={index}>
                        <a target="_blank" href={item.link}>
                          <CardMedia
                            className="img--download"
                            component="img"
                            image={item.icon}
                            title={item.name}
                          />
                        </a>
                      </Grid>
                    );
                  })
                }
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p" className="text">Copyright © 2019- 2020 | Ask Vietnamese team</Typography>
            </Grid>

          </Grid>
          </Container>
        </div>
    </div>
  );
}

export default memo(ContactUs);
