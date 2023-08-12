import PropTypes from 'prop-types';
// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// components
import Iconify from '../../../components/micro/Iconify';
import { PATHS } from '../../../routes/paths';
import useCart from '../../../hooks/useCart';

// -----------------------------------------------

export default function ProductAction({ id, title, sprice, mrp, categoryLabel, url, stock, admin }) {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { inCart, toggleCart, shareProduct, isAdding } = useCart({ id, title, sprice, mrp, categoryLabel, url });
  // const { user } = useAuth();
  // const admin = user.access > 1;

  const iconSx = {
    bgcolor: palette.grey[100],
    height: 45,
    width: 45,
    '&:hover': { bgcolor: palette.grey[100] },
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Stack
        direction="row"
        className="jc-sb ai-c py-2 p-f zi-100 b-0 l-0 w-100 px-2 product-action"
        spacing={2}
        sx={{
          backgroundImage: palette.gradients.white,
          color: palette.grey[600],
        }}
      >
        <Box className="w-50 d-flex">
          <Stack direction="row" spacing={1}>
            {/* <IconButton
              sx={{ ...iconSx }}
              color='inherit'
              onClick={onBack}
            >
              <Iconify icon='mdi:arrow-left' />
            </IconButton> */}

            {!admin && (
              <IconButton sx={{ ...iconSx }} color="inherit" component={Link} to={PATHS.app.root}>
                <Iconify icon="mdi:home-outline" />
              </IconButton>
            )}

            {id && (
              <IconButton color="inherit" sx={{ ...iconSx }} onClick={shareProduct}>
                <Iconify icon="ic:baseline-share" />
              </IconButton>
            )}
          </Stack>
        </Box>

        {admin && (
          <Button
            // onClick={toggleCart}
            size="large"
            variant="contained"
            component={Link}
            to={`${PATHS.dashboard.editProducts}/${id}`}
            // className={inCart ? 'w-33' : 'w-50'}
            // color={inCart ? 'secondary' : 'primary'}
          >
            Edit product
          </Button>
        )}

        {!admin && id && (
          <>
            {inCart && (
              <IconButton
                sx={{
                  width: 45,
                  height: 45,
                  bgcolor: isAdding ? palette.primary.lighter : palette.primary.main,
                  color: '#fff',
                }}
                color="inherit"
                component={Link}
                to={!isAdding && PATHS.app.cart}
              >
                {isAdding ? (
                  <Box className="d-flex ai-c jc-c">
                    <CircularProgress size={25} />
                  </Box>
                ) : (
                  <Iconify icon="ic:outline-shopping-cart" />
                )}
              </IconButton>
            )}

            <Button
              onClick={toggleCart}
              size="large"
              variant="contained"
              className={inCart ? 'w-33' : 'w-50'}
              color={inCart ? 'secondary' : 'primary'}
              disabled={!stock}
            >
              {stock ? <>{inCart ? 'Remove' : 'Add to cart'}</> : 'Out of stock'}
            </Button>
          </>
        )}
      </Stack>
    </>
  );
}

ProductAction.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  sprice: PropTypes.number,
  mrp: PropTypes.number,
  categoryLabel: PropTypes.string,
  url: PropTypes.string,
  stock: PropTypes.bool,
  admin: PropTypes.bool,
};
