/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom"


// @mui
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// components
import Page from '../../components/micro/Page';
import Iconify from '../../components/micro/Iconify';
//
import ProductForm from './components/ProductForm';
import ProductImageForm from './components/ProductImageForm';
import ProductSimilarForm from './components/ProductSimilarForm';
// hooks
import { useSelector } from '../../redux/store';
import useProducts from '../../hooks/useProducts';


// -----------------------------------------------

export default function ProductEditPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { details } = useSelector((state) => state.products);
  const { fetchDetails } = useProducts({ fetchAllProducts: false });

  const [product, setProduct] = useState({});
  const [tab, setTab] = useState(0);

  const handleChange = (_, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (details[productId]) {
      setProduct(details[productId])
    }
    else {
      fetchDetails({ id: productId, full: true })
    }
  }, [details, productId]);



  return (
    <Page title={`Edit | ${product.title}`} color='paper'>
      <Stack direction='row' className='p-s t-0 zi-100 ai-c' sx={{ bgcolor: 'grey.100' }}>
        <IconButton
          onClick={() => navigate(-1)}
          size='large'
          sx={{ height: 48 }}
        >
          <Iconify icon='mdi:arrow-left' />
        </IconButton>

        <Tabs value={tab} onChange={handleChange} sx={{ width: 'calc(100% - 55px)' }}>
          <Tab label="Edit product" id='Products-tab' sx={{ px: 1 }} />
          <Tab label="Images" id='Images-tab' sx={{ px: 1 }} />
          <Tab label="Similar" id='Similar-tab' sx={{ px: 1 }} />
        </Tabs>
      </Stack>

      <Container maxWidth='xl' sx={{ pt: 2 }}>
        {
          tab === 0 && product?.id && <ProductForm data={product} />
        }
        {
          tab === 1 && product?.id && <ProductImageForm data={product} />
        }
        {
          tab === 2 && product?.id && <ProductSimilarForm id={product.id} />
        }
      </Container>
    </Page>
  );
}
