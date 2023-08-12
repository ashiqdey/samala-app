import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom"
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
// components
import Iconify from '../../../components/micro/Iconify';
import Logo from '../../../components/micro/Logo';
import { PATHS } from '../../../routes/paths';



// -----------------------------------------------


export default function SearchBar({ path }) {
  const navigate = useNavigate();

  const clickHandler = () => {
    setTimeout(() => {
      navigate(path || PATHS.app.search, { state: { focus: true } });
    }, 500)
  }

  return (
    <Box className="p-s t-0 pt-2 zi-100 white-gradient" sx={{ borderRadius: ' 0 0 30px 30px' }}>
      <ButtonBase
        component={Stack}
        direction='row'
        sx={{
          bgcolor: 'background.paper',
          boxShadow: theme => theme.customShadows.card,
        }}
        className='p-05 br-30 ai-c w-100 jc-sb'
        spacing={1}
        TouchRippleProps={{ sx: { ml: '0!important' } }}
        onClick={clickHandler}
      >
        <Box
          sx={{
            width: 45,
            height: 45,
            p: 0.75,
            bgcolor: 'primary.lighter',
            borderRadius: '50%',
          }}
        >
          <Logo sx={{ width: '100%' }} />
          {/* <img src="/assets/logo/logo-icon.svg" alt='' /> */}
        </Box>
        <Box
          component="input"
          sx={{
            width: 'calc(100% - 100px)',
            height: '45px',
            fontSize: '1em',
            border: 'unset',
            color: 'grey.700',
            bgcolor: 'transparent'
          }}
          placeholder='Search medicine...'
        />

        <Box sx={{ width: 40, height: 40 }} className='d-flex ai-c jc-c'>
          <Iconify icon='mdi:magnify' width={20} height={20} color='grey.500' />
        </Box>
      </ButtonBase>
    </Box>
  );
}
SearchBar.propTypes = {
  path: PropTypes.string,
};
