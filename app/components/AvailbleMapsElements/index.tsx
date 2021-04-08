/**
 *
 * AvailbleMapsElements
 *
 */
import React, { memo, useEffect } from 'react';

// import styled from 'styles/styled-components';
import './element.scss';
import { Container, Grid } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import MapsAvatar from 'components/MapsAvatar/Loadable';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { TravelMapItemState } from 'containers/HomePage/types';
import {
  ArrowLeft,
  ArrowRight,
} from 'components/IllustratedMapsElements/arrowScroll';
import SocialContact from 'components/SocialContact';
import {isShowArrowScroll, setAttSlide} from 'utils/utils';

interface Props {
  travelMaps: TravelMapItemState[];
}

function AvailbleMapsElements(props: Props) {
  const { travelMaps } = props;

  let menu = travelMaps.map((el, index) => (
    <MapsAvatar key={index} itemMapAvatar={el} />
  ));

  let elementClass = document.getElementsByClassName('avaible--section')[0];

  useEffect(() => {
    setAttSlide(elementClass, isShowArrowScroll('Avaiable', travelMaps.length));
  }, [elementClass]);

  return (
    <div className="avaible--section">
      <Container className="element--container avaible--maps">
        <div className="element--title-wrap">
          <div className="element--title">
            <FormattedMessage id="avaibleMapsElements.availableMaps" />
            <span>
              {' '}
              <FormattedMessage id="avaibleMapsElements.acrossVietnam" />
            </span>
          </div>
          <div className="element--viewmore">
            <Link to={'/maps'}>
              <FormattedMessage id="avaibleMapsElements.viewMore" />
            </Link>
          </div>
        </div>
        <div className="element--subtittle-wrap">
          <div className="element--subtittle">
            <span className="element--we">
              <FormattedMessage id="avaibleMapsElements.we" />{' '}
            </span>
            <span>
              <FormattedMessage id="avaibleMapsElements.reallyNeedYourHelp" />
            </span>
            <span className="element--build">
              <FormattedMessage id="avaibleMapsElements.toBuildTravelVN" />
            </span>
          </div>
        </div>
      </Container>
      <Container className="container nopadding avaible--maps-scroll">
        <ScrollMenu
          alignCenter={false}
          data={menu}
          arrowLeft={isShowArrowScroll('Avaiable', travelMaps.length) ? ArrowLeft : null}
          arrowRight={isShowArrowScroll('Avaiable', travelMaps.length) ? ArrowRight : null}
        />
        <hr className="element--hr" />
      </Container>
    </div>
  );
}

export default memo(injectIntl(AvailbleMapsElements));
