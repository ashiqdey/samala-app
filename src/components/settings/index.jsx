import { useEffect } from 'react';
// hooks
import { useTheme } from '@mui/material/styles';
import useSettings from '../../hooks/useSettings';

// -----------------------------------------------

export default function SettingMode() {
  const { themeMode } = useSettings();
  const theme = useTheme();

  useEffect(() => {
    window.document.documentElement.setAttribute("theme", themeMode);
    document.querySelector("meta[name=theme-color]").setAttribute("content", theme.palette.background.paper);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeMode])

  return null;
}
