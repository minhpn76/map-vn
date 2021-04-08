/**
 *
 * MapFilter
 *
 */
import React, {memo, useState} from 'react';
import history from 'utils/history';
import './filter.scss';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import posed from "react-pose";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {MapFilterResponse, MapLocationResponse} from "containers/MapDetailPage/types";
import MapFilterItem from "../MapFilterItem/Loadable";
import {find, isUndefined} from 'lodash';
import ScrollMenu from "react-horizontal-scrolling-menu";
import MapFilterDialog from "../MapFilterDialog/Loadable";
import {
  FormattedMessage, injectIntl
} from 'react-intl';
interface IAnimatedProps {
  num: number;
}

const LocationBtn = posed.div({
  up: {bottom: 170},
  down: {bottom: 10}
});

const ExpandBtn = posed.div({
  hide: {
    bottom: ({num}: IAnimatedProps) => num,
  },
  show: {
    bottom: ({num}: IAnimatedProps) => num,
  }
});

const RecommendDiv = posed.div({
  hide: {
    height: ({num}: IAnimatedProps) => num,
  },
  show: {
    height: ({num}: IAnimatedProps) => num,
  }
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      fontSize: '1rem',
      border: '1px solid #ccc',
      textTransform: 'capitalize',
      margin: theme.spacing(0),
      padding: theme.spacing(0)
    },
  }),
);

interface Props {
  selectedFilter: MapFilterResponse;
  filters: MapFilterResponse[];
  onClickLocation: () => void;
  onClickItem?: (selectedFilter: MapFilterResponse, selectedLocation: MapLocationResponse) => void;
  setShowSearch?: (isSearch: boolean) => void;
  setInputSearch?: (inputSearch: string) => void;
  clearDirectionData?: () => void;
  mapId: number;
  showRecommendation: boolean;
  setShowRecommendation: (show: boolean) => void;
}

function MapFilter(props: Props) {
  const classes = useStyles();
  const {showRecommendation, setShowRecommendation, selectedFilter} = props;
  const [open, setOpen] = useState(false);

  const setFilterItem = (selectFilter: MapFilterResponse) => {
    if (!isUndefined(selectFilter)) {
      if(history.location.hash === `#filter=${selectFilter.id}`){
        history.push({
          pathname: `/maps/${selectFilter.map_id}`,
          hash: ``
        });
      }else{
        history.push({
          pathname: `/maps/${selectFilter.map_id}`,
          hash: `#filter=${selectFilter.id}`
        });
      }
    }
  };

  const setLocationItem = (selectedFilter: MapFilterResponse, selectedLocation: MapLocationResponse) => {
    if (!isUndefined(props.onClickItem)) {
      props.onClickItem(selectedFilter, selectedLocation);
      setOpen(false);
    }
  };

  const showAllMap = () => {
    if(history.location.hash !== '#filter=all'){
      history.push({
        pathname: `/maps/${props.mapId}`,
        hash: `#filter=all`
      });
      return;
    }
    history.push({
      pathname: `/maps/${props.mapId}`,
      hash: ``
    });
  };

  const openListFilters = () => {
    setOpen(true);
  };

  let Items;
  if (props.filters) {
    Items = props.filters.map((item: MapFilterResponse, key: number) => {
      return (
        <MapFilterItem
          {...item}
          active={item.id === props.selectedFilter.id}
          onClick={() => {
            setFilterItem(item); 
          }}
          key={key}
          clearDirectionData={props.clearDirectionData}
        />
      );
    });
  }
  return (
    <div className="map--filter-wrap">
      <div className="filter--my-location">
        <LocationBtn
          className="location--btn"
          pose={showRecommendation ? "up" : "down"}
        >
          <IconButton
            onClick={props.onClickLocation}
            className="filter--my-button"
            aria-label="My location">
            <MyLocationIcon/>
          </IconButton>
        </LocationBtn>
      </div>
      <div className="filter--my-list">
        <ExpandBtn
          className="expand--btn"
          num={showRecommendation ? -20 : 20}
          pose={showRecommendation ? "show" : "hide"}
        >
          <IconButton
            onClick={() => {
              setShowRecommendation(!showRecommendation);
              props.setShowSearch!(false);
              props.setInputSearch!('');
              props.clearDirectionData!();
            }}
            className="filter--my-button"
            aria-label="My location">
            {showRecommendation ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
          </IconButton>
        </ExpandBtn>
      </div>
      <RecommendDiv
        className="filter--my-recommend"
        num={showRecommendation ? 200 : 0}
        pose={showRecommendation ? "show" : "hide"}>
        <div className="filter--my-recommend-header">
          <Button size="small" className={classes.margin} onClick={showAllMap}>
            <FormattedMessage id="mapFilter.aroundYou"/>
          </Button>
          <Button size="small" className={classes.margin} onClick={openListFilters}>
            <FormattedMessage id="mapFilter.list"/>
          </Button>
        </div>
        <Container className="container nopadding filter--my-recommend-content">
          <ScrollMenu
            alignCenter={false}
            data={Items}
          />
        </Container>
      </RecommendDiv>
      <MapFilterDialog
        open={open}
        currentFilter={selectedFilter}
        onClickItem={setLocationItem}
        filters={props.filters}
        handleClose={() => setOpen(!open)}/>
    </div>
  );
}

export default memo(injectIntl(MapFilter));
