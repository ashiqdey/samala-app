// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @mui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
// components
// import SvgIconStyle from '../../components/micro/SvgIconStyle';
import { CATEGORY_DISPLAY } from '../../../configs';
import { PATHS } from '../../../routes/paths';


// -----------------------------------------------


export default function CategoryCards() {
  return (<>
    {/* <Box className='p-1 w-100 ofx-a'>
      <Stack direction='row'
        className='p-1'
        sx={{
          width: `${CATEGORY_DISPLAY.length * 120 - 32}px`,
          overflowX: 'auto'
        }}
      >
        {
          CATEGORY_DISPLAY.map((e, i) => <ButtonBase
            key={e.name}
            to={`${PATHS.app.search}?categories=${e.id}`}
            component={Link}
            sx={{
              bgcolor: 'background.paper',
              width: '100px',
              height: '100px',
              ml: i === 0 ? 0 : 2,
              fontWeight: '400',
              '&:hover': {
                bgcolor: 'background.paper',
              }
            }}
            className='d-flex ai-c jc-c fd-c br-15'
          >
            <Box
              sx={{ width: '50px', height: '50px' }}
              className='d-flex ai-c jc-c fd-c br-1'
            >
              <img
                className='w-100 dark-brightness-09'
                src={`/assets/samala/images/${e.icon}`}
                alt='...'
              />
            </Box>
            <Typography
              variant='h6'
              component='div'
              className='mt-1 ta-c lh-1'
              sx={{ color: 'var(--grey-700)' }}
            >
              {e.name}
            </Typography>
          </ButtonBase>)
        }
      </Stack>
    </Box> */}


    <Grid container spacing={2} className='mt-0'>
      {
        CATEGORY_DISPLAY.map((e) => <Grid key={e.name} item xs={4}>
          <ButtonBase
            to={`${PATHS.app.search}?categories=${e.id}`}
            component={Link}
            sx={{
              bgcolor: 'background.paper',
              // width: '100px',
              height: '100px',
              // ml: i === 0 ? 0 : 2,
              fontWeight: '400',
              '&:hover': {
                bgcolor: 'background.paper',
              }
            }}
            className='d-flex ai-c jc-c fd-c br-15'
          >
            <Box
              sx={{ width: '50px', height: '50px' }}
              className='d-flex ai-c jc-c fd-c br-1'
            >
              <img
                className='w-100 dark-brightness-09'
                src={`/assets/samala/images/${e.icon}`}
                alt='...'
              />
            </Box>
            <Typography
              variant='h6'
              component='div'
              className='mt-1 ta-c lh-1'
              sx={{ color: 'var(--grey-700)' }}
            >
              {e.name}
            </Typography>
          </ButtonBase>
        </Grid>
        )
      }
    </Grid>
  </>);
}


