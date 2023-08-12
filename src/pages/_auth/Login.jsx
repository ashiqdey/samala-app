import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';
// routes

// components
import Page from '../../components/micro/Page';
import Logo from '../../components/micro/Logo';
// sections
import GoogleLogin from './components/GoogleLogin';
// hooks
import useAuth from '../../hooks/useAuth';

// -----------------------------------------------

export default function Login() {
  const theme = useTheme();

  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get token based on cookie
    getToken()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.warn(24, err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Page title="Login">
      <Box
        component="div"
        sx={{
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        }}
      >
        <Container maxWidth="sm">
          <Box
            component="div"
            className="m-auto d-flex fd-c jc-c minh-100vh"
            sx={{
              maxWidth: 480,
              py: 12,
            }}
          >
            <Stack alignItems="center" className="jc-c" sx={{ mb: 5 }}>
              <Logo disabledLink sx={{ width: 100, height: 100, mb: 5 }} />
              <Typography variant="h4" className="ta-c" gutterBottom>
                Sign in to Samala
              </Typography>
            </Stack>

            <Stack sx={{ height: '50vh' }} className="jc-c">
              {/* <LoginForm /> */}
              <GoogleLogin />
            </Stack>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
