import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';

// hooks
import useLocalStorage from '../hooks/useLocalStorage';
import useResponsive from '../hooks/useResponsive';
// utils
import
// getColorPresets,
{
  // colorPresets,
  defaultPreset
}
  from '../utils/getColorPresets';
// config
import { defaultSettings } from '../configs';

// -----------------------------------------------

const initialState = {
  ...defaultSettings,
  onChangeMode: () => { },
  onToggleGrid: () => { },
  onToggleMode: () => { },
  onResetSetting: () => { },
  setColor: defaultPreset,
  colorOption: [],

  // -----collapse menu-----
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => { },
  // add collapse
  onHoverEnter: () => { },
  onHoverLeave: () => { },
  // -----collapse menu-----
};

const SettingsContext = createContext(initialState);

// -----------------------------------------------

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: initialState.themeMode,
    grid: initialState.grid,
  });


  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    });
  };


  const onToggleGrid = () => {
    setSettings({
      ...settings,
      grid: !settings.grid,
    });
  };


  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };


  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      grid: initialState.themeMode,
    });
  };




  // -----collapse menu-----
  const isDesktop = useResponsive('up', 'lg');

  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
  });

  useEffect(() => {
    if (!isDesktop) {
      setCollapse({
        click: false,
        hover: false,
      });
    }
  }, [isDesktop]);

  const handleToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click });
  };

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true });
    }
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };
  // -----collapse menu-----


  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        onToggleGrid,
        onToggleMode,
        // Direction
        // onChangeDirection,
        // Color
        // onChangeColor,
        // setColor: getColorPresets(settings.themeColorPresets),
        // colorOption: colorPresets.map((color) => ({
        //   name: color.name,
        //   value: color.main,
        // })),
        // Stretch
        // onToggleStretch,
        // Navbar Horizontal
        // onChangeLayout,
        // Reset Setting
        onResetSetting,

        // -----collapse menu-----
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
