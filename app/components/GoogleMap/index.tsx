/**
 *
 * GoogleMap
 *
 */
import React, {memo, useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {defaultCenter, ggMapKey, LANDMARK_ZOOM_LEVEL, optionsMaps, zoomDefault} from 'contraints/mapStyles';
import './map.scss';
import 'map-icons/dist/css/map-icons.css';
import {
  ICheckInGift,
  Location,
  LocationShort,
  MapFilterResponse,
  MapLocationResponse
} from "containers/MapDetailPage/types";
import {findIndex, isEmpty, isUndefined} from 'lodash';
import MapMarker from "../MapMarker/Loadable";
import MapDescDialog from "../MapDescDialog/Loadable";
import CurrentLocationIcon from 'images/currentLocation.png';
import TopUpMessage from '../TopUpMessage';
import history from "../../utils/history";
import {typeMap} from "../../utils/utils";
import MapDescDrawer from "../MapDescDrawer";

interface Props {
  icon: string;
  hasLocation: boolean;
  userLocation: Location;
  places?: MapLocationResponse[];
  selectedPlace: MapLocationResponse;
  checkInLocation: MapLocationResponse[];
  userName?: string;
  handleSelectedPlace?: (selectedLocation: MapLocationResponse) => void;
  handleCheckInLocation?: () => void;
  handleClickLike: () => void;
  googleApiIsLoaded: (map: any, maps: any) => void;
  loadDirection: () => void;
  clearDirectionData: () => void;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  isShowAll: boolean;
  filters: MapFilterResponse[];
  landmarks: MapLocationResponse[];
  zoomLevel: number;
  checkInGift?: ICheckInGift;
  currentMapLocation?: LocationShort;
}

function GoogleMap(props: Props) {
  const {
    places, icon, selectedPlace, hasLocation, userLocation, checkInLocation,
    userName, handleCheckInLocation, handleClickLike, googleApiIsLoaded,
    loadDirection, clearDirectionData, open, setOpen,
    filters,
    landmarks,
    isShowAll,
    zoomLevel,
    checkInGift,
    currentMapLocation
  } = props;
  const [center, setCenter] = useState<any>(defaultCenter);
  // const [open, setOpen] = useState(false);
  const [typeMapField, setTypeMapField] = useState<typeMap>(typeMap.ASKVN);
  const [openMessage, setOpenMessage] = useState(false);
  let markers;
  const [canCheckIn, setCanCheckIn] = useState(false);

  const checkInNotLogin = [923, 924, 925, 926, 927];

  useEffect(() => {
    if(checkInNotLogin.includes(selectedPlace.id)) {
      setCanCheckIn(true);
    }
  }, [selectedPlace]);
  // Set center map
  useEffect(() => {
    setCenter(currentMapLocation);
  }, [currentMapLocation]);

  if (!isUndefined(places) && places) {
    markers = places.map((value, index) => {
      if(value.filter_images && value.filter_images.is_landmark === 1){
        return (<></>);
      }
      const {latitude: lat, longitude: lng} = value;
      const iconTemp = value.filter_images ? value.filter_images.icon : '';
      const active = findIndex(checkInLocation, ['id', value.id]) >= 0;
      return (
        <MapMarker
          key={index}
          active={active || !!(selectedPlace && value.id === selectedPlace.id)}
          handleClick={() => {
            handleClick(value);
            setCanCheckIn(active);
            if (!(active || !!(selectedPlace && value.id === selectedPlace.id))) {
              clearDirectionData();
            }
          }}
          img={icon ? icon : iconTemp}
          lat={lat}
          lng={lng}
          zoomLevel={zoomLevel}
          name={value.location_name}
        />
      );
    });
  }
  let allMarkers: any = [];
  let allMarkersData;
  if(filters && isEmpty(allMarkers)){
    filters.map((filter) => {
      if(!filter.locations){
        return;
      }

      filter.locations.map((value) => {
        const {latitude: lat, longitude: lng} = value;
        const icon = filter.icon;
        const active = findIndex(checkInLocation, ['id', value.id]) >= 0;
        allMarkers.push({
          value,
          lat,
          lng,
          icon,
          active
        });
      });
    });
    if(!isEmpty(allMarkers) && !allMarkersData){
      allMarkersData = allMarkers.map((data, index) => {
        const { value, lat, lng, active, icon } = data;
        return (
          <MapMarker
            key={index}
            active={active || !!(selectedPlace && value.id === selectedPlace.id)}
            handleClick={() => {
              handleClick(value);
              setCanCheckIn(active);
              if (!(active || !!(selectedPlace && value.id === selectedPlace.id))) {
                clearDirectionData();
              }
            }}
            img={icon}
            lat={lat}
            lng={lng}
            zoomLevel={zoomLevel}
            name={value.location_name}
          />
        );
      });
    }
  }
  // Landmarks
  let landmarkMarkers: any;
  if(landmarks && !isEmpty(landmarks)){
    landmarkMarkers = landmarks.map((value, index) => {
      const {latitude: lat, longitude: lng} = value;
      const iconTemp = value.landmark_image || '';
      const active = findIndex(checkInLocation, ['id', value.id]) >= 0;
      return (
        <MapMarker
          key={index}
          active={active || !!(selectedPlace && value.id === selectedPlace.id)}
          handleClick={() => {
            handleClick(value);
            setCanCheckIn(active);
            if (!(active || !!(selectedPlace && value.id === selectedPlace.id))) {
              clearDirectionData();
            }
          }}
          img={iconTemp}
          lat={lat}
          lng={lng}
          isLandmark
          zoomLevel={zoomLevel}
          name={value.location_name}
        />
      );
    });
  }

  const handleClick = (place: MapLocationResponse) => {
    history.push({
      pathname: `/maps/${place.travelmap_id}`,
      hash: `#filter=${place.filter_id}#location=${place.id}`
    });
  };

  const handleClose = () => {
    setOpen(false);
    history.push({
      pathname: `/maps/${selectedPlace.travelmap_id}`,
      hash: `#filter=${selectedPlace.filter_id}`
    });
  };

  const handleCheckIn = () => {
    if (!isUndefined(handleCheckInLocation)) {
      setTypeMapField(typeMap.ASKVN);
      if(checkInNotLogin.includes(selectedPlace.id)){
        setTypeMapField(typeMap.DAI_HOI_DANG);
        handleCheckInLocation();
      }
      if(!isUndefined(userName) && !!userName) {
        handleCheckInLocation();
      }
      setOpen(!open);
      setOpenMessage(true);
    }

    history.push({
      pathname: `/maps/${selectedPlace.travelmap_id}`,
      hash: `#filter=${selectedPlace.filter_id}`
    });
    setCenter({
      lat: selectedPlace.latitude,
      lng: selectedPlace.longitude,
    });
  };

  useEffect(() => {
    if (!isUndefined(selectedPlace)) {
      setCenter({
        lat: selectedPlace.latitude,
        lng: selectedPlace.longitude,
      });
    }
  }, [selectedPlace]);

  const getDirection = () => {
    setOpen(false);
    loadDirection();
    setOpen(false);
    history.push({
      pathname: `/maps/${selectedPlace.travelmap_id}`,
      hash: `#filter=${selectedPlace.filter_id}`
    });
  };
  return (
    <div className="map--fullscreen">
      <GoogleMapReact
        options={optionsMaps}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => googleApiIsLoaded(map, maps)}
        bootstrapURLKeys={{key: ggMapKey}}
        defaultCenter={defaultCenter}
        center={center}
        defaultZoom={zoomDefault}
      >
        {zoomLevel >= LANDMARK_ZOOM_LEVEL && landmarkMarkers}
        {isShowAll && allMarkersData}
        {hasLocation && userLocation && (
          <MapMarker
            active={true}
            name="User location"
            img={CurrentLocationIcon}
            lat={userLocation.latitude}
            lng={userLocation.longitude}
          />
        )}
        {markers}
      </GoogleMapReact>
      <MapDescDrawer
        getDirection={getDirection}
        location={selectedPlace}
        canCheckIn={canCheckIn}
        handleCheckIn={handleCheckIn}
        handleClickLike={handleClickLike}
        open={open}
        handleClose={handleClose}
      />
      <MapDescDialog
        getDirection={getDirection}
        location={selectedPlace}
        canCheckIn={canCheckIn}
        handleCheckIn={handleCheckIn}
        handleClickLike={handleClickLike}
        open={open}
        handleClose={handleClose}
      />
      <TopUpMessage
        point={selectedPlace.reward_point || 0}
        handleCloseMessage={() => {
          setOpenMessage(!openMessage);
        }}
        type={typeMapField}
        userName={userName || ''}
        openMessage={openMessage}
        checkInGift={checkInGift}
      />
    </div>
  );
}

export default memo(GoogleMap);
