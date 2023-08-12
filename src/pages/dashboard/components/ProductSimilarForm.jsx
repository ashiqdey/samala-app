/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
// @mui 
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

// components
import Iconify from '../../../components/micro/Iconify';
import ProductCard from '../../../widgets/ProductCardAdmin';
import NoData from '../../../components/micro/NoData';
// redux
import { useSelector } from '../../../redux/store';
// hooks
import useSimilar from '../../../hooks/useSimilar';
import useProducts from '../../../hooks/useProducts';

// -----------------------------------------------

export default function AddProducts({ id }) {
  const { loading, actions, similars, removeSimilar } = useSimilar({ id, fetch: true });
  const { searchTitle } = useSelector((state) => state.products);
  const { onSearchChange, searchSuggestions } = useProducts({ fetchAllProducts: false });


  const RemoveButton = ({ id }) => {
    if (actions.includes(id)) {
      return <Box sx={{ width: 40 }}>
        <CircularProgress size="20px" />
      </Box>
    }


    return (<Button
      variant='soft'
      color='error'
      onClick={() => removeSimilar(id)}
    >
      Remove
    </Button>);
  }



  return (<>
    <Box sx={{ minHeight: '75vh' }}>
      <Box className='mb-2'>
        <TextField
          id="outlined-basic"
          label="Search for similar products..."
          variant="outlined"
          value={searchTitle}
          onChange={onSearchChange}
          onBlur={() => {
            setTimeout(() => {
              onSearchChange({ target: { value: '' } })
            }, 200)
          }}
          fullWidth
          inputProps={{
            autoComplete: "off"
          }}
        />
        <SearchSuggestion
          productsId={id}
          similarIds={similars.map(e => e.id)}
          suggestions={searchSuggestions}
        />
      </Box>

      {
        !loading && similars.length === 0 && <NoData text="Similar products not found" />
      }

      {
        loading !== 0 && <Stack direction='row' className="my-6 py-6 jc-c">
          <CircularProgress />
        </Stack>
      }


      <Grid container spacing={2}>
        {
          similars.map(e => <Grid
            key={e.id}
            item
            xs={12}
          >
            <ProductCard action="similar" {...e} grid={false}>
              <RemoveButton id={e.id} />
            </ProductCard>
          </Grid>)
        }
      </Grid>
    </Box>
  </>);
}

AddProducts.propTypes = {
  id: PropTypes.string,
};






function SearchSuggestion({ productsId, similarIds, suggestions }) {
  const { actions, addSimilar, removeSimilar } = useSimilar({ id: productsId });

  const list = useMemo(() => suggestions.filter(e => e.id !== productsId), [suggestions])

  const isAdded = useCallback(
    (id) => similarIds.includes(id),
    [similarIds],
  );

  if (suggestions.length === 0) {
    return null;
  }

  return (<Paper>
    {
      list.map((e, i) => <div key={e.id}>
        {i > 0 && <Divider className='w-100' />}
        <Stack direction='row' className='py-1 jc-sb ai-c pr-1'>
          <div
            className='text-truncate-2 font6  pl-2'
            style={{ width: 'calc(100% - 70px)' }}
          >
            {e.title}
          </div>

          <Box sx={{ width: '65px' }} className='ta-c'>
            {
              actions.includes(e.id) ? <CircularProgress size="20px" /> : <>
                {isAdded(e.id) ? <Button
                  color='error'
                  onClick={() => removeSimilar(e.id)}
                >
                  Remove
                </Button> : <Button
                  onClick={() => addSimilar(e.id)}
                  startIcon={<Iconify icon='mdi:plus' width={20} />}
                >
                  Add
                </Button>}
              </>
            }
          </Box>
        </Stack>
      </div>)
    }
  </Paper>);
}
SearchSuggestion.propTypes = {
  suggestions: PropTypes.array,
  productsId: PropTypes.string,
  similarIds: PropTypes.array
};
