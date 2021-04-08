import React, {memo} from 'react';

import {
  IconButton, 
  Grid, Button
} from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import 'components/MapsElements/maps.scss';
import {
  TravelMapItemState, IPayloadReadMore
} from 'containers/MapPage/types';
import {Link} from "react-router-dom";
import {
  FormattedMessage, injectIntl
} from 'react-intl';

interface Props {
  mapItem: TravelMapItemState;
  key: number;
  handleReadMore: (map: IPayloadReadMore) => void;
}

function MapsCard(props: Props) {
  const {mapItem, key, handleReadMore} = props;

  return (
    <Grid item xs={12} sm={6} lg={6} className="map-element" key={key}>
      <div className="header">
        <IconButton style={{float: 'right', color: '#fff'}}>
          <FavoriteBorderIcon/>
        </IconButton>
      </div>
      <Card className="card--item">
        <Link to={`/maps/${mapItem.id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={mapItem.icon}
              title={mapItem.name}/>
          </CardActionArea>
        </Link>
      </Card>
      <div className="bottom">
        <Grid container>
          <Grid item xs={6} sm={6} className="box--name--map">
            <div className="name--map">{mapItem.name}</div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button 
              className="btn--readmore" variant="outlined" 
              onClick={() => handleReadMore({
                mapId: mapItem.id,
                mapName: mapItem.name,
                descriptionMap: ""
              })}>
                <FormattedMessage id="mapCard.readMore"/>
              </Button>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

export default memo(injectIntl(MapsCard));
