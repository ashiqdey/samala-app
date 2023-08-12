import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';

const imgPlaceholder = "/assets/samala/svg/image-placeholder.svg";

// -----------------------------------------------

ProductImage.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default function ProductImage({
  src,
  sx,
  // ...other
}) {
  return (
    <Box
      sx={{
        borderRadius: 1.5,
        ...sx
      }}
      className="bg-white"
    >
      <div className='pimg-holder p-r'>
        <img
          src={src || imgPlaceholder}
          className='p-a t-0 r-0 b-0 l-0 m-auto d-b'
          alt='...'
        />
      </div>
    </Box>
  );
}

