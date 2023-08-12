import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui 
import Box from '@mui/material/Box';
//
import AddProductImage from './AddProductImage';
import useProducts from '../../../hooks/useProducts';
// redux
import { useDispatch } from '../../../redux/store';
import { getProductsDetails } from '../../../redux/slices/products';

// -----------------------------------------------

export default function AddProducts({ data }) {
  const dispatch = useDispatch();
  const { updateImages } = useProducts({});
  const [loading, setLoading] = useState(false)

  const onChange = async (type, images, newState) => {
    if (loading) return;

    try {
      // update product details
      dispatch(getProductsDetails({
        id: data.id,
        images: newState
      }));

      setLoading(true);
      const payload = { id: data.id, type, images };
      await updateImages(payload);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }


  return (<Box sx={{ minHeight: '75vh' }}>
    <AddProductImage images={data.images} onChange={onChange} edit />
  </Box>)
}

AddProducts.propTypes = {
  data: PropTypes.object,
};

