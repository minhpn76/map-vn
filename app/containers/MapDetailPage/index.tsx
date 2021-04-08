/*
 *
 * MapDetailPage
 *
 */

import React, {memo, useEffect, useState} from 'react';
import history from 'utils/history';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector, createStructuredSelector} from 'reselect';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import makeSelectMapDetailPage, {
  makeSelectCheckInGift,
  makeSelectLocationAround,
  makeSelectLocationSearched
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {Helmet} from 'react-helmet';
import Navigations from 'components/Navigations/Loadable';
import {RouteChildrenProps} from 'react-router-dom';
import GoogleMap from 'components/GoogleMap/Loadable';
import {FormattedMessage, injectIntl} from 'react-intl';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SearchPlace from 'components/SearchPlace/Loadable';
import './mapDetail.scss';
import MapFilter from 'components/MapFilter/Loadable';
import {
  checkInLocation,
  clickLike,
  getFilterTravel,
  searchLocation,
  setFilter,
  setLocation,
  setUserLocation,
  closeLocation, showAllMap
} from './actions';
import {LocationShort, MapFilterResponse, MapLocationResponse} from './types';
import {split, find, findLast, parseInt, isEmpty, filter} from 'lodash';
import LocationAroundMe from 'components/LocationAroundMe';
import SearchDetailMap from 'components/SearchDetailMap';
import {
  apiGetDirection,
  clearDirection,
  drawDirection,
  getLocation,
  getZoomLevel, polylineConfig,
  removeMarkers
} from 'utils/googleMaps';
import {defaultCenter, zoomDefault} from "../../contraints/mapStyles";
import Header from "../../components/Header/Loadable";
import {makeSelectLocale} from "../LanguageProvider/selectors";
import {changeLocale} from "../LanguageProvider/actions";

const stateSelector = createStructuredSelector({
  mapDetailPage: makeSelectMapDetailPage(),
  aroundMe: makeSelectLocationAround(),
  searchedLocation: makeSelectLocationSearched(),
  checkInGift: makeSelectCheckInGift()
});

const langSelector = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

interface IMapDetailPage extends RouteChildrenProps<any> {
  intl?: any;
}
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "width": '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function MapDetailPage(props: IMapDetailPage) {
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({key: 'mapDetailPage', reducer: reducer});
  useInjectSaga({key: 'mapDetailPage', saga: saga});

  const {mapDetailPage, aroundMe, searchedLocation, checkInGift} = useSelector(stateSelector);
  const [mapApi, setMapApi] = useState<any>({
    map: null,
    maps: null,
    directionsRender: null,
    directionsService: null,
  });
  const [zoomLevel, setZoomLevel] = useState<number>(zoomDefault);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [showRecommendation, setShowRecommendation] = useState<boolean>(true);
  const [lastFilter, setLastFilter] = useState<string>('0');
  const [currentMapLocation, setCurrentMapLocation] = useState<LocationShort>(defaultCenter);
  const {map} = mapApi;
  // TODO refactor
  const user_profile = localStorage.getItem('user_profile') || null;
  const user = user_profile ? JSON.parse(user_profile).user : {};
  const userName = user.name || '';

  const classes = useStyles();
  const [openAskLocation, setOpenAskLocation] = useState<boolean>(false);

  const dispatch = useDispatch();
  // Global handle URL
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      dispatch(getFilterTravel(props.match.params.id));
    }
    askCurrentLocation();
  }, []);

  useEffect(() => {
    if (!isEmpty(mapDetailPage.allMaps)
      && mapDetailPage.allMaps.length > 0
      && props.match
      && props.match.params
      && props.match.params.id
      && props.match.params.id !== null
    ) {
      const id = props.match.params.id || '0';
      const currentMap = findLast(mapDetailPage.allMaps, (map) => {
        return map.id === parseInt(id || '', 10);
      });
      if (currentMap) {
        setCurrentMapLocation({
          lat: currentMap.latitude,
          lng: currentMap.longitude
        });

        const hashValues = split(props.location.hash.substr(1), '#');
        const filterHash = filter(hashValues, (hashValue) => {
          const hash = split(hashValue, '=', 2);
          return hash[0] !== '';
        });
        if (filterHash && filterHash.length === 0) {
          dispatch(setLocation({
            location_name: '',
            longitude: currentMap.longitude,
            latitude: currentMap.latitude,
            website: '',
            tags: null,
            reward_point: 0,
            travelmap_id: 0,
            rate_reasonable: 0,
            rate_friendliness: 0,
            rate_decoration: 0,
            rate_cleaness: 0,
            rate_authentic: 0,
            price_range_type: null,
            price_range: '',
            map_id: 0,
            landmark_image: null,
            images: [],
            image: '',
            filter_id: 0,
            description: '',
            contact_info: '',
            business_time: null,
            address: '',
            id: 0
          }));
        }
      }
    }
  }, [mapDetailPage.allMaps]);
  /**
   * filter by hash
   */
  useEffect(() => {
    setOpen(false);
    if (props.location.hash) {
      const hashValues = split(props.location.hash.substr(1), '#');
      hashValues.map((hashValue) => {
        const hash = split(hashValue, '=', 2);
        if (hash[0] === 'filter') {
          const filter = hash[1];
          if (filter) {
            setLastFilter(filter);
            if (filter !== 'all') {
              const filterSelected = find(mapDetailPage.filters, ['id', +filter]);
              if (filterSelected) {
                setCurrentMapLocation({
                  lat: filterSelected.latitude,
                  lng: filterSelected.longitude
                });
                if (map) {
                  map.setZoom(filterSelected.zoom_level);
                }
                dispatch(setFilter(filterSelected));
                dispatch(showAllMap(false));
              }
            } else {
              dispatch(showAllMap(true));
              dispatch(setFilter({
                id: 0,
                name: '',
                icon: '',
                is_landmark: 0,
                travel_id: '',
                map_id: 0,
                latitude: 0,
                longitude: 0,
                zoom_level: 15,
                pin: ''
              }));
            }
          }
        }
        if (hash[0] === 'location') {
          const location: string = hash[1];
          if (location) {
            const currentLocation = findLast([
              ...mapDetailPage.locations,
              ...mapDetailPage.locationAround,
              ...mapDetailPage.locationCheckIn,
              ...mapDetailPage.locationSearched,
              ...mapDetailPage.landmarks
            ], ['id', parseInt(location, 10)]);
            if (currentLocation) {
              setOpen(true);
              dispatch(setLocation(currentLocation));
            }
          }
        }
      });
    } else {
      dispatch(showAllMap(false));
      dispatch(setFilter({
        id: 0,
        name: '',
        icon: '',
        is_landmark: 0,
        travel_id: '',
        map_id: 0,
        latitude: 0,
        longitude: 0,
        zoom_level: 15,
        pin: ''
      }));
    }
  }, [props.location.hash, mapDetailPage.locations, mapDetailPage.filters, mapDetailPage.landmarks, mapDetailPage.allMaps]);

  const handleCheckInLocation = () => {
    dispatch(checkInLocation());
  };

  // TODO: bo phan nay di. xem phan select bang URL tai Components/AddressCard (chi su dung link) #filter=X
  const selectFilter = (currentFilter: MapFilterResponse) => {
    dispatch(setFilter(currentFilter));
    dispatch(showAllMap(false));
  };

  const selectedLocation = (
    selectedFilter: MapFilterResponse,
    selectedLocation: MapLocationResponse,
  ) => {
    dispatch(setFilter(selectedFilter));
    dispatch(setLocation(selectedLocation));
    dispatch(showAllMap(false));
  };

  const selectedMapLocation = (selectedLocation: MapLocationResponse) => {
    dispatch(setLocation(selectedLocation));
  };

  const handleClickLike = () => {
    dispatch(clickLike());
  };

  /**
   * Set location when get location done (Location)
   * @param latitude
   * @param longitude
   */
  const setCurrentLocation = (latitude: number, longitude: number) => {
    dispatch(
      setUserLocation({
        longitude,
        latitude,
      }),
    );
    setCurrentMapLocation({
      lat: latitude,
      lng: longitude
    });
  };


  /**
   * Set location when get location done (Location)
   * @param latitude
   * @param longitude
   */
  const setCurrentLocationNotSetCenter = (latitude: number, longitude: number) => {
    dispatch(
      setUserLocation({
        longitude,
        latitude,
      }),
    );
  };

  const askCurrentLocation = () => {
    getLocation(setCurrentLocationNotSetCenter);
  };
  /**
   * Get location promise
   */
  const getCurrentLocation = () => {
    getLocation(setCurrentLocation);
  };

  const onSearchLocation = (inputSearch: string) => {
    setShowSearch(true);
    dispatch(searchLocation(inputSearch));
    dispatch(showAllMap(false));
    history.push({
      pathname: history.location.pathname,
      hash: ``
    });
  };

  /**
   * google api is loaded
   * @param map
   * @param maps
   */
  const googleApiIsLoaded = (map: any, maps: any) => {
    if (map && maps) {
      const newDirectionsRenderer = new maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: polylineConfig.strokeColor
        }
      });
      const newDirectionsService = new maps.DirectionsService();
      setMapApi({
        map,
        maps,
        directionsRender: newDirectionsRenderer,
        directionsService: newDirectionsService
      });

      getZoomLevel(map, (zoomLevel: number) => {
        setZoomLevel(zoomLevel);
      });
    }
  };

  const loadDirection = () => {
    removeMarkers();
    if(!mapDetailPage.hasLocation) {
      // TODO popup
      askCurrentLocation();
      setOpenAskLocation(true);
      return;
    }
    const {latitude, longitude} = mapDetailPage.selectedLocation;

    setShowRecommendation(false);
    apiGetDirection(mapDetailPage.userLocation,
      {
        latitude,
        longitude
      },
      mapApi, props.intl.formatMessage({
        id: "mapDetail.AboutPoint"
      })
    );
  };
  /**
   * Clear direction
   */
  const clearDirectionData = () => {
    clearDirection(mapApi);
  };

  const onCloseLocation = (locationId: number) => {
    dispatch(closeLocation(locationId));
  };

  const [lang, setLang] = React.useState('ENG');
  const {locale} = useSelector(langSelector);

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

  return (
    <div>
      <Helmet>
        <title>Map detail</title>
        <meta name="description" content="Description of map detail"/>
      </Helmet>
      <Header
        mobileHide={true}
        changeLocale={swithLang}
        lang={lang}
        {...props}
      />
      <Snackbar open={openAskLocation} autoHideDuration={10000} onClose={() => {
        setOpenAskLocation(false);
      }}>
        <Alert onClose={() => {
          setOpenAskLocation(false);
        }} severity="success">
          <FormattedMessage id="mapDetail.Alert.AskLocation" default="We need to access your location to show the direction"/>
        </Alert>
      </Snackbar>
      <div className="map--search">
        <Container>
          <SearchPlace
            searchLocation={onSearchLocation}
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
            setShowSearch={setShowSearch}
            clearDirectionData={clearDirectionData}
            isMapPage={false}
          />
          {
            showSearch && (
              <SearchDetailMap
                handleSelectedPlace={selectedMapLocation}
                dataSearch={searchedLocation}
                onClickFilter={selectFilter}
                loadDirection={loadDirection}
                clearDirectionData={clearDirectionData}
              />
            )
          }
        </Container>
      </div>
      <GoogleMap
        selectedPlace={mapDetailPage.selectedLocation}
        places={mapDetailPage.selectedFilter.locations}
        landmarks={mapDetailPage.landmarks}
        hasLocation={mapDetailPage.hasLocation}
        userLocation={mapDetailPage.userLocation}
        checkInLocation={mapDetailPage.locationCheckIn}
        aroundLocation={mapDetailPage.locationAround}
        handleSelectedPlace={selectedMapLocation}
        handleCheckInLocation={handleCheckInLocation}
        handleClickLike={handleClickLike}
        userName={userName}
        dataSearch={searchedLocation}
        icon={mapDetailPage.selectedFilter.icon}
        googleApiIsLoaded={googleApiIsLoaded}
        loadDirection={loadDirection}
        clearDirectionData={clearDirectionData}
        open={open}
        setOpen={setOpen}
        filters={mapDetailPage.filters}
        isShowAll={mapDetailPage.isShowAll}
        zoomLevel={zoomLevel}
        checkInGift={checkInGift}
        currentMapLocation={currentMapLocation}
      />
      <div className="map--filter">
        <MapFilter
          onClickItem={selectedLocation}
          onClickLocation={getCurrentLocation}
          selectedFilter={mapDetailPage.selectedFilter}
          filters={mapDetailPage.filters}
          setShowSearch={setShowSearch}
          setInputSearch={setInputSearch}
          clearDirectionData={clearDirectionData}
          mapId={mapDetailPage.mapId}
          showRecommendation={showRecommendation}
          setShowRecommendation={setShowRecommendation}
        />
      </div>
      {aroundMe && aroundMe.length > 0 && (
        <LocationAroundMe
          aroundMe={aroundMe}
          handleSelectedPlace={selectedMapLocation}
          onClickFilter={selectFilter}
          onCloseLocation={onCloseLocation}
          inputSearch={inputSearch}
          loadDirection={loadDirection}
          clearDirectionData={clearDirectionData}
          selectedLocation={mapDetailPage.selectedLocation}
        />
      )}
      <Navigations {...props} />
    </div>
  );
}

export default memo(injectIntl(MapDetailPage));
