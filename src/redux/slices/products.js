import { createSlice } from '@reduxjs/toolkit';
// import omit from 'lodash/omit';
// utils
// import axios from '../../utils/axios';
//
// import { dispatch } from '../store';
import { concatArrayId } from '../../utils/arrayOps';

// ----------------------------------------------------------------------



const initialState = {
  isLoading: false,
  products: [],
  suggestions: [],
  featured: [], // array of id
  details: {},
  nextId: [],

  searchedProducts: [],
  searchPage: 1,
  searchTitle: '',
  lastPage: false,
  filters: {},
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },


    // GET SUGGESTIONS
    getSuggestionsSuccess(state, action) {
      state.suggestions = concatArrayId(state.suggestions, action.payload);
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.nextId = action.payload.nextId;
      state.products = action.payload.products;
    },

    // GET PRODUCT, append to front
    getProduct(state, action) {
      const { product } = action.payload;
      // check if exists
      const index = state.products.findIndex(e => e.id === product.id)
      if (index > -1) {
        state.products[index] = { ...state.products[index], ...product };
      }
      else {
        // no need to store in cache if all keys are not found
        if (Object.keys(product).length < 5) {
          return;
        }
        state.products = [product, ...state.products];
      }
    },


    // SET FILTER
    setFilters(state, action) {
      state.filters = action.payload;
    },

    // SET SEARCH TITLE
    setSearchTitle(state, action) {
      state.searchTitle = action.payload;
    },



    getSearchedProducts(state, action) {
      const { page, lastPage, products } = action.payload;
      state.searchPage = products.length === 0 ? 1 : page;
      state.lastPage = lastPage;


      if (page <= 1) {
        state.searchedProducts = products;
      }
      else {
        // list all id
        const ids = state.searchedProducts.map(e => e.id);
        const newState = [...state.searchedProducts];

        products.forEach(e => {
          if (!ids.includes(e.id)) {
            newState.push(e);
          }
        });

        state.searchedProducts = newState;
      }
    },


    getProductsDetails(state, action) {
      const { id } = action.payload;

      // update
      if (id in state.details) {
        const temp = {};

        Object.keys(action.payload).forEach(key => {
          if (key in action.payload && action.payload[key] !== null) {
            temp[key] = action.payload[key]
          }
        });

        state.details[id] = { ...state.details[id], ...temp }
      }
      else if (Object.keys(action.payload).length > 5) {
        state.details[action.payload.id] = action.payload
      }
    },




    // set similars
    saveSimilars(state, action) {
      const { id, similars } = action.payload;

      const ids = similars.map(e => e.id);

      if (state.details[id]) {
        if (state.details[id].similars) {
          state.details[id].similars = [...state.details[id].similars, ...ids];
        }
        else {
          state.details[id].similars = ids;
        }
      }
      else {
        state.details[id] = { similars: ids };
      }

      // append products and sort
      state.products = concatArrayId(state.products, similars, -1);
    },


    // remove similars
    removeSimilar(state, action) {
      const { id, similar } = action.payload;

      if (state.details[id]) {
        state.details[id].similars = state.details[id].similars.filter(e => e !== similar);
      }
    },



    // delete product
    removeProduct(state, action) {
      const id = action.payload;

      delete state.details[id];
      state.products = [...state.products].filter(e => e.id !== id);
      state.searchedProducts = [...state.searchedProducts].filter(e => e.id !== id);

      // remove from suggestion
      state.suggestions = [...state.suggestions].filter(e => e.id !== id);
    },





    // update product details
    // updateProductsDetails(state, action) {
    //   const { id } = action.payload;

    //   const temp = {};

    //   Object.keys(action.payload).forEach(key => {
    //     if (key in action.payload && action.payload[key] !== null) {
    //       temp[key] = action.payload[key]
    //     }
    //   })

    //   state.details[id] = { ...state.details[id], ...temp }
    // },



    getFeaturedSuccess(state, action) {
      const { products, fresh } = action.payload;

      const ids = products.map(e => e.id);
      if (fresh) {
        state.featured = ids;
      }
      else {
        state.featured = [...state.featured, ...ids];
      }

      // append products and sort
      // TODO dont duplicate
      // state.products = [...state.products, ...products].sort((a, b) => a.id - b.id);
      state.products = concatArrayId(state.products, products, -1);

    },



    // delete featured
    deleteFeatured(state, action) {
      const id = action.payload;
      state.featured = [...state.featured].filter(e => e !== id);
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
export const {
  startLoading,
  getSuggestionsSuccess,
  getProductsSuccess,
  getProduct,

  getSearchedProducts,
  getProductsDetails,
  // updateProductsDetails,
  setFilters,
  setSearchTitle,
  removeProduct,

  getFeaturedSuccess,
  deleteFeatured,

  saveSimilars,
  removeSimilar
} = slice.actions;



// ----------------------------------------------------------------------

// export function createColumn(newColumn) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post('/api/kanban/columns/new', newColumn);
//       dispatch(slice.actions.createColumnSuccess(response.data.column));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------

// export function updateColumn(columnId, updateColumn) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post('/api/kanban/columns/update', {
//         columnId,
//         updateColumn,
//       });
//       dispatch(slice.actions.updateColumnSuccess(response.data.column));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------

// export function deleteColumn(columnId) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       await axios.post('/api/kanban/columns/delete', { columnId });
//       dispatch(slice.actions.deleteColumnSuccess({ columnId }));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------

// export function persistColumn(newColumnOrder) {
//   return () => {
//     dispatch(slice.actions.persistColumn(newColumnOrder));
//   };
// }

// ----------------------------------------------------------------------

// export function persistCard(columns) {
//   return () => {
//     dispatch(slice.actions.persistCard(columns));
//   };
// }

// ----------------------------------------------------------------------

// export function addTask({ card, columnId }) {
//   return () => {
//     dispatch(slice.actions.addTask({ card, columnId }));
//   };
// }

// ----------------------------------------------------------------------

// export function deleteTask({ cardId, columnId }) {
//   return (dispatch) => {
//     dispatch(slice.actions.deleteTask({ cardId, columnId }));
//   };
// }


// function concatProducts(oldArr, newArr) {
//   const tempArr = [...oldArr];

//   newArr.forEach(product => {
//     const index = tempArr.findIndex(f => f.id === product.id);
//     if (index < 0) {
//       tempArr.push(product);
//     }
//     else {
//       tempArr[index] = product;
//     }
//   });

//   return tempArr.sort((a, b) => a.id - b.id);
// }
