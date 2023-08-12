import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// components
import GridSwitch from '../../../components/micro/GridSwitch';
import ProductCard from '../../../widgets/ProductCard';
// hooks
import useSettings from '../../../hooks/useSettings';
import useOffSetTop from '../../../hooks/useOffSetTop';
import useSimilar from '../../../hooks/useSimilar';


// -----------------------------------------------



export default function SimilarProducts({ id }) {
  const isOffset = useOffSetTop(100);
  const { grid } = useSettings();
  const { loading, setLoading, similars, fetchSimilar } = useSimilar({ id, fetch: false });


  useEffect(() => {
    if (isOffset && loading === 1) {
      fetchSimilar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOffset, loading]);

  useEffect(() => {
    setTimeout(() => { setLoading(1) }, 800)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (loading !== 0) {
    return (<Stack direction='row' className="py-5 jc-c">
      <CircularProgress />
    </Stack>)
  }

  if (similars.length === 0) {
    return null;
  }

  return (
    <>
      <Stack
        direction='row'
        className='jc-sb ai-c py-2'
      >
        <Typography variant='h3'>You might like</Typography>
        <GridSwitch />
      </Stack>
      <Grid container spacing={2}>
        {/* TODO show emplty state */}
        {
          similars.map(e => <Grid
            key={e.id}
            item
            xs={grid ? 6 : 12}
          // md={grid ? 4 : 12}
          // lg={grid ? 3 : 12}
          >
            <ProductCard {...e} grid={grid} />
          </Grid>)
        }
      </Grid>
    </>
  );
}
SimilarProducts.propTypes = {
  id: PropTypes.string,
};