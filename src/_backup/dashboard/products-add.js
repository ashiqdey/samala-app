// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components
import Page from '../../components/micro/Page';
import ProductForm from './components/ProductForm';

// -----------------------------------------------

export default function ProductAddPage() {
  return (
    <Page title="Products">
      <Container maxWidth='xl' className='pt-2'>
        <Typography variant='h3' className='mb-2'>Add Product</Typography>
        <ProductForm data={{}} />
      </Container>
    </Page>
  );
}

