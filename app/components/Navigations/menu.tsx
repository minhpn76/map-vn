import IconHome from 'images/home.png';
import IconHomeActive from 'images/home_active.png';
import IconBooking from 'images/my_bookings.png';
import IconBookingActive from 'images/my_bookings_active.png';
import IconMap from 'images/map.png';
import IconMapActive from 'images/map_active.png';
import IconProfile from 'images/user.png';
import IconProfileActive from 'images/user_active.png';
import {includes} from 'lodash';

function listNav(props?: any) {
    return [
        {
          label: props.intl.formatMessage({
            id:"navigation.home"
          }),
          value: 'home',
          url: '/',
          icon_active: IconHomeActive,
          icon: IconHome,
        },
        {
          label: props.intl.formatMessage({
            id:"navigation.maps"
          }),
          value: 'maps',
          url: '/maps',
          icon_active: IconMapActive,
          icon: IconMap,
        },
        {
          label: props.intl.formatMessage({
            id:"navigation.booking"
          }),
          value: 'booking',
          url: '/booking',
          icon_active: IconBookingActive,
          icon: IconBooking,
        },
        {
          label: props.intl.formatMessage({
            id:"navigation.profile"
          }),
          value: 'profile',
          url: '/profile',
          icon_active: IconProfileActive,
          icon: IconProfile,
        },
      ];
}
export default listNav;