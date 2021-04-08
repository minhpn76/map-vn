/**
 *
 * SearchPlace
 *
 */
import React, {memo} from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  MapLocationResponse
} from 'containers/MapDetailPage/types';
import { FormattedMessage, injectIntl } from 'react-intl';

const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
  },
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  iconSearch: {
    color: 'rgb(246,109,44)',
    cursor: 'pointer'
  },
}));

interface Props {
  inputSearch: string;
  setInputSearch: (inputSearch: string) => void;
  searchLocation: (inputSearch: string) => void;
  dataSearch: MapLocationResponse[];
  isMapPage?: boolean;
  setShowSearch?: (isSearch: boolean) => void;
  clearDirectionData?: () => void;
  setRollBackSearch?: () => void;
  intl?: any;
}

function SearchPlace(props: Props) {
  const { inputSearch, setInputSearch, searchLocation, setShowSearch, clearDirectionData, setRollBackSearch } = props;
  const classes = useStyles();

  const handleChange = (event: any) => {
    if(event.target.value && event.target.value[0] === ' ') { return; }
    event.persist();
    setInputSearch(event.target.value); 
  };

  const onEnterSearch = () => {
    searchLocation(inputSearch || '');
  };
  const clearSearch = () => {
    setInputSearch('');
    if (props.isMapPage === false) {
      setShowSearch!(false);
      clearDirectionData!();
    } else {
      setRollBackSearch!();
    }
  };

  return (
    <CssTextField
      value={inputSearch}
      onChange={handleChange}
      className={classes.root}
      placeholder={
        props.intl.formatMessage({
          id:"mapDetail.searchYourPlaceHere"
        })
      }
      fullWidth
      onKeyPress={e => {
        if (e.key === 'Enter') {
          onEnterSearch();
        }
      }}
      margin="normal"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            { inputSearch && inputSearch !== '' ? (
              <CloseIcon onClick={() => clearSearch()} className={classes.iconSearch}/>
            ) : (
              <SearchIcon onClick={() => onEnterSearch()} className={classes.iconSearch}/>
            )}
            
          </InputAdornment>
        ),
      }}
      id="custom-css-outlined-input"
    />
  );
}

export default memo(injectIntl(SearchPlace));
