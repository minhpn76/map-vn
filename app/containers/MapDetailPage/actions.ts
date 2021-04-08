/*
 *
 * MapDetailPage actions
 *
 */

import {action} from 'typesafe-actions';
import {MapLocationResponse, MapFilterResponse, MapLocationAction, Location, ICheckInGift} from './types';

import ActionTypes from './constants';
import {TravelMapItemState} from "../MapPage/types";

export const loadTravelMapsSuccess = (allMap: TravelMapItemState[]) => action(ActionTypes.LOAD_ALL_MAP, allMap);
export const loadTravelMapsError = () => action(ActionTypes.LOAD_ALL_MAP_ERROR);
export const getFilterTravel = (map_id: number) => action(ActionTypes.LOAD_FILTER, map_id);
export const getFilterMapSuccess = (filters: MapFilterResponse[]) => action(ActionTypes.GET_FILTER_SUCCESS, filters);
export const getLandmarkSuccess = (locations: MapLocationResponse[]) => action(ActionTypes.GET_LANDMARK_SUCCESS, locations);
export const getLocationMapSuccess = (locations: MapLocationAction[]) => action(ActionTypes.GET_FILTER_LOCATION, locations);
export const setFilter = (filter: MapFilterResponse) => action(ActionTypes.SET_FILTER, filter);
export const setLocation = (location: MapLocationResponse) => action(ActionTypes.SET_LOCATION, location);
export const setUserLocation = (location: Location) => action(ActionTypes.GET_USER_LOCATION, location);
export const getCheckInLocation = (location: MapLocationResponse[]) => action(ActionTypes.GET_CHECK_IN_LOCATION, location);
export const checkInLocation = () => action(ActionTypes.CHECK_IN_LOCATION);
export const aroundLocation = (location: any) => action(ActionTypes.AROUND_LOCATION, location);
export const searchLocation = (inputSearch: string) => action(ActionTypes.SEARCH_LOCATION, inputSearch);
export const searchLocationSuccess = (location: MapLocationResponse[]) => action(ActionTypes.SEARCH_LOCATION_SUCCESS, location);
export const clickLike = () => action(ActionTypes.CLICK_LIKE);
export const closeLocation = (locationId: number) => action(ActionTypes.CLOSE_LOCATION, locationId);
export const closeLocationSuccess = (location: any) => action(ActionTypes.CLOSE_LOCATION_SUCCESS, location);
export const showAllMap = (isShowAll = true) => action(ActionTypes.SHOW_ALL_MAP, isShowAll);
export const checkInGift = (checkInGift: ICheckInGift) => action(ActionTypes.CHECK_IN_GIFT, checkInGift);

