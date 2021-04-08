import { takeLatest, call, put, select } from 'redux-saga/effects';
import ActionTypes from './constants';
import AXIOS_CLIENT, { getHeader } from 'utils/axios';
import { 
  loadTravelMaps,
  loadTravelMapsSuccess,
  loadTravelMapsError,
  loadReadMoreSuccess,
  loadReadMoreError
} from './actions';
import {AxiosResponse} from 'axios';
import {
   makeSelectMapId,
   makeSelectSearchLocation
} from './selectors';
import {PostReadMoreState} from './types';

export default function* mapPageSaga() {
  yield takeLatest(ActionTypes.LOAD_TRAVEL_MAPS, getTravelMaps);
  yield takeLatest(ActionTypes.LOAD_POST_READ_MORE, getPostReadMore);
}

export function* getTravelMaps() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const searchLocation: string = yield select(makeSelectSearchLocation());
    const repos = yield call(travelMapsRequest, searchLocation);
    yield put(loadTravelMapsSuccess(repos.data));
  } catch (err) {
    yield put(loadTravelMapsError());
  }
}

export function* getPostReadMore() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const mapId: number = yield select(makeSelectMapId());
    const repos: AxiosResponse<PostReadMoreState[]> = yield call(getPostReadMoreRequest, mapId);
    yield put(loadReadMoreSuccess(repos.data));
  } catch (err) {
    yield put(loadReadMoreError(err));
  }
}

// Axios call API 
function travelMapsRequest(search: string) {
  let tempSearch = search ? `?term=${search}` : '';
  return AXIOS_CLIENT.get(`api/map/get_travel_maps${tempSearch}`, {
    headers: getHeader()
  });
}

function getPostReadMoreRequest(mapId: number) {
  return AXIOS_CLIENT.get(`/api/post/readmore?travel_map_id=${mapId}`, {
    headers: getHeader()
  });
}
