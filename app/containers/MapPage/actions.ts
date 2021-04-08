/*
 *
 * MapPage actions
 *
 */

import { action } from 'typesafe-actions';
import {
    PostReadMoreState, IPayloadReadMore
} from './types';

import ActionTypes from './constants';

export const loadTravelMaps = (searchLocation: string) => action(ActionTypes.LOAD_TRAVEL_MAPS, searchLocation);
export const loadTravelMapsSuccess = (payload: any) => action(ActionTypes.LOAD_TRAVEL_MAPS_SUCCESS, payload);
export const loadTravelMapsError = () => action(ActionTypes.LOAD_TRAVEL_MAPS_ERROR);

export const loadReadMore = (map: IPayloadReadMore) => action(ActionTypes.LOAD_POST_READ_MORE, map);
export const loadReadMoreSuccess = (payload: PostReadMoreState[]) => action(ActionTypes.LOAD_POST_READ_MORE_SUCCESS, payload);
export const loadReadMoreError = (err: any) => action(ActionTypes.LOAD_POST_READ_MORE_ERROR, err);
