import {takeLatest, call, put, select, all} from 'redux-saga/effects';
import ActionTypes from './constants';
import AXIOS_CLIENT, {getHeader} from 'utils/axios';
import {AxiosResponse} from 'axios';
import history from 'utils/history';
import {TYPE} from 'utils/utils';
import {
  aroundLocation,
  getCheckInLocation as getCheckInLocationAction,
  getFilterMapSuccess,
  getLocationMapSuccess,
  searchLocationSuccess, setFilter,
  setLocation,
  closeLocationSuccess, getLandmarkSuccess,
  checkInGift, loadTravelMapsSuccess, loadTravelMapsError
} from './actions';
import {
  makeSelectMapId,
  makeSelectLocation,
  makeSelectSelectedLocation,
  makeSelectInputSearch,
  makeSelectLocationClosed,
  makeSelectMapFilters
} from './selectors';
import {MapFilterResponse, MapLocationResponse, Location} from './types';
import {isEmpty, split, find} from 'lodash';
import {TravelMapItemState} from "../MapPage/types";
// Individual exports for testing
export default function* mapDetailPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ActionTypes.LOAD_FILTER, getFilterMap);
  yield takeLatest(ActionTypes.LOAD_FILTER, getTravelMaps);
  yield takeLatest(ActionTypes.GET_USER_LOCATION, getCheckInLocation);
  yield takeLatest(ActionTypes.GET_USER_LOCATION, getAroundLocation);
  yield takeLatest(ActionTypes.CHECK_IN_LOCATION, setCheckInLocation);
  yield takeLatest(ActionTypes.SEARCH_LOCATION, searchLocation);
  yield takeLatest(ActionTypes.CLICK_LIKE, setClickLike);
  yield takeLatest(ActionTypes.CLOSE_LOCATION, closeLocation);
  yield takeLatest(ActionTypes.GET_FILTER_LOCATION, checkAndSetFilter);
}

export function* getTravelMaps() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const repos: AxiosResponse<TravelMapItemState[]> = yield call(travelMapsRequest, '');
    yield put(loadTravelMapsSuccess(repos.data));
  } catch (err) {
    yield put(loadTravelMapsError());
  }
}

function travelMapsRequest(search: string) {
  let tempSearch = search ? `?term=${search}` : '';
  return AXIOS_CLIENT.get(`api/map/get_travel_maps${tempSearch}`, {
    headers: getHeader()
  });
}

export function* getFilterMap() {
  try {
    const mapId: number = yield select(makeSelectMapId());
    // Call our request helper (see 'utils/request')
    const repos: AxiosResponse<MapFilterResponse[]> = yield call(
      getFilterMapRequest,
      mapId,
    );
    yield put(getFilterMapSuccess(repos.data));
    if (!isEmpty(repos.data)) {
      const AllCall = repos.data.map((value: MapFilterResponse) => {
        return call(callLocationData, value.travel_id, value.id);
      });

      const reposLocation = yield all(AllCall);
      yield put(getLocationMapSuccess(reposLocation));
    }
    const landmarks: AxiosResponse<MapLocationResponse[]> = yield call(
      getLandmarkRequest,
      mapId
    );
    yield put(getLandmarkSuccess(landmarks.data));
  } catch (err) {
    // yield put(loadTravelMapError());
  }
}

function getFilterMapRequest(mapId: number) {
  return AXIOS_CLIENT.get(`api/map/get_filter?travelmap_id=${mapId}`, {
    headers: getHeader(),
  });
}

function getLandmarkRequest(mapId: number) {
  return AXIOS_CLIENT.get(`api/map/get_landmark?travelmap_id=${mapId}`, {
    headers: getHeader(),
  });
}

function* callLocationData(travelId: string, filterId: number) {
  const repos: AxiosResponse<MapLocationResponse[]> = yield call(
    getLocationByFilterRequest,
    travelId,
  );

  if (repos.data) {
    return {
      locationRepos: repos.data,
      filterId,
    };
  }
}

function getLocationByFilterRequest(travelId: string) {
  return AXIOS_CLIENT.get(`api/v2/map/get_locations?filter=${travelId}`, {
    headers: getHeader(),
  });
}

export function* getCheckInLocation() {
  try {
    const Location: Location = yield select(makeSelectLocation());
    const mapId: number = yield select(makeSelectMapId());
    // Call our request helper (see 'utils/request')
    const repos: AxiosResponse<MapLocationResponse[]> = yield call(
      getCheckInLocationRequest,
      Location,
      mapId
    );
    yield put(getCheckInLocationAction(repos.data));
  } catch (err) {
    // yield put(loadTravelMapError());
  }
}

function getCheckInLocationRequest(Location: Location, mapId: number) {
  return AXIOS_CLIENT.post(
    `api/map/can_checkin`,
    {
      lat: Location.latitude,
      lon: Location.longitude,
      travelmap_id: +mapId
    },
    {
      headers: getHeader(),
    },
  );
}

export function* setCheckInLocation() {
  try {
    const selectedLocation: MapLocationResponse = yield select(
      makeSelectSelectedLocation(),
    );
    const Location: Location = yield select(makeSelectLocation());
    // Call our request helper (see 'utils/request')
    if (TYPE === 'ASKVN') {
      yield call(setCheckInLocationRequest, selectedLocation, Location);
    } else {
      const repos: any = yield call(setCheckInLocationRequest, selectedLocation, Location);
      yield put(checkInGift(repos.data.gift));
    }
  } catch (err) {
    // yield put(loadTravelMapError());
  }
}

function setCheckInLocationRequest(
  selectedLocation: MapLocationResponse,
  Location: Location,
) {
  return AXIOS_CLIENT.post(
    `api/map/checkin`,
    {
      location_id: selectedLocation.id,
      lat: Location.latitude,
      lon: Location.longitude,
    },
    {
      headers: getHeader(),
    },
  );
}

export function* getAroundLocation() {
  try {
    const Location: Location = yield select(makeSelectLocation());
    const mapId: number = yield select(makeSelectMapId());
    // Call our request helper (see 'utils/request')
    const repos: AxiosResponse<MapLocationResponse[]> = yield call(
      getAroundLocationRequest,
      Location,
      mapId
    );
    yield put(aroundLocation(repos.data));
  } catch (err) {
    // yield put(loadTravelMapError());
  }
}

function getAroundLocationRequest(Location: Location, mapId: number) {
  return AXIOS_CLIENT.post(
    `api/map/around`,
    {
      lat: Location.latitude,
      lon: Location.longitude,
      travelmap_id: +mapId
    },
    {
      headers: getHeader(),
    },
  );
}

export function* searchLocation() {
  try {
    const mapId: number = yield select(makeSelectMapId());
    const inputSearch: string | null = yield select(makeSelectInputSearch());
    // Call our request helper (see 'utils/request')
    const repos: AxiosResponse<MapLocationResponse[]> = yield call(
      searchLocationRequest,
      inputSearch,
      mapId
    );
    yield put(searchLocationSuccess(repos.data));
  } catch (err) {
    // yield put(loadTravelMapError());
  }
}

function searchLocationRequest(inputSearch: string | null, mapId: number) {
  return AXIOS_CLIENT.get(`api/map/search?travelmap_id=${mapId}&term=${inputSearch}`, {
    headers: getHeader(),
  });
}

export function* setClickLike() {
  try {
    const selectedLocation: MapLocationResponse = yield select(makeSelectSelectedLocation());

    const repos: AxiosResponse<any> = yield call(setClickLikeRequest, selectedLocation);
    selectedLocation.likes = repos.data.likes;
    yield put(setLocation(selectedLocation));
  } catch (err) {
    // yield put(loadTravelMapError());
  }
}

function setClickLikeRequest(selectedLocation: MapLocationResponse) {
  return AXIOS_CLIENT.get(`api/map/location/like?location_id=${selectedLocation.id}`, {
    headers: getHeader()
  });
}

export function* closeLocation() {
  try {
    const userLocation: number = yield select(makeSelectLocationClosed());
    // Call our request helper (see 'utils/request')
    const repos = yield call(closeLocationRequest, userLocation);
    yield put(closeLocationSuccess(repos.data));
  } catch (err) {
    // yield put(loadTravelMapError());
  }
}

function closeLocationRequest(userLocation: number) {
  return AXIOS_CLIENT.post(
    `api/map/remove_notifications`,
    {
      location_id: +userLocation
    },
    {
      headers: getHeader(),
    },
  );
}
export function* checkAndSetFilter() {
  if (history.location.hash) {
    const hash = split(history.location.hash, '=', 2);
    if (hash[0] === '#filter') {
      const filter = hash[1];
      if (filter) {
        const filters: MapFilterResponse[] = yield select(makeSelectMapFilters());
        if (filters) {
          const filterSelected = find(filters, ['id', +filter]);
          if (filterSelected) {
            yield put(setFilter(filterSelected));
          }
        }
      }
    }
  }
}
