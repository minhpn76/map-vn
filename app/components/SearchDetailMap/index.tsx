/**
 *
 * SearchDetailMap
 *
 */
import React, { memo } from 'react';
import {
  Container, CardMedia, Card, CardActionArea,
  CardContent, Typography
} from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {MapFilterResponse, MapLocationResponse} from 'containers/MapDetailPage/types';
import './search--map.scss';
import { isUndefined } from 'lodash';

interface Props {
  dataSearch: MapLocationResponse[];
  handleSelectedPlace?: (selectedLocation: any) => void;
  onClickFilter?: (currentLocation: MapFilterResponse) => void;
  loadDirection: () => void;
  clearDirectionData?: () => void;
}

function SearchDetailMap(props: Props) {
  const {dataSearch, handleSelectedPlace, onClickFilter} = props;
  const active: boolean = false;
  React.useEffect(() => {
    let tempAround: any = {
      id: 0,
      name: '',
      icon: '',
      is_landmark: 0,
      travel_id: '',
      map_id: 0,
      pin: ''
    };
    tempAround['locations'] = dataSearch;
    onClickFilter!(tempAround);
  }, [dataSearch]);

  const handleClick = async (place: any) => {
    props.clearDirectionData!();
    if (!isUndefined(handleSelectedPlace)) {
      let filterImage = place.filter_images ? place.filter_images : null;
      if (filterImage) {
        place['locations'] = [place];
        place["icon"] = filterImage.icon;
        onClickFilter!(place);
        handleSelectedPlace(place);
      }
    }
  };

  const menu = dataSearch.map((location, index) => {
    return (
      <div key={index} className={active ? 'map--search-item active' : 'map--search-item'}>
        <Card className="map--search-item-card" onClick={() => handleClick(location)}>
          <CardActionArea>
            {
              location.filter_images && (
                <CardMedia
                  component="img"
                  alt={location.filter_images.name}
                  title={location.filter_images.name}
                  image={location.filter_images.icon}
                />
              )
            }
            <CardContent>
            <Typography align="center" className="locationName">{location.location_name}</Typography>
            <Typography align="center" className="locationDes">{location.address}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  });
  
  return (
    <Container className="search--map">
        <ScrollMenu
          alignCenter={false}
          data={menu}
        />

    </Container>
  );
}

export default memo(SearchDetailMap);
