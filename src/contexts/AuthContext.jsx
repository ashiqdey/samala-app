import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from 'notistack';
import { dispatch } from '../redux/store';
// import { gapi, loadAuth2 } from 'gapi-script';

// hook
// import useLocalStorage from '../hooks/useLocalStorage';
import useApi from '../hooks/useApi';
import { config } from '../configs';
//
// import { config } from '../configs';
// import urls from '../configs/urls';
import { getCartIds } from '../redux/slices/cart';
// import { PATHS } from '../routes/paths';

// -----------------------------------------------

const DEFAULT_USER = {
  id: null,
  access: 0,
  dp: '',
  email: '',
  phone: '',
  name: '',
  status: '',
  token: null,
};

const DEFAULT_CONFIG = {
  image_root: `${config.BASEURL}/images/products`,
  image_cdn: 'https://ik.imagekit.io/samala',
};

const initialState = {
  user: null,
};

const AuthContext = createContext({
  ...initialState,
  setUser: () => {},
  login: () => {},
  getToken: () => {},
  logout: () => {},
  resetAuth: () => {},
});

// -----------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();
  const { get, post } = useApi();

  // const [state, dispatch] = useReducer(reducer, initialState);

  const [user, setUser] = useState(null);
  const [config, setConfig] = useState({ ...DEFAULT_CONFIG });

  useEffect(() => {
    if (user && user.id) {
      // fetch cartids
      fetchCartId();
    } else {
      // console.log("Logged out", user);
      // TODO clear API cache after logout
      // or dont store user related cache in universal cache
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchCartId = () => {
    get({ key: 'cart', cache: false, token: user.token, data: { get_ids: 1 } }).then((res) => {
      if (res.error) return;

      dispatch(getCartIds(res));
    });
  };

  const setUserData = (res) => {
    if (res.configs) {
      const tempConfig = {
        ...DEFAULT_CONFIG,
        ...res?.configs,
      };
      setConfig(tempConfig);
    }

    delete res.configs;
    setUser({ ...DEFAULT_USER, ...res });
  };

  const login = async ({ email, phone, name = '', password = '', image = '', type = 'google' }) =>
    post({
      key: 'authenticate',
      data: { email, phone, name, password, image, type },
      withCredentials: true,
    }).then((res) => {
      if (res.error) {
        // console.log('94 err');
        // enqueueSnackbar(res.message, { variant: 'error' });
        return;
      }

      setUserData(res);
    });

  // get token
  const getToken = () =>
    get({ key: 'getToken', cache: false, withCredentials: true }).then((res) => {
      if (res.error) return;

      setUserData(res);
    });
  // .catch(err => {
  //   console.error('authContext/143', err);
  // });

  const logout = async () => {
    // ALREADY SIGNDEOUT AFTER LOGIN
    // try {
    //   const auth2 = await loadAuth2(gapi, config.GOOGLE_CLIENT_ID, '')
    //   await auth2.signOut();
    //   console.log('google signed out.');
    // }
    // catch (err) {
    //   console.log('ERROR 27', err);
    // }

    // remove all redux

    get({ key: 'logout', cache: false, withCredentials: true })
      // fetchResponse(urls.logout, 'GET', {}, {}, true)
      .then((res) => {
        if (res.error) return;

        setUser(null);
        navigate('/');
        setTimeout(() => window.location.reload(false), 200);
      });
    // .catch(err => {
    //   console.error('authContext/155', err);
    // });
  };

  const resetAuth = () => {
    setUser(null);

    // clear only compulsory keys
    // localStorage.clear();
    // window.localStorage.removeItem("auth");
  };

  /*
    const login = async () => {
      await auth0Client.loginWithPopup();
      const isAuthenticated = await auth0Client.isAuthenticated();
   
      if (isAuthenticated) {
        const user = await auth0Client.getUser();
        dispatch({ type: 'LOGIN', payload: { user } });
      }
    };
   
    const logout = () => {
      auth0Client.logout();
      dispatch({ type: 'LOGOUT' });
    };
  */

  return (
    <AuthContext.Provider
      value={{
        // ...state,
        user,
        setUser,
        login,
        getToken,
        logout,
        resetAuth,

        config,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
