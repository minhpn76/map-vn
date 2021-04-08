/*
 *
 * MapDetailPage reducer
 *
 */

import ActionTypes from './constants';
import {ContainerActions, ContainerState, MapLocationResponse, ICheckInGift} from './types';
import _ , {clone, find, isUndefined, merge} from "lodash";

export const initialState: ContainerState = {
  isLoading: false,
  isShowAll: false,
  hasLocation: false,
  mapId: null,
  inputSearch: null,
  allMaps: [],
  locationSearched: [],
  landmarks: [],
  filters: [],
  locations: [],
  locationCheckIn: [],
  locationAround: [],
  selectedLocation: {
    location_name: '',
    longitude: 106.693126,
    latitude: 10.771344,
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
  },
  selectedFilter: {
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
  },
  userLocation: {
    longitude: 106.693126,
    latitude: 10.771344,
  },
  locationClosed: 0,
  checkInGift: {
    header_text: 'Bạn ơi nếm thử nem chua<br>Mua về biếu bạn, lại vừa để ăn',
    gift_text: '1 HỘP NEM LAI VUNG',
    img_link: 'https://s3.ap-northeast.aws.com/askvietnamese/nemlaivung.png'
  }
};

function mapDetailPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOAD_FILTER:
      return {
        isLoading: true,
        isShowAll: false,
        hasLocation: false,
        mapId: action.payload,
        allMaps: [],
        landmarks: [],
        filters: [],
        locations: [],
        locationCheckIn: [],
        locationAround: [],
        locationSearched: [],
        inputSearch: null,
        selectedLocation: {
          location_name: '',
          longitude: 106.693126,
          latitude: 10.771344,
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
        },
        selectedFilter: {
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
        },
        userLocation: {
          longitude: 106.693126,
          latitude: 10.771344,
        }
      };
    case ActionTypes.GET_FILTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        filters: action.payload,
      };
    case ActionTypes.GET_FILTER_LOCATION:
      const {filters: filterData} = state;
      const locations = _(action.payload)
        .map('locationRepos')
        .flatten()
        .value();
      const newFilters = filterData.map((value) => {
        const location = find(action.payload, ['filterId', value.id]);
        if (!isUndefined(location)) {
          return {
            ...value,
            locations: location.locationRepos
          };
        }
        return {
          ...value,
        };
      });
      return {
        ...state,
        locations,
        filters: newFilters
      };
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        selectedFilter: action.payload,
      };
    case ActionTypes.SET_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload
      };
    case ActionTypes.GET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
        hasLocation: true
      };
    case ActionTypes.GET_LANDMARK_SUCCESS:
      return {
        ...state,
        landmarks: action.payload
      };
    case ActionTypes.GET_CHECK_IN_LOCATION:
      return {
        ...state,
        locationCheckIn: action.payload
      };
    case ActionTypes.AROUND_LOCATION:
      return {
        ...state,
        locationAround: action.payload
      };
    case ActionTypes.SEARCH_LOCATION:
      return {
        ...state,
        inputSearch: action.payload
      };
    case ActionTypes.SEARCH_LOCATION_SUCCESS:
      return {
        ...state,
        locationSearched: action.payload
      };
    case ActionTypes.CLOSE_LOCATION:
      return {
        ...state,
        locationClosed: action.payload
      };
    case ActionTypes.CLOSE_LOCATION_SUCCESS:
      return {
        ...state
      };
    case ActionTypes.SHOW_ALL_MAP:
      return {
        ...state,
        isShowAll: action.payload
      };
    case ActionTypes.CHECK_IN_GIFT:
      return {
        ...state,
        checkInGift: action.payload
      };
    case ActionTypes.LOAD_ALL_MAP:
      return {
        ...state,
        allMaps: action.payload
      };
    default:
      return state;
  }
}

export default mapDetailPageReducer;
