// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// components
import Page from '../../components/micro/Page';
import SmallCard from './components/SmallCard';
import FeaturedProducts from '../../widgets/FeaturedProducts';
import SearchBar from '../app/components/SearchBar';
//
import { PATHS } from '../../routes/paths';
// import { fNumber } from '../../utils/formatNumber';

// -----------------------------------------------

export default function AdminDashboardPage() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <SearchBar path={PATHS.dashboard.search} />

        <Grid container spacing={2} className="mt-2">
          {/* <Grid item xs={12}>
            <SmallCard
              title='ANALYTICS'
              color='info'
              icon='icons/duo-medicine.svg'
              to={PATHS.dashboard.products}
            >
              <Stack direction='row' className='jc-sb mt-1'>
                <Typography variant='font5'>Products</Typography>
                <Typography variant='h4'>{fNumber(134)}</Typography>
              </Stack>
            </SmallCard>
          </Grid>

          <Grid item xs={12}>
            <SmallCard
              title='ORDERS'
              color='secondary'
              icon='icons/duo-cart.svg'
              to={PATHS.dashboard.orders}

            >
              <Stack direction='row' className='jc-sb mt-05'>
                <Typography variant='font5'>Un-fulfilled</Typography>
                <Typography variant='h4'>{fNumber(134)}</Typography>
              </Stack>
              <Stack direction='row' className='jc-sb'>
                <Typography variant='font5'>Fulfilled</Typography>
                <Typography variant='h4'>{fNumber(1534)}</Typography>
              </Stack>
            </SmallCard>
          </Grid> */}

          <Grid item xs={12}>
            <SmallCard title="QUICK LINK" color="primary" icon="logo/logo-icon.svg" to="/">
              <Box className="mt-05">
                <Typography variant="font5">Go back to app</Typography>
                <br />
                <Chip
                  size="small"
                  // variant='soft'
                  color="primary"
                  label="Open app"
                />
              </Box>
            </SmallCard>
          </Grid>
        </Grid>

        <FeaturedProducts admin />
        <Button component={Link} to={PATHS.dashboard.featured} className="w-100 mt-2" variant="soft">
          Change featured products
        </Button>
      </Container>
    </Page>
  );
}
