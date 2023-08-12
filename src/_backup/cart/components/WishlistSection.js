// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
// hooks
import useSettings from '../../../hooks/useSettings';
import useCartPage from '../../../hooks/useCartPage';
//
import Image from '../../../components/micro/Image';
import ProductCard from '../../../widgets/ProductCard';
import GridSwitch from '../../../components/micro/GridSwitch';
// redux
// import { useSelector } from '../../../redux/store';


export default function Cart() {
  const { grid } = useSettings();
  const { wishlists, fetchCart, wishlistNextId, loading } = useCartPage(true);
  // const { cartNextId } = useSelector((state) => state.cart);




  if (wishlists.length === 0) {
    return (<Grid container spacing={2}>
      <Stack className="ai-c jc-c w-100 dark-brightness-07" sx={{ height: 'calc(100vh - 180px)', ml: 2 }}>
        <Image src='/assets/samala/images/wishlist.webp' sx={{ width: 180, }} />
        <Typography variant="font4">
          Your wishlist is empty
        </Typography>
      </Stack>
    </Grid>)
  }

  return (<>
    <Stack
      direction='row'
      className='jc-fe ai-c'
      sx={{ mt: -2 }}
    >
      <GridSwitch />
    </Stack>

    <Grid container spacing={2}>
      {
        wishlists.map(e => <Grid
          key={e.id}
          item
          xs={grid ? 6 : 12}
        // md={grid ? 4 : 12}
        // lg={grid ? 3 : 12}
        >
          <ProductCard {...e} grid={grid} />
        </Grid>)
      }

      <Stack direction='row' className="py-5 jc-c w-100">
        {loading && <CircularProgress />}
        {
          !loading && wishlistNextId !== -1 && <Button onClick={fetchCart} variant='text'>Load more</Button>
        }
      </Stack>
    </Grid>
  </>)
}
