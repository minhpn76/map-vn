/**
 *
 * TravelGuidesElements
 *
 */
import React, { memo, useEffect } from 'react';

import { Container } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import TravelGuidesCard from 'components/TravelGuidesCard/Loadable';
import { PostTopItemState } from 'containers/HomePage/types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form } from 'formik';
import './travelGuide.scss';
import {
  ArrowLeft,
  ArrowRight
} from 'components/IllustratedMapsElements/arrowScroll';
import {isShowArrowScroll, setAttSlide} from 'utils/utils';
import { Style } from '@material-ui/icons';

interface Props {
  postTops: PostTopItemState[];
}

function TravelGuidesElements(props: Props) {
  const { postTops } = props;
  let menu = postTops.map((travelGuide, index) => (
    <div key={index}>
      <a rel="noopener noreferrer"
        href={
          !travelGuide.link.includes('http')  || !travelGuide.link.includes('https')
          ? 'https://' + travelGuide.link : travelGuide.link
        }
        target="_blank" >
        <TravelGuidesCard itemTravelGuide={travelGuide} key={index} />
      </a>
    </div>
  ));

  let elementClass = document.getElementsByClassName('travel--section')[0];

  useEffect(() => {
    setAttSlide(elementClass, isShowArrowScroll('TravelGuides', postTops.length));
  }, [elementClass]);

  return (
    <div className="travel--section">
      <Container className="element--container travel--container">
        <div className="element--title-wrap">
          <div className="element--title">
            <FormattedMessage id="travelGuides.travelGuide"/>
            <span className="element-most--people">
              <FormattedMessage id="travelGuides.mostPopularQuestion"/>
            </span>
          </div>
        </div>
        <div className="element--subtittle-wrap">
          <div className="element--subtittle">
            <span className="element--best-aws">
            <FormattedMessage id="travelGuides.bestAnswersFrom"/>
            </span>{' '}
            <span className="noUppercase">www.AskVietnamese.vn </span>
          </div>
        </div>
      </Container>
      <Container className="container nopadding">
        <ScrollMenu
          alignCenter={false} data={menu}
          arrowLeft={isShowArrowScroll('TravelGuides', postTops.length) ? ArrowLeft : null}
          arrowRight={isShowArrowScroll('TravelGuides', postTops.length) ? ArrowRight : null}

        />
        <hr className="element--hr" />
      </Container>
    </div>
  );
}

export default memo(injectIntl(TravelGuidesElements));
