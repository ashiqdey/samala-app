import { useEffect, useState } from 'react';
// @mui
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes

// components
import Page from '../../components/micro/Page';
import Logo from '../../components/micro/Logo';
// sections
import GoogleLogin from './components/GoogleLogin';
// hooks
import useAuth from '../../hooks/useAuth';
import CategoryCards from './components/CategoryCards';
import SearchBar from './components/SearchBar';
import FeaturedProducts from '../../widgets/FeaturedProducts';
// import UploadPrescription from './components/UploadPrescription';


// -----------------------------------------------

export default function Login() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get token based on cookie
    getToken()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        // console.warn(24, err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (loading) {
    return null;
  }




  return (
    <Page title="Login">
      <Container maxWidth='xl'>
        <SearchBar />
        <CategoryCards />
        <FeaturedProducts />
      </Container>

      <Drawer
        anchor='bottom'
        open
        PaperProps={{
          elevation: 0, sx: {
            borderRadius: '20px 20px 0 0',
            bgcolor: 'var(--grey-0)',
            px: 4,
            py: 2.5,
          }
        }}
      >
        <Stack alignItems="center" className='jc-c' sx={{ mb: 3, pt: 2 }}>
          <Logo disabledLink sx={{ width: 50, height: 50, mb: 2 }} />
          <Typography variant="h5" className='ta-c' gutterBottom>
            Sign in to Samala
          </Typography>
        </Stack>


        <Stack sx={{ height: '100px' }} className='jc-c'>
          <GoogleLogin />
        </Stack>
      </Drawer>
    </Page>
  );
}
