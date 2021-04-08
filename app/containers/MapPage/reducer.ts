/*
 *
 * MapPage reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  isLoading: false,
  travelMaps: [],
  postReadMore: [],
  mapId: null,
  mapName: "",
  descriptionMap: "",
  searchLocation: ""
};

function mapPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOAD_TRAVEL_MAPS:
      return {
        ...state,
        searchLocation: action.payload,
        isLoading: true,
        travelMaps: []
      };
    case ActionTypes.LOAD_TRAVEL_MAPS_ERROR:
      return {
        ...state,
        isLoading: false,
        travelMaps: []
      };
    case ActionTypes.LOAD_TRAVEL_MAPS_SUCCESS:
      return {
        ...state,
        isLoading: true,
        travelMaps: action.payload
      }; 
    case ActionTypes.LOAD_POST_READ_MORE:
      return {
        ...state,
        isLoading: true,
        mapId: action.payload.mapId,
        mapName: action.payload.mapName,
        descriptionMap: action.payload.descriptionMap,
        postReadMore: []
      };
    case ActionTypes.LOAD_POST_READ_MORE_ERROR:
      return {
        ...state,
        isLoading: false,
        postReadMore: []
      };
    case ActionTypes.LOAD_POST_READ_MORE_SUCCESS:
      return {
        ...state,
        isLoading: true,
        postReadMore: action.payload
      }; 
    default:
      return state;
  }
}

export default mapPageReducer;
