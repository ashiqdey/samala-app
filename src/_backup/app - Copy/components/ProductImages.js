import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';

// components
import ProductImage from '../../../components/micro/ProductImage';

// -----------------------------------------------



export default function Images({ images }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0)
  }, [images]);


  return (<Box>
    <ProductImage src={images.length >= active ? images[active] : null} />
    {
      images.length > 1 && <Stack direction='row' spacing={2} className='mt-2'>
        {
          images.map((image, index) => <ButtonBase
            key={index}
            sx={{ width: images.length > 3 ? '25%' : '33.33%' }}
            onClick={() => setActive(index)}
            className='d-block br-15'
          >
            <ProductImage src={image} />
          </ButtonBase>)
        }
      </Stack>
    }
  </Box>)
}
Images.propTypes = {
  images: PropTypes.array
};