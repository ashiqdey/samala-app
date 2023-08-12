import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// components
import Iconify from '../components/micro/Iconify';
import ProductImage from '../components/micro/ProductImage';
//
import { productUrl, transfromImage } from '../utils/formatString';
import useCart from '../hooks/useCart';
import useCartPage from '../hooks/useCartPage';
import { fCurrency } from '../utils/formatNumber';
// redux

// -----------------------------------------------

export default function ProductCard({ id, title, sprice, mrp, image, cartQty }) {
  const url = useMemo(() => productUrl(title, id), [title, id]);

  return (
    <Paper elevation={0} className={`product cart of-h p-r`}>
      <Link to={url} className="c-inherit td-n d-flex w-100">
        <Box className="img-card pimg-wrap d-block p-1">
          <Box className="d-block bg-white br-05">
            {/* <ProductImage src={transfromImage(image)} /> */}
            <ProductImage src={image} />
          </Box>
        </Box>

        <Box sx={{ p: 1, pb: 0 }} className="info">
          <Typography variant="font5" className="text-truncate-2 d-block" sx={{ color: 'grey.800', height: '40px' }}>
            {title}
          </Typography>

          <Stack direction="row" className="ai-c jc-sb w-100" sx={{ color: 'grey.500' }}>
            <Stack direction="row" className="ai-c mt-05" spacing={1}>
              {sprice !== mrp && (
                <Typography component="del" variant="subtitle2" color="text.secondary">
                  ₹{mrp}
                </Typography>
              )}
              <Typography variant="font5" color="text.primary">
                ₹{sprice}
              </Typography>

              <Iconify icon="mdi:close" width={16} height={16} sx={{ color: 'var(--grey-500)' }} />
              <Typography variant="font5" color="text.primary">
                {cartQty}
              </Typography>
              <Iconify icon="mdi:equal" width={16} height={16} sx={{ color: 'var(--grey-500)' }} />
            </Stack>

            <Typography variant="h4" color="text.primary" className="ta-r">
              ₹{fCurrency(sprice * cartQty)}
            </Typography>
          </Stack>
        </Box>
      </Link>

      {/* action */}
      <ProductAction id={id} mrp={mrp} sprice={sprice} cartQty={cartQty} />
    </Paper>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  sprice: PropTypes.number,
  mrp: PropTypes.number,
  image: PropTypes.string,
  cartQty: PropTypes.number,
};

function ProductAction({ id, cartQty }) {
  const { toggleLike, liked } = useCart({ id });

  const { changeQty } = useCartPage();

  const incDecQty = (factor = 1) => {
    if (cartQty > 98) {
      return;
    }
    changeQty(id, cartQty + factor);
  };

  return (
    <Stack direction="row" className="ai-c jc-sb px-1 pb-1">
      <Stack direction="row" sx={{ width: '25%', color: 'var(--grey-600)' }}>
        <IconButton color="inherit" aria-label="Delete" onClick={() => changeQty(id, 0)} size="large" edge="start">
          <Iconify icon="mdi-delete" height={18} width={18} />
        </IconButton>

        <IconButton
          color={liked ? 'error' : 'inherit'}
          aria-label="add to favorites"
          onClick={toggleLike}
          size="large"
          edge="end"
        >
          <Iconify icon={`ic:baseline-favorite${liked ? '' : '-border'}`} height={18} width={18} />
        </IconButton>
      </Stack>

      <ButtonGroup variant="outlined" sx={{ color: 'var(--grey-600)' }}>
        <Button onClick={() => incDecQty(-1)} color="inherit" sx={{ p: '5px' }}>
          <Iconify icon={cartQty === 1 ? 'mdi:delete' : 'mdi:minus'} width={20} height={20} />
        </Button>

        <Button color="inherit" disableRipple sx={{ px: '10px', color: 'var(--grey-700)' }}>
          {cartQty}
        </Button>

        <Button onClick={() => incDecQty(1)} color="inherit" sx={{ p: '5px' }}>
          <Iconify icon="mdi:plus" width={20} height={20} />
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
ProductAction.propTypes = {
  id: PropTypes.string,
  cartQty: PropTypes.number,
};
