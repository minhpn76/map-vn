/**
 *
 * AddressElements
 *
 */
import React, { memo } from 'react';
import { Container, Grid } from '@material-ui/core';
import './address.scss';
import AddressCard from 'components/AddressCard';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FilterMapItemState } from 'containers/HomePage/types';

interface Props {
  filterMaps: FilterMapItemState[];
}

function AddressElements(props: Props) {
  const { filterMaps } = props;
  let AddressCards = filterMaps.map((filterMap, index) => {
    return (
      <Grid xs={6} md={3} key={index} item={true}>
        <AddressCard itemAddressCard={filterMap} />
      </Grid>
    );
  });
  return (
    <div  className="address--section">
      <Container className="address--element-container">
        <div className="address--element-wrap">
          <div className="element--title">
            <FormattedMessage id="addressElements.areYouIn" />{' '}
            <span className="address">Cao Lãnh</span>{' '}
            <FormattedMessage id="addressElements.letsDo" />
          </div>
        </div>
      </Container>
      <Container className="container nopadding">
        <Grid container className="address--cards">{AddressCards}</Grid>
      </Container>
      <hr className="element--hr" />
    </div>
  );
}

export default memo(injectIntl(AddressElements));
