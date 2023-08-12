import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// components
import GridSwitch from '../components/micro/GridSwitch';
import ProductCard from './ProductCard';
import ProductCardAdmin from './ProductCardAdmin';
// hooks
import useSettings from '../hooks/useSettings';
import useCategory from '../hooks/useCategory';
import useProducts from '../hooks/useProducts';
import useApi from '../hooks/useApi';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getFeaturedSuccess } from '../redux/slices/products';
// utils
import urls from '../configs/urls';


// -----------------------------------------------


export default function FeaturedProducts({ admin, action }) {
  const { grid } = useSettings();
  const { get } = useApi();

  const { categories } = useCategory();
  const dispatch = useDispatch();
  const { transfromProducts } = useProducts({ fetchAllProducts: false });

  const { products, featured } = useSelector((state) => state.products);
  const [featuredProducts, setFeatured] = useState([])


  const fetchfeatured = async () => {
    if (Object.keys(categories).length === 0) {
      return;
    }

    if (featured.length === 0) {
      try {
        const response = await get({ url: urls.featured });

        dispatch(getFeaturedSuccess({
          products: transfromProducts(response.products),
          fresh: true
        }));
      } catch (error) {
        console.warn("h/up/61", error);
        // dispatch(slice.actions.hasError(error));
      }
    }
  }


  useEffect(() => {
    fetchfeatured();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);


  useEffect(() => {
    if (featured.length > 0) {
      const temp = products.filter(e => featured.includes(e.id));
      setFeatured(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featured]);


  return (
    <>
      <Stack direction='row' className='jc-sb ai-c py-2'>
        <Typography variant='h3'>Most popular</Typography>
        <GridSwitch />
      </Stack>

      <Grid container spacing={2}>
        {
          featuredProducts.map(e => <Grid
            key={e.id}
            item
            xs={grid ? 6 : 12}
          >
            {admin ? <ProductCardAdmin
              {...e}
              grid={grid}
              action={action}
            /> : <ProductCard
              {...e}
              grid={grid}
            />}

          </Grid>)
        }
      </Grid>
    </>
  );
}

FeaturedProducts.propTypes = {
  admin: PropTypes.bool,
  action: PropTypes.string
}; 
