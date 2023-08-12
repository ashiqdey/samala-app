import { alpha } from '@mui/material/styles';

// -----------------------------------------------

function createGradient(...colors) {
  return `linear-gradient(to bottom, ${colors.join(',')})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: alpha('#00EBD4', 0.08),
  light: '#66fff0',
  main: '#00EBD4',
  dark: '#00d2bd',
  darker: '#007b6f',
};
const SECONDARY = {
  lighter: alpha('#ffad66', 0.1),
  light: '#ffe0c5',
  main: '#ffad66',
  dark: '#ff973c',
  darker: '#a74e00',
};
const INFO = {
  lighter: alpha('#6f5fff', 0.08),
  light: '#b8b1ff',
  main: '#6f5fff',
  dark: '#4a36ff',
  darker: '#1300bb',
};
const SUCCESS = {
  lighter: alpha('#07f2cb', 0.08),
  light: '#51fade',
  main: '#00e0bb',
  dark: '#06caaa',
  darker: '#05a388',
};
const WARNING = {
  lighter: alpha('#ffc417', 0.1),
  light: '#ffd046',
  main: '#ffc417',
  dark: '#ee9c0b',
  darker: '#c1800c',
};
const ERROR = {
  lighter: alpha('#f73365', 0.08),
  light: '#fa82a0',
  main: '#f73365',
  dark: '#f50c47',
  darker: '#d0083b',
};



const GREY = {
  0: '#f0f2f5',
  100: '#ffffff',
  200: '#eff1f5',
  300: '#dadde7',
  400: '#c4c9d9',
  500: '#a8b0c8',
  600: '#97a2c4',
  700: '#576489',
  800: '#4d5979',
  900: '#39425a',
  500_8: alpha('#a8b0c8', 0.08),
  500_12: alpha('#a8b0c8', 0.12),
  500_16: alpha('#a8b0c8', 0.16),
  500_24: alpha('#a8b0c8', 0.24),
  500_32: alpha('#a8b0c8', 0.32),
  500_48: alpha('#a8b0c8', 0.48),
  500_56: alpha('#a8b0c8', 0.56),
  500_80: alpha('#a8b0c8', 0.8),
};

const GREY_DARK = {
  0: '#20273b',
  100: '#273048',
  200: '#475981',
  300: '#546898',
  400: '#414e6f',
  500: '#4e5e86',
  600: '#7081ac',
  700: '#919ebf',
  800: '#c5cbdd',
  900: '#e5e8f0',
  500_8: alpha('#4e5e86', 0.08),
  500_12: alpha('#4e5e86', 0.12),
  500_16: alpha('#4e5e86', 0.16),
  500_24: alpha('#4e5e86', 0.24),
  500_32: alpha('#4e5e86', 0.32),
  500_48: alpha('#4e5e86', 0.48),
  500_56: alpha('#4e5e86', 0.56),
  500_80: alpha('#4e5e86', 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
  white: createGradient('transparent', 'var(--grey-0)', 'var(--grey-0)'),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: '#fff' },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },

  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    grey: GREY,
    text: { primary: GREY[800], secondary: GREY[500], disabled: GREY[400] },
    background: { paper: GREY[100], default: GREY[0], neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    grey: GREY_DARK,
    text: { primary: GREY_DARK[900], secondary: GREY_DARK[600], disabled: GREY_DARK[500] },
    background: { paper: GREY_DARK[100], default: GREY_DARK[0], neutral: GREY_DARK[200] },
    action: { active: GREY_DARK[600], ...COMMON.action },
  },
};

export default palette;
