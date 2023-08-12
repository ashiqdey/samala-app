import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
// @mui
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// components
import Iconify from '../components/micro/Iconify';
import ProductImage from '../components/micro/ProductImage';
//
import { PATHS } from '../routes/paths';
import { productUrl, transfromImage } from '../utils/formatString';
import useCart from '../hooks/useCart';

// -----------------------------------------------

export default function ProductCard({
  id,
  title,
  categoryLabel,
  sprice,
  mrp,
  image,
  grid,
  stock,
  action = 'wishlist',
}) {
  const off = useCallback(() => (!mrp ? 0 : Math.round(((mrp - sprice) / mrp) * 100)), [sprice, mrp]);
  const url = useMemo(() => productUrl(title, id), [title, id]);

  return (
    <Paper elevation={0} className={`product of-h p-r ${grid ? '' : 'row d-flex'}`}>
      {stock && <Off off={off()} />}

      <Wishlist id={id} grid={grid} />

      {!stock && (
        <Chip
          label="Out of stock"
          size="small"
          color="error"
          variant="outlined"
          className="p-a zi-3 r-0 mr-1 out-of-stock"
        />
      )}

      <Link to={url} className="img-card pimg-wrap d-block bg-white">
        {/* <ProductImage src={transfromImage(image)} /> */}
        <ProductImage src={image} />
      </Link>

      <Box sx={{ p: 1, pb: 1, pl: grid ? 1 : 1.5 }} className="info">
        <Link to={url} className="c-inherit td-n d-block" style={{ height: '90px' }}>
          <Typography variant="font5" className="text-truncate-2" sx={{ color: 'grey.800' }}>
            {title}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: grid ? 0 : 0.5 }}>
            <Chip label={categoryLabel || '--'} size="small" color="success" variant="soft" />

            {/* {
              !grid && <Rating rating={rating} />
            } */}
          </Stack>

          {/* price */}
          {grid && <Price sprice={sprice} mrp={mrp} stock={stock} />}
        </Link>

        {/* action */}
        <Stack direction="row" className="ai-c jc-sb" sx={{ mt: grid ? 0 : 1 }}>
          <div>{!grid && <Price sprice={sprice} mrp={mrp} stock={stock} />}</div>

          <ProductAction
            id={id}
            title={title}
            categoryLabel={categoryLabel}
            mrp={mrp}
            sprice={sprice}
            url={url}
            action={action}
            stock={stock}
          />
        </Stack>
      </Box>
    </Paper>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  sprice: PropTypes.number,
  mrp: PropTypes.number,
  image: PropTypes.string,
  grid: PropTypes.bool,
  categoryLabel: PropTypes.string,
  action: PropTypes.string,
};

const Off = ({ off }) => {
  if (off <= 0) {
    return null;
  }

  return <span className="off p-a t-0 l-0 zi-3 mt-2">{off}% OFF</span>;
};
Off.propTypes = {
  off: PropTypes.number,
};

// const Rating = () => null

// return <Chip
//   label={rating}
//   size='small'
//   color='info'
//   variant='outlined'
//   onDelete={() => null}
//   deleteIcon={<Iconify icon='ic:round-star' />}
// />

// Rating.propTypes = {
//   rating: PropTypes.string,
// };

const Price = ({ sprice, mrp, stock }) => (
  <Stack direction="row" className="ai-c mt-05" spacing={1}>
    <Typography variant="h5" color="text.primary">
      ₹{stock ? sprice : mrp}
    </Typography>
    {stock && sprice !== mrp && (
      <Typography component="del" variant="subtitle2" color="text.secondary">
        ₹{mrp}
      </Typography>
    )}
  </Stack>
);

Price.propTypes = {
  sprice: PropTypes.number,
  mrp: PropTypes.number,
  stock: PropTypes.bool,
};

function ProductAction({ id, title, sprice, mrp, categoryLabel, url, action, stock }) {
  const { toggleLike, liked } = useCart({
    id,
    title,
    categoryLabel,
    mrp,
    sprice,
    url,
  });

  if (action === 'cart') {
    return (
      <Box sx={{ color: 'grey.500' }}>
        <IconButton color={liked ? 'error' : 'inherit'} aria-label="add to favorites" onClick={toggleLike} size="large">
          <Iconify icon={`ic:baseline-favorite${liked ? '' : '-border'}`} height={22} width={22} />
        </IconButton>

        {/* <IconButton
        color='inherit'
        aria-label="share"
        size='large'
      // onClick={shareProduct}
      >
        <Iconify icon='mdi:delete' height={22} width={22} />
      </IconButton> */}
      </Box>
    );
  }

  return (
    <Box sx={{ color: 'grey.600' }}>
      {/* {
      action === 'wishlist' && <IconButton
        color={liked ? 'error' : 'inherit'}
        aria-label="add to favorites"
        onClick={toggleLike}
        size='large'
      >
        <Iconify
          icon={`ic:baseline-favorite${liked ? '' : '-border'}`}
          height={18}
          width={18}
        />
      </IconButton>
    } */}

      {/* {
      action !== 'similar' && <IconButton
        color='inherit'
        aria-label="share"
        size='large'
        onClick={shareProduct}
      >
        <Iconify icon='ic:baseline-share' height={18} width={18} />
      </IconButton>
    } */}

      {/* {
      action === 'admin' && <Button
        component={Link}
        to={`${PATHS.dashboard.editProducts}/${id}`}
      >Edit</Button>
    }
    {
      action === 'similar' && <Button
        variant='soft'
        color='error'
      >Remove</Button>
    } */}
    </Box>
  );
}
ProductAction.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  sprice: PropTypes.number,
  mrp: PropTypes.number,
  categoryLabel: PropTypes.string,
  url: PropTypes.string,
  action: PropTypes.string,
  stock: PropTypes.bool,
};

function Wishlist({ id, grid }) {
  const { toggleLike, liked } = useCart({ id });

  return (
    <Box
      className="p-a r-0 zi-1"
      sx={{
        color: 'grey.600',
        top: grid ? 0 : 'unset',
        bottom: grid ? 'unset' : 0,
      }}
    >
      <IconButton color={liked ? 'error' : 'inherit'} aria-label="add to favorites" onClick={toggleLike} size="large">
        <Iconify icon={`ic:baseline-favorite${liked ? '' : '-border'}`} height={18} width={18} />
      </IconButton>
    </Box>
  );
}
Wishlist.propTypes = {
  id: PropTypes.string,
  grid: PropTypes.bool,
};
