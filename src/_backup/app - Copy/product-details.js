/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
// components
import Page from '../../components/micro/Page';
import Iconify from '../../components/micro/Iconify';

import ProductImages from './components/ProductImages';
import SimilarProducts from './components/SimilarProducts';
import ProductAction from './components/ProductAction';
//
import { useSelector } from '../../redux/store';
import useProducts from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';


// -----------------------------------------------

export default function ProductDetails({ admin }) {
  const { productId } = useParams();
  const { details } = useSelector((state) => state.products);
  const [product, setProduct] = useState({});

  const { toggleLike, liked } = useCart({ id: product.id });

  const { fetchDetails } = useProducts({ fetchAllProducts: false });


  useEffect(() => {
    if (details[productId]) {
      const _product = details[productId];
      const off = Math.round(((_product.mrp - _product.sprice) / _product.mrp) * 100);
      setProduct({ ..._product, off });
    }
    else {
      fetchDetails({ id: productId })
    }
  }, [details, productId]);


  return (
    <Page title={product?.title || ''}>
      <Container maxWidth='xl' className='product' sx={{ mb: 8, pt: 2 }}>

        <ProductImages images={product.images || [null]} />

        <Box className='p-a t-0 r-0 p-3'>
          <IconButton
            // sx={{ ...iconSx }}
            color={liked ? 'error' : 'inherit'}
            aria-label="add to favorites"
            onClick={toggleLike}
          >
            <Iconify icon={`ic:baseline-favorite${liked ? '' : '-border'}`} />
          </IconButton>
        </Box>

        <Box className='mt-3'>
          <Typography variant='font3'>
            {product.title}
          </Typography>
        </Box>

        <Stack direction='row' className='jc-sb ai-c my-3'>
          <Box>{product.qty}</Box>

          <Stack direction='row' className='ai-c ' spacing={1}>
            {/* <Chip
              label='3.1'
              size='small'
              color='info'
              variant='outlined'
              onDelete={() => null}
              deleteIcon={<Iconify icon='ic:round-star' />}
            /> */}
            <Chip
              label={product.categoryLabel}
              size='small'
              color='success'
              variant='soft'
            />
          </Stack>
        </Stack>


        <Stack direction='row' className='ai-c' spacing={1}>
          <Typography variant="h2" color='text.primary'>
            ₹{product.sprice}
          </Typography>
          {
            product.sprice !== product.mrp && <>
              <Typography component='del' variant="font3" color="text.secondary">
                ₹{product.mrp}
              </Typography>

              <span className='off p-r'>{product.off}% OFF</span>
            </>
          }
        </Stack>


        <Box className='my-4'>
          <Typography variant="button" color="text.secondary">
            Information
          </Typography>
          <br />
          <Typography variant='font5' className='ws-pl'>
            {product.description}
          </Typography>

          <Box className="mt-3">
            <Typography variant="button" color="text.secondary" >
              Disclaimer
            </Typography>
            <br />
            <Typography variant='font6' component="div" sx={{ lineHeight: 1.4, opacity: 0.8 }}>
              The contents of this app/website are for infomational purposes only and are not intended to be a substitute for professional medical advice, Diagnosis, Treatment, or prevention of a dieseae or medical condition.
              PLease consult a physician for the treatment and/or management of any disease or medical condition without delay.
            </Typography>
          </Box>
        </Box>


        <SimilarProducts id={product.id} />

        <ProductAction
          {...product}
          admin={admin}
        />

      </Container>
    </Page>
  );
}
ProductDetails.propTypes = {
  admin: PropTypes.bool,
};