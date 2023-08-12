import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

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
  const { enqueueSnackbar } = useSnackbar();
  const { getToken, login } = useAuth();
  const [loading, setLoading] = useState('token');

  const [phone, setPhone] = useState('');

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

  const phoneLogin = async () => {
    const phoneInitial = ['6', '7', '8', '9'];

    if (phone.length !== 10 || !phoneInitial.includes(phone.charAt(0))) {
      enqueueSnackbar('Invalid phone number', { variant: 'error' });
      return;
    }

    setLoading('phone');
    await login({ phone, name: '', type: 'phone' });
    setLoading(false);
  };

  if (loading === 'token') {
    return null;
  }

  return (
    <Page title="Login">
      <Container maxWidth="xl">
        <SearchBar />
        <CategoryCards />
        <FeaturedProducts />
      </Container>

      <Drawer
        anchor="bottom"
        open
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '20px 20px 0 0',
            bgcolor: 'var(--grey-0)',
            px: 4,
            pt: 2.5,
            pb: 4,
          },
        }}
      >
        <Stack direction="row" className="jc-sb ai-c" spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h5" className="ta-c" gutterBottom>
            Sign in to Samala
          </Typography>
          <Logo disabledLink sx={{ width: 45, height: 45 }} />
        </Stack>

        <Stack className="jc-c" spacing={2}>
          <TextField
            label="Phone number"
            name="phone_number"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value.substring(0, 10))}
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            }}
          />
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            loading={loading === 'phone'}
            onClick={() => phoneLogin()}
          >
            Continue
          </LoadingButton>

          <Box className="ta-c">OR</Box>

          <GoogleLogin />
        </Stack>
      </Drawer>
    </Page>
  );
}
