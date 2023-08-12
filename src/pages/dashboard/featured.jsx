import PropTypes from 'prop-types';
import { useCallback } from 'react';

// @mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
// components
import Page from '../../components/micro/Page';
import FeaturedProducts from '../../widgets/FeaturedProducts';
import Iconify from '../../components/micro/Iconify';
// hooks
import useProducts from '../../hooks/useProducts';
import useFeatured from '../../hooks/useFeatured';
import useSearchInput from '../../hooks/useSearchInput';
import { useSelector } from '../../redux/store';



// -----------------------------------------------

export default function ChangeFeatured() {
  const { searchTitle } = useSelector((state) => state.products);
  const { searchSuggestions, onSearchChange } = useProducts({ fetchAllProducts: false });
  const { focused, inputRef, onBlur, onFocus } = useSearchInput({ urlKey: 'urlKey', onSearchChange });

  return (
    <Page title="Change featured">
      <Box className="p-s bg-grey-0 t-0 tr-2 w-100 zi-100"
        sx={{ ...(!focused && { padding: '16px 16px 0 16px' }) }}
      >
        <Stack
          direction='row'
          className='ai-c w-100 jc-sb bg-grey-100'
          spacing={1}
          sx={{ borderRadius: !focused && '8px' }}
        >
          <Box
            ref={inputRef}
            component="input"
            className='p-2 input w-100'
            placeholder='Search products...'
            value={searchTitle}
            onChange={onSearchChange}
            sx={{ height: 44 }}
            onFocus={onFocus}
          />
          {
            focused ? <IconButton size='large' onClick={onBlur}>
              <Iconify icon='mdi:close' width={20} height={20} color='grey.500' />
            </IconButton> : <IconButton size='large'>
              <Iconify icon='mdi:search' width={20} height={20} color='grey.500' />
            </IconButton>
          }
        </Stack>

        {
          focused && <SearchSuggestion
            suggestions={searchSuggestions}
          />
        }
      </Box>

      <Container maxWidth='xl'>
        <FeaturedProducts admin action='featured' />
      </Container>
    </Page>
  );
}






function SearchSuggestion({ suggestions }) {
  const { featured } = useSelector((state) => state.products);
  const { actions, addFeatured, removeFeatured } = useFeatured({ id: null });

  const isAdded = useCallback(
    (id) => featured.includes(id),
    [featured],
  );


  if (suggestions.length === 0) {
    return null;
  }

  return (<Paper
    className='p-a zi-100 w-100 l-0 of-a'
    sx={{
      top: 44,
      height: 'calc(100vh - 44px)',
      borderTop: `1px dashed var(--grey-300)`,
      borderRadius: `0`,
    }}
  >
    {
      suggestions.map(e => <div key={e.id}>
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
                  onClick={() => removeFeatured(e.id)}
                >
                  Remove
                </Button> : <Button
                  onClick={() => addFeatured(e.id)}
                  startIcon={<Iconify icon='mdi:plus' width={20} />}
                >
                  Add
                </Button>}
              </>
            }
          </Box>
        </Stack>
        <Divider className='w-100' />
      </div>)
    }
  </Paper>);
}
SearchSuggestion.propTypes = {
  suggestions: PropTypes.array
};
