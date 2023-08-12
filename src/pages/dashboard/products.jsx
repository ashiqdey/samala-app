
// @mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

// components
import Page from '../../components/micro/Page';
import Iconify from '../../components/micro/Iconify';
import Products from './components/ProductsSection';
// hooks
import useProducts from '../../hooks/useProducts';
import useSearchInput from '../../hooks/useSearchInput';
import { useSelector } from '../../redux/store';
import ProductSuggetionAdmin from '../../widgets/ProductSuggetionAdmin'

// -----------------------------------------------

export default function AdminProducts() {
  const { searchTitle } = useSelector((state) => state.products);
  const { searchSuggestions, onSearchChange } = useProducts({ fetchAllProducts: false });
  const { focused, inputRef, onBlur, onFocus } = useSearchInput({ urlKey: 'products', onSearchChange });


  return (
    <Page title="Products">
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
          focused && <ProductSuggetionAdmin
            suggestions={searchSuggestions}
          />
        }
      </Box>

      <Container maxWidth='xl' className='mt-2'>
        <Products />
      </Container>
    </Page>
  );
}

