import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// components
import Iconify from '../components/micro/Iconify';
import ProductImage from '../components/micro/ProductImage';
//
import { productUrl, transfromImage } from '../utils/formatString';
import { fCurrency } from '../utils/formatNumber';
// redux

// -----------------------------------------------

export default function OrderProductCard({ id, title, bprice, bqty, image, qty, admin }) {
  const url = useMemo(() => productUrl(title, id, admin), [title, id, admin]);

  return (
    <Paper elevation={0} className={`product cart of-h p-r`}>
      <Link to={url} className="c-inherit td-n d-flex w-100">
        <Box className="img-card pimg-wrap d-block bg-white">
          {/* <ProductImage src={transfromImage(image)} /> */}
          <ProductImage src={image} />
        </Box>

        <Box sx={{ px: 2, py: 1, pb: 0 }} className="info">
          <Typography variant="font6" className="text-truncate-2 d-block" sx={{ height: '38px' }}>
            {title} &bull; {qty}
          </Typography>

          <Stack direction="row" className="ai-c jc-sb w-100 mt-1" sx={{ color: 'grey.500' }}>
            <Stack direction="row" className="ai-c" spacing={1}>
              <Typography variant="font5" color="text.secondary">
                ₹{bprice}
              </Typography>
              <Iconify icon="mdi:close" width={16} height={16} sx={{ color: 'var(--grey-500)' }} />
              <Typography variant="font5" color="text.secondary">
                {bqty}
              </Typography>
            </Stack>

            <Typography variant="h4" color="text.primary" className="ta-r">
              ₹{fCurrency(bprice * bqty)}
            </Typography>
          </Stack>
        </Box>
      </Link>
    </Paper>
  );
}

OrderProductCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  bprice: PropTypes.number,
  bqty: PropTypes.number,
  image: PropTypes.string,
  qty: PropTypes.string,
  admin: PropTypes.bool,
};
