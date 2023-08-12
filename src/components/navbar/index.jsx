/* eslint-disable no-lonely-if */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
//
import SvgIconStyle from '../micro/SvgIconStyle';
import { PATHS } from '../../routes/paths';
import { appItems, adminItems } from '../../configs/NavConfig';




export default function NavigationDock({ admin }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const { pathname } = useLocation();

  useEffect(() => {
    if (!admin) {
      if (pathname.startsWith(PATHS.app.cart)) {
        setValue(1);
      }
    }
    else {
      if (pathname === PATHS.dashboard.app) {
        setValue(0);
      }
      else if (pathname === PATHS.dashboard.search) {
        setValue(1);
      }
      else if (pathname === PATHS.dashboard.addProducts) {
        setValue(2);
      }
      else if (pathname.startsWith(PATHS.dashboard.orders)) {
        setValue(3);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Paper
      className='p-f b-0 w-100 zi-100 nav-dock'
      elevation={3}
      sx={{ boxShadow: theme.customShadows.dialog }}
    >
      <BottomNavigation
        // showLabels={false}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{ height: 60 }}
      >
        {
          (admin ? [...adminItems] : [...appItems]).map(e => <BottomNavigationAction
            key={e.to}
            label=""
            component={Link}
            to={e.to}
            sx={{ minWidth: 70, '&.Mui-selected': { color: admin ? 'var(--info-main)' : 'var(--primary-main)' }, '& .MuiBottomNavigationAction-label': { display: 'none' } }}
            icon={<SvgIconStyle
              src={`/assets/samala/icons/${e.icon}`}
              sx={{ width: 25, height: 25 }} />}
          />)
        }
      </BottomNavigation>
    </Paper>
  );
}

NavigationDock.propTypes = {
  admin: PropTypes.bool,
};