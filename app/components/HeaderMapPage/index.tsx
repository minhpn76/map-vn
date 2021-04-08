/**
 *
 * HeaderMapPage
 *
 */
import React, {memo} from 'react';
import {Container} from '@material-ui/core';
import './header-map.scss';
import SearchPlace from "../SearchPlace";

interface Props {
  inputSearch: string;
  setInputSearch: (inputSearch: string) => void;
  searchLocation: (inputSearch: string) => void;
  dataSearch: any;
  isMapPage: boolean;
  setRollBackSearch: () => void;
}

function HeaderMapPage(props: Props) {
  const {inputSearch, setInputSearch, searchLocation, dataSearch, setRollBackSearch} = props;
  return (
    <>
      <Container className="header--map-page">
        <div className="map--pager-search">
          <SearchPlace
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
            searchLocation={searchLocation}
            dataSearch={dataSearch}
            isMapPage={true}
            setRollBackSearch={setRollBackSearch}
          />
        </div>
      </Container>
    </>
  );
}

export default memo(HeaderMapPage);
