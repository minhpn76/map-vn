/**
 *
 * IllustratedMapsElements
 *
 */
import React, { memo, useEffect } from 'react';

import { Container } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import IllustratorMapsCard from 'components/IllustratorMapsCard/Loadable';
import { PaperMapItemState } from 'containers/HomePage/types';
import {
  FormattedMessage, injectIntl
} from 'react-intl';
import './element.scss';
import {ArrowLeft, ArrowRight} from './arrowScroll';
import {isShowArrowScroll, setAttSlide} from 'utils/utils';

interface Props {
  paperMaps: PaperMapItemState[];
}

function IllustratedMapsElements(props: Props) {
  const { paperMaps } = props;

  let menu = paperMaps.map((paper, index) => (
    <IllustratorMapsCard key={index} itemPaperMap={paper} />
  ));

  let elementClass = document.getElementsByClassName('section--illus')[0];

  useEffect(() => {
    setAttSlide(elementClass, isShowArrowScroll('IllustratedMaps', paperMaps.length));
  }, [elementClass]);

  return (
    <div className="section--illus">
      <Container className="element--container illus--container">
        <div className="element--title-wrap">
          <div className="element--title">
            <span>
            <FormattedMessage id="illustratedMap.illustratedMap"/>
            </span>
            <span className="element-to--view"> <FormattedMessage id="illustratedMap.toViewOnline"/></span>
          </div>
          <div className="element--viewmore">
            <FormattedMessage id="avaibleMapsElements.viewMore"/>
          </div>
        </div>
        <div className="element--subtittle-wrap">
          <div className="element--subtittle">
            <span className="element--we"><FormattedMessage id="illustratedMap.weProviedPaperMap"/></span> <span>
            <FormattedMessage id="illustratedMap.forFree" />
            </span> <span className="element--city"><FormattedMessage id="illustratedMap.inYourCity"/></span>
          </div>
        </div>
      </Container>
      <Container className="container nopadding">
        <ScrollMenu
          alignCenter={false}
          data={menu}
          arrowLeft={isShowArrowScroll('IllustratedMaps', paperMaps.length) ? ArrowLeft : null}
          arrowRight={isShowArrowScroll('IllustratedMaps', paperMaps.length) ? ArrowRight : null}
        />
        <hr className="element--hr" />
      </Container>
    </div>
  );
}

export default memo(injectIntl(IllustratedMapsElements));
