import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// components
import ProductImage from '../components/micro/ProductImage';
//
import { PATHS } from '../routes/paths';
import { productUrl, transfromImage } from '../utils/formatString';
import useFeatured from '../hooks/useFeatured';

// -----------------------------------------------

export default function ProductCard({
  id,
  title,
  categoryLabel,
  sprice,
  mrp,
  image,
  grid,
  action = 'wishlist',
  children,
}) {
  const off = useCallback(() => (!mrp ? 0 : Math.round(((mrp - sprice) / mrp) * 100)), [sprice, mrp]);
  const url = useMemo(() => productUrl(title, id, true), [title, id]);

  return (
    <Paper elevation={0} className={`product of-h p-r ${grid ? '' : 'row d-flex'}`}>
      <Off off={off()} />
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
          </Stack>

          {grid && <Price sprice={sprice} mrp={mrp} />}
        </Link>

        {/* action */}
        <Stack direction="row" className="ai-c jc-sb" sx={{ mt: grid ? 0 : 1 }}>
          <div>{grid ? <></> : <Price sprice={sprice} mrp={mrp} />}</div>

          {children || <ProductAction id={id} action={action} />}
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
  children: PropTypes.node,
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

const Price = ({ sprice, mrp }) => (
  <Stack direction="row" className="ai-c mt-05" spacing={1}>
    <Typography variant="h4" color="text.primary">
      ₹{sprice}
    </Typography>
    {sprice !== mrp && (
      <Typography component="del" variant="subtitle2" color="text.secondary">
        ₹{mrp}
      </Typography>
    )}
  </Stack>
);

Price.propTypes = {
  sprice: PropTypes.number,
  mrp: PropTypes.number,
};

function ProductAction({ id, action }) {
  const { removeFeatured } = useFeatured({ id });

  return (
    <Box sx={{ color: 'grey.600' }}>
      {action === 'admin' && (
        <Button component={Link} to={`${PATHS.dashboard.editProducts}/${id}`}>
          Edit
        </Button>
      )}

      {action === 'featured' && (
        <Button color="error" onClick={removeFeatured}>
          Remove
        </Button>
      )}
    </Box>
  );
}
ProductAction.propTypes = {
  id: PropTypes.string,
  action: PropTypes.string,
};
