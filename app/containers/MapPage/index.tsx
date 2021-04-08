/*
 *
 * MapPage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Navigations from 'components/Navigations/Loadable';
import HeaderMapPage from 'components/HeaderMapPage/Loadable';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMapPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import MapsElements from 'components/MapsElements/Loadable';
import { loadTravelMaps, loadReadMore } from './actions';
import { Dialog } from '@material-ui/core';
import ReadMore from 'components/ReadMore';
import { IPayloadReadMore } from './types';

const stateSelector = createStructuredSelector({
  mapPage: makeSelectMapPage(),
});

interface Props {}

function MapPage(props: Props) {
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: 'mapPage', reducer: reducer });
  useInjectSaga({ key: 'mapPage', saga: saga });

  const { mapPage } = useSelector(stateSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    // Init data
    dispatch(loadTravelMaps(''));
  }, []);
  const { travelMaps, postReadMore, mapName, descriptionMap } = mapPage;
  const [inputSearch, setInputSearch] = React.useState('');
  const searchLocation = () => {
    dispatch(loadTravelMaps(inputSearch));
  };
  // read more
  const handleReadMore = (map: IPayloadReadMore) => {
    const { mapId, mapName, descriptionMap } = map;
    dispatch(
      loadReadMore({
        mapId: mapId,
        mapName: mapName,
        descriptionMap: descriptionMap,
      }),
    );
    handleOpenReadMore();
  };
  const [openReadMore, setOpenReadMore] = React.useState(false);
  const handleOpenReadMore = () => {
    setOpenReadMore(!openReadMore);
  };
  const handleCloseReadMore = () => {
    setOpenReadMore(!openReadMore);
  };
  const setRollBackSearch = () => {
    dispatch(loadTravelMaps(''));
  };

  return (
    <div>
      <Helmet>
        <title>MapPage</title>
        <meta name="description" content="Description of MapPage" />
      </Helmet>
      <HeaderMapPage
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        searchLocation={searchLocation}
        isMapPage={true}
        setRollBackSearch={setRollBackSearch}
      />
      <MapsElements travelMaps={travelMaps} handleReadMore={handleReadMore} />
      <Dialog open={openReadMore} fullScreen onClose={handleCloseReadMore}>
        <ReadMore
          handleCloseReadMore={handleCloseReadMore}
          postReadMore={postReadMore}
          mapName={mapName}
          descriptionMap={descriptionMap}
        />
      </Dialog>
      <Navigations {...props} />
    </div>
  );
}

export default memo(injectIntl(MapPage));
