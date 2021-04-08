import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface MapPageState {
  isLoading: boolean,
  mapId: number | null;
  mapName: string;
  descriptionMap?: string;
  travelMaps: TravelMapItemState[],
  postReadMore: PostReadMoreState[],
  searchLocation: string
}

export interface TravelMapItemState {
  id: number;
  name: string;
  icon: string;
  pin: string;
  created_at?: string;
  updated_at?: string;  
  latitude: number;
  longitude: number;
}

export interface PostReadMoreState {
  title: string;
  link: string;
  image: string
}

export interface IPayloadReadMore {
  mapId: number;
  mapName: string;
  descriptionMap: string
}

/* --- ACTIONS --- */
type MapPageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = MapPageState;
type ContainerActions = MapPageActions;

export { RootState, ContainerState, ContainerActions };
