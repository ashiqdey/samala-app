import { useEffect } from 'react';
/* eslint-disable no-unused-vars */
// @mui
// mui theme
import ThemeProvider from './theme';
// routes
import Router from './routes';
// components
import Settings from './components/settings';
import ScrollToTop from './components/micro/ScrollToTop';
import NotistackProvider from './components/micro/NotistackProvider';
// contexts
import { AuthProvider } from './contexts/AuthContext';
import useCategory from './hooks/useCategory';
import { config } from './configs';

// -----------------------------------------------
export default function App() {
  const { categories } = useCategory();

  useEffect(() => {
    // prevent right click/ long press in non dev env
    if (config.ENV !== 'dev') {
      window.addEventListener('contextmenu', (e) => e.preventDefault());
    }
  }, []);

  return (
    <ThemeProvider>
      <NotistackProvider>
        <AuthProvider>
          <Settings />
          <ScrollToTop />
          <Router />
        </AuthProvider>
      </NotistackProvider>
    </ThemeProvider>
  );
}
