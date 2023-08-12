import { pxToRem, responsiveFontSizes } from '../utils/getFontValue';

// -----------------------------------------------

const FONT_PRIMARY = 'Public Sans, sans-serif'; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

const createFont = (size = 1, props = {}) => {
  const maps = {
    '1': {
      lineHeight: 1.2,
      fontSize: pxToRem(42),
      ...responsiveFontSizes({ sm: 42, md: 48, lg: 54 }),
    },
    '2': {
      lineHeight: 1.2,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 32, md: 36, lg: 40 }),
    },
    '3': {
      lineHeight: 1.2,
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ sm: 22, md: 26, lg: 28 }),
    },
    '4': {
      lineHeight: 1.5,
      fontSize: pxToRem(16),
      ...responsiveFontSizes({ sm: 16, md: 17, lg: 18 }),
    },
    '5': {
      lineHeight: 1.5,
      fontSize: pxToRem(14),
      ...responsiveFontSizes({ sm: 14, md: 16, lg: 16 }),
    },
    '6': {
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      ...responsiveFontSizes({ sm: 12, md: 14, lg: 14 }),
    },
  }

  return maps[size] ? { ...maps[size], ...props } : {}
}

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: createFont(1, { fontWeight: 700, letterSpacing: 2 }),
  h2: createFont(2, { fontWeight: 700 }),
  h3: createFont(3, { fontWeight: 700 }),
  h4: createFont(4, { fontWeight: 700 }),
  h5: createFont(5, { fontWeight: 700 }),
  h6: createFont(6, { fontWeight: 700 }),


  subtitle1: createFont(5, { fontWeight: 600 }),
  subtitle2: createFont(6, { fontWeight: 600 }),


  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body3: {
    lineHeight: 22 / 12,
    fontSize: pxToRem(12)
  },

  font1: createFont(1),
  font2: createFont(2),
  font3: createFont(3),
  font4: createFont(4),
  font5: createFont(5),
  font6: createFont(6),

  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
};

export default typography;
