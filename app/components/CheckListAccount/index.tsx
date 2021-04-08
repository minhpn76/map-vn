/**
 *
 * CheckListAccount
 *
 */
import React, { memo } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  CardMedia,
  Card,
  CardHeader,
  CardContent,
  Select,
  MenuItem,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';

import 'containers/ProfilePage/profile.scss';
import { ICheckInLocation } from 'containers/ProfilePage/types';

interface Props {
  isLogger: boolean;
  checkListLocation: ICheckInLocation[];
  filterCheckIn: (type: string) => void;
  typeMapField?: string;
}

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      "borderRadius": 50,
      "position": 'relative',
      "backgroundColor": theme.palette.background.paper,
      "border": '1px solid #ced4da',
      "fontSize": 13,
      "padding": '1px 60px 1px 10px',
      "transition": theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 50,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

function CheckListAccount(props: Props) {
  const { isLogger, checkListLocation, filterCheckIn, typeMapField } = props;
  const [time, setTime] = React.useState('ALL');
  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setTime(event.target.value as string);
    filterCheckIn(event.target.value);
  };
  return (
    <>
      <Container className="board--check--list">
        <Card className="check--list">
          <CardHeader
            title={<FormattedMessage id="checkListAccount.checkInList" />}
            action={
              <Select
                labelId="check-list-calendar"
                id="calendar-select"
                value={time}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value="ALL">
                  <FormattedMessage id="laHistoryPage.filter.all" />
                </MenuItem>
                <MenuItem value="0">
                  <FormattedMessage id="laHistoryPage.filter.toDay" />
                </MenuItem>
                <MenuItem value="1">
                  <FormattedMessage id="laHistoryPage.filter.lastWeek" />
                </MenuItem>
                <MenuItem value="2">
                  <FormattedMessage id="laHistoryPage.filter.lastMonth" />
                </MenuItem>
              </Select>
            }
          />
          <CardContent>
            {!isLogger ? (
              <div>
                <Typography className="text--signup" component="p">
                  <FormattedMessage id="checkListAccount.createAccount" />
                </Typography>
                <Typography className="pls--signup" component="p">
                  <FormattedMessage id="checkListAccount.please" />{' '}
                  {
                    typeMapField === 'ASKVN' ? (
                      <Link to="/signup">
                        <FormattedMessage id="signUpPage.btnSignUp" />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <FormattedMessage id="signUpPage.btnSignIn" />
                      </Link>
                    )
                  }
                  <FormattedMessage id="checkListAccount.here" />
                </Typography>
              </div>
            ) : checkListLocation.length === 0 ? (
              <div style={{ textAlign: 'center' }}>
                <Typography component="h4">
                  <i>
                    <FormattedMessage id="notFoundData" />
                  </i>
                </Typography>
              </div>
            ) : (
              <List>
                {checkListLocation.map((check_in, index) => {
                  return (
                    <ListItem className="item--flag" key={index}>
                      <ListItemIcon className="icon--flag">
                        <CardMedia
                          component="img"
                          image={check_in.filter_images!.icon}
                          title={check_in.location_name}
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className="text--flag"
                        primary={check_in.location_name}
                      />
                    </ListItem>
                  );
                })}
              </List>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default memo(injectIntl(CheckListAccount));
