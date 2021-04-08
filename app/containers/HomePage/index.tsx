/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { RouteChildrenProps } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector,createSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Navigations from 'components/Navigations/Loadable';
import Header from 'components/Header/Loadable';
import AvailbleMapsElements from 'components/AvailbleMapsElements/Loadable';
import AddressElements from 'components/AddressElements/Loadable';
import IllustratedMapsElements from 'components/IllustratedMapsElements/Loadable';
import TravelGuidesElements from 'components/TravelGuidesElements/Loadable';
import OurCommunity from 'components/OurCommunity/Loadable';
import ContactUs from 'components/ContactUs/Loadable';
import {
  loadTravelMap,
  loadFilterMap,
  loadPaperMap,
  loadPostTop,
} from './actions';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import ContactElements from 'components/ContactElements/Loadable';

const stateSelector = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

const langSelector = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);


function HomePage(props: RouteChildrenProps<any>) {
  useInjectReducer({ key: 'homePage', reducer: reducer });
  useInjectSaga({ key: 'homePage', saga: saga });

  const { homePage } = useSelector(stateSelector);
  const { locale } = useSelector(langSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // Init data
    dispatch(loadTravelMap());
    dispatch(loadFilterMap());
    dispatch(loadPaperMap());
    dispatch(loadPostTop());
  }, []);
  const {
    travelMaps, filterMaps, paperMaps, postTops
  } = homePage;

  const [lang, setLang] = React.useState('ENG');

  useEffect(() => {
    const tempLang: any = {
      vi: 'VN',
      en: 'ENG'
    };
    setLang(tempLang[locale]);
  }, [locale]);

  const swithLang = (lang: string) => {
    dispatch(changeLocale(lang));
  };
  const changePage = () => {};
  return (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Header
        changeLocale={swithLang}
        lang={lang}
        {...props}
      />
      <ContactElements/>
      <AvailbleMapsElements
        travelMaps={travelMaps}
      />
      <AddressElements
        filterMaps={filterMaps}
      />
      <IllustratedMapsElements
        paperMaps={paperMaps}
      />
      <TravelGuidesElements
        postTops={postTops}
      />
      <OurCommunity {...props}/>
      <ContactUs/>
      <Navigations
        {...props}
        changeLocale={swithLang}
        lang={lang}
      />
    </div>
  );
}

export default memo(injectIntl(HomePage));
