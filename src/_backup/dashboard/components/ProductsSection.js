
// import { useCallback, useState, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
// components
import GridSwitch from '../../../components/micro/GridSwitch';
import ProductCardAdmin from '../../../widgets/ProductCardAdmin';
// import products from '../../../_mock/products';
// hooks
import useSettings from '../../../hooks/useSettings';
import useProducts from '../../../hooks/useProducts';
// redux
// import { useDispatch } from '../../../redux/store';


export default function DashboardProducts() {
  // const dispatch = useDispatch();
  const { grid } = useSettings();

  const { products } = useProducts({ fetchAllProducts: true });

  // useEffect(() => {
  //   if (products.length === 0) {
  //     dispatch(getProducts());
  //   }
  // }, [dispatch]);


  return (<>
    <Stack
      direction='row'
      className='jc-fe'
      sx={{ mt: -2, }}
    >
      <GridSwitch />
    </Stack>

    <Grid container spacing={2}>
      {
        products.map(e => <Grid
          key={e.id}
          item
          xs={grid ? 6 : 12}
        >
          <ProductCardAdmin action="admin" {...e} grid={grid} />
        </Grid>)
      }
    </Grid>
  </>)
}
