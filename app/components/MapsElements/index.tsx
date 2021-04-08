/**
 *
 * MapsElements
 *
 */
import React, {memo} from 'react';
import {Container} from '@material-ui/core';

import MapsCard from 'components/MapsCard';
import './maps.scss';
import {
  TravelMapItemState, IPayloadReadMore
} from 'containers/MapPage/types';

interface Props {
  travelMaps: TravelMapItemState[];
  handleReadMore: (map: IPayloadReadMore) => void;
}

function MapsElements(props: Props) {
  const {travelMaps, handleReadMore} = props;

  let mapCard = travelMaps.map((map, index) => <MapsCard handleReadMore={handleReadMore} mapItem={map} key={index}/>);
  return (
    <>
      <Container className="maps--container">
        {mapCard}
      </Container>
    </>
  );
}

export default memo(MapsElements);
