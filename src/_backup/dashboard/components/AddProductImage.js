import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
// components
import Image from '../../../components/micro/Image';
// import ProductImage from '../../../components/micro/ProductImage';
import Iconify from '../../../components/micro/Iconify';
import SvgIconStyle from '../../../components/micro/SvgIconStyle';
import UploadImage from '../../../dialogs/UploadImage';
import ReorderImages from '../../../dialogs/ReorderImages';
// import { transfromImage } from '../../../utils/formatString';
// import useTransform from '../../../hooks/useTransform';


// -----------------------------------------------



export default function AddProductImage({ images, onChange, edit }) {
  // const { transfromImage } = useTransform();
  const [uploadDialog, setUploadDialog] = useState(null);
  const [reorderImages, setReorderImages] = useState(null);


  const onImageUpload = (image) => {
    const tempImages = [...images, image];

    if (edit) {
      onChange('add', [image], tempImages);
    }
    else {
      onChange(tempImages);
    }
  }

  const onDelete = (image) => {
    const tempImages = [...images].filter(e => e !== image);
    if (edit) {
      onChange('delete', [image], tempImages);
    }
    else {
      onChange(tempImages);
    }
  }

  const onReorderDone = (v) => {
    const tempImages = v.map(e => e.image)

    if (edit) {
      onChange('reorder', tempImages, tempImages);
    }
    else {
      onChange(tempImages);
    }

    setReorderImages(false)
  }



  return (<Box>
    <Grid container spacing={2} className='product'>
      {
        images.map(image => <Grid
          key={image}
          item
          xs={6}
        >
          <Box className="w-100 p-r">
            <ButtonBase className='pimg-wrap pimg-holder p-r w-100 bg-white br-15' onClick={() => setReorderImages(true)}>
              <Image
                // src={transfromImage(image)}
                src={image}
                className='p-a t-0 r-0 b-0 l-0 m-auto d-b'
              />
            </ButtonBase>

            <IconButton
              aria-label="change layout"
              onClick={() => onDelete(image)}
              sx={{ color: 'grey.400' }}
              size='large'
              className='p-a t-0 r-0'
            >
              <Iconify icon='mdi:delete' />
            </IconButton>
          </Box>
        </Grid>)
      }

      {
        images.length < 5 && <Grid
          item
          xs={images.length === 0 ? 12 : 6}
        >
          <ButtonBase
            className="br-15 w-100 d-block" sx={{
              color: 'primary.main',
              border: '2px dashed var(--primary-main)'
            }}
            onClick={() => setUploadDialog(true)}
          >
            <div className='pimg-holder p-r d-flex ai-c jc-c ta-c'>
              <div className='p-a w-100 t-50 l-50 tt--50'>
                <SvgIconStyle
                  sx={{ width: 70, height: 70 }}
                  src='/assets/samala/icons/duo-image.svg'
                />
                <Typography color='text.primary'>Add image</Typography>
              </div>
            </div>
          </ButtonBase>
        </Grid>
      }
    </Grid>


    <UploadImage
      open={uploadDialog}
      onClose={() => setUploadDialog(false)}
      onUpload={onImageUpload}
      type='product'
    />
    <ReorderImages
      images={images}
      open={reorderImages}
      onClose={() => setReorderImages(false)}
      onDone={onReorderDone}
    />
  </Box>)
}
AddProductImage.propTypes = {
  images: PropTypes.array,
  onChange: PropTypes.func,
  edit: PropTypes.bool
};