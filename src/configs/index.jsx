// routes
// import { PATHS } from '../routes/paths';

export const config = {
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  SECRET: import.meta.env.VITE_SECRET || '',
  BASEURL: import.meta.env.VITE_BASEURL || '',
  DOMAIN: import.meta.env.VITE_DOMAIN || '',

  ENV: import.meta.env.VITE_NODE_ENV || 'production',
  VERSION: import.meta.env.VITE_VERSION,

  MAX_CACHE: 10, // PRODUCTION max api cache in memory
  // BATCH_SIZE: 100, // batch size while importing excel
  // ROW_SIZE: 100, // row size in tracking page

  call: '9800228600',
  whatsapp: '7679784200',

  MIN_ORDER_VALUE: 100,
};

// -----------------------------------------------

// SETTINGS
// Please remove `localStorage` when you set settings.
// -----------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  grid: true,
};

// CATEGORIES
// -----------------------------------------------

export const CATEGORIES = {
  1: 'Other',
  18: 'Essentials',
  17: 'Medicine',
  15: 'Tablets',
  16: 'Syrup',
  14: 'Healthcare',
  2: 'Hygine',
  3: 'Personal Care',
  4: 'Skin care',
  5: 'Home care',
  6: 'Ayurvedic',
  7: 'Sexual wellness',
  8: 'Fitness',
  9: 'Baby Care',
  10: 'Mother Care',
  11: 'Diabetic Care',
  12: 'Elderly Care',
  13: 'Accessories',
};

export const CATEGORY_DISPLAY = [
  {
    name: 'Medicines',
    id: '17',
    icon: 'medicines.webp',
    modal: 'medicine',
    badge: 3,
  },
  {
    name: 'Health care',
    id: '14',
    icon: 'health.webp',
  },
  {
    name: 'Hygine',
    id: '2',
    icon: 'hygine.webp',
  },
  {
    name: 'Personal care',
    id: '3',
    icon: 'personal.webp',
  },
  {
    name: 'Baby Care',
    id: '9',
    icon: 'baby.webp',
  },
  {
    name: 'Skin care',
    id: '4',
    icon: 'face.webp',
  },
  {
    name: 'Ayurvedic',
    id: '6',
    icon: 'ayurvedic.webp',
  },
  {
    name: 'Fitness',
    id: '8',
    icon: 'water-bottle.webp',
  },
  {
    name: (
      <>
        Home
        <br /> Essentials
      </>
    ),
    id: '18',
    icon: 'box.webp',
  },
];

export const MEDICINE_CATEGORY = [
  {
    name: 'Medicine',
    id: '17',
    icon: 'medicine.webp',
  },
  {
    name: 'Tablets',
    id: '15',
    icon: 'tablets.webp',
  },
  {
    name: 'Syrup',
    id: '16',
    icon: 'syrup.webp',
  },
];

// ORDER
// -----------------------------------------------
export const ORDER_STATUS = {
  1: 'New',
  2: 'Acepted',
  3: 'On delivery',
  8: 'Cancelled',
  9: 'Delivered',
};
