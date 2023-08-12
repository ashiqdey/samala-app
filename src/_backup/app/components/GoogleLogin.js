import React, { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
//
import useAuth from '../../../hooks/useAuth';
import { config } from "../../../configs";


let auth2;

// -----------------------------------------------


export default function LoginForm() {
  const [isSubmitting, setSubmitting] = useState(false);

  const { login } = useAuth();



  const setAuth2 = async () => {
    // https://stackoverflow.com/questions/72623110/google-oauth2-results-in-pop-up-closed-by-user
    auth2 = await loadAuth2(gapi, config.GOOGLE_CLIENT_ID, '');

    if (auth2.isSignedIn.get()) {
      updateUser(auth2.currentUser.get())
    } else {
      attachSignin(document.getElementById('google-login'), auth2);
    }
  }


  useEffect(() => {
    setAuth2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const updateUser = async (currentUser) => {
    const email = currentUser.getBasicProfile().getEmail();
    const name = currentUser.getBasicProfile().getName();
    const image = currentUser.getBasicProfile().getImageUrl();


    if (email) {
      setSubmitting(true);

      // got the email now logout
      // auth2.signOut().then(() => {
      //   console.log('google signed out.');
      // });

      signOut();


      await login({ email, name, image });
      setSubmitting(false);
    }
  };


  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(element, {},
      (googleUser) => {
        updateUser(googleUser);
      }, (error) => {
        console.warn(JSON.stringify(error))
      });
  };

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('78 User signed out.');
    });
  }



  // const logintemp = async () => {
  //   setSubmitting(true);
  //   await login({ email: 'e', name: 'sd', image: 'url' });
  //   setSubmitting(false);
  // };


  return (
    <LoadingButton
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      color='inherit'
      id="google-login"
      // onClick={logintemp}
      loading={isSubmitting}
      startIcon={
        <img alt='google' src="/assets/samala/svg/google.svg" style={{ width: 20, height: 20 }} />
      }
      sx={{
        bgcolor: (theme) => theme.palette.grey[100],
        color: (theme) => theme.palette.grey[700],
      }}
    >
      Sign in with Google
    </LoadingButton>
  );
}
