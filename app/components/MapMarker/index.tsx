/**
 *
 * MapMarker
 *
 */
import React, {memo} from 'react';
import {TEXT_LOCATION_LEVEL, zoomDefault} from "../../contraints/mapStyles";

interface Props {
  active: boolean;
  lat: number;
  lng: number;
  name: string;
  img: string;
  handleClick?: () => void;
  isLandmark: boolean;
  zoomLevel: number;
}

function MapMarker(props: Props) {
  let className = 'map--marker';
  if(props.isLandmark){
    className += ' map--marker-landmark';
  }
  if(props.active){
    className += ' active';
  }
  return (
    <div className={className}>
      <div className="map--marker-margin"
           onClick={props.handleClick}
      >
        <img
          className="map--marker-icon"
          src={props.img}
          alt={props.name}
        />
      </div>
      { props.zoomLevel >= TEXT_LOCATION_LEVEL && (
        <p className="map--marker-text">{props.name}</p>
      )}
    </div>
  );
}

export default memo(MapMarker);
