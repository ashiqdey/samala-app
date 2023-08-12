import { createSlice } from '@reduxjs/toolkit';
// import omit from 'lodash/omit';
// utils
// import axios from '../../utils/axios';
//
// import { dispatch } from '../store';
import { config } from '../../configs';


// ----------------------------------------------------------------------



const initialState = {
  hashes: [],
  caches: {},
};

const slice = createSlice({
  name: 'api',
  initialState,
  reducers: {

    // SET FILTER
    setCache(state, action) {
      const { key, value } = action.payload;

      // if dont exisst in hash then include
      if (!state.hashes.includes(key)) {
        // remove if limit exceded
        if (state.hashes.length >= config.MAX_CACHE) {
          const rk = state.hashes[0];
          state.hashes.shift();
          delete state.caches[rk];
        }
        state.hashes.push(key);
      }

      state.caches[key] = value;
    },



    // CLEAR FILTER
    clearCache(state, action) {
      const key = action.payload;
      state.hashes = state.hashes.filter(e => e !== key);
      delete state.caches[key];
    },


  },
});

// Reducer
export default slice.reducer;

// export const {
//   actions,
//   startLoading,
//   getProductsSuccess
// } = slice;

// Actions
export const { setCache, clearCache } = slice.actions;

