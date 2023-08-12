import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// @mui
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
//
import Dropzone from '../components/vendor/Dropzone';
import ProductImage from '../components/micro/ProductImage';
import Iconify from '../components/micro/Iconify';

// hooks
import urls from '../configs/urls';
import axios from '../utils/axios';

// -----------------------------------------------

const UploadImage = ({ open, onClose, onUpload, type = 'product' }) => {
  const [file, setFile] = useState(null);
  const [croppingImage, setCroppingImage] = useState(null);

  const [cropped, setCropped] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFile(null);
    setCropped(null);
    setLoading(false);
  }, [open]);

  const onCancel = () => {
    setFile(null);
    onClose();
  };

  const uploadImage = () => {
    const data = new FormData();

    cropped.toBlob((blob) => {
      data.append('file', blob);
      data.append('type', type);

      const config = {
        method: 'post',
        url: urls.imageUpload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      };

      setLoading(true);
      axios(config)
        .then((res) => {
          setLoading(false);

          const { url, type } = res;
          if (url) {
            onUpload(url);
            onClose();
          }
        })
        .catch((error) => {
          console.warn('55-IMG-UP', error);
          setLoading(false);
        });
    });
  };

  // convert base64 to blob
  const getBlob = (file) => URL.createObjectURL(file);

  // on file selected
  const onSelect = (acceptedFiles) => {
    setFile(getBlob(acceptedFiles[0]));
  };

  // -------------crop--------------
  const [crop, setCrop] = useState({
    // aspect: 1,
    // unit: "%",
    // width: 70,
    unit: '%',
    x: 50,
    y: 50,
    minWidth: 300,
  });

  const getCroppedImg = async () => {
    try {
      // cale up image by 1.5x
      let FACTOR = 1.2;

      const canvas = document.createElement('canvas');
      const scaleX = croppingImage.naturalWidth / croppingImage.width;
      const scaleY = croppingImage.naturalHeight / croppingImage.height;

      if (crop.width < 140) {
        FACTOR = 1.8;
      } else if (crop.width < 250) {
        FACTOR = 1.5;
      }

      // console.log({
      //     FACTOR,
      //     scaleX,
      //     ow:croppingImage.naturalWidth,
      //     cw:croppingImage.width,
      //     crop
      //   });

      // canvas dimension
      canvas.width = crop.width * FACTOR;
      canvas.height = crop.height * FACTOR;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        croppingImage,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * FACTOR,
        crop.height * FACTOR
      );

      // convert canvas to base64Image
      setCropped(canvas);
    } catch (e) {
      console.warn('crop error', e);
    }
  };
  // -------------crop--------------

  return (
    <Drawer
      anchor="bottom"
      open={!!open}
      onClose={onClose}
      PaperProps={{ elevation: 0, sx: { borderRadius: '20px 20px 0 0' } }}
    >
      <Box className="p-2">
        <Typography variant="h4" className="mb-4">
          Upload image
        </Typography>

        {
          // STEP 1. ---select file---
          !file && <Dropzone className="mb-3" onDrop={onSelect} />
        }

        {
          // STEP 2. ---crop and resize---
          file && !cropped && (
            // <Box sx={{ maxWidth: "100%", height: '300px' }}>
            <ReactCrop
              style={{ maxWidth: '100%' }}
              src={file}
              onImageLoaded={setCroppingImage}
              crop={crop}
              onChange={setCrop}
              keepSelection
              circularCrop={false}
              scale
            />
            // </Box>
          )
        }

        {
          // STEP 3. ---preview and upload---
          cropped && (
            <div className="text-center py-2 px-5">
              <ProductImage src={cropped.toDataURL('image/jpeg', 1)} />
              {/* <Avatar size="xxl" className="me-1">
                <Avatar.Image
                  className="rounded"
                  src={cropped}
                />
              </Avatar> */}
            </div>
          )
        }

        {
          // STEP 2. ---crop and resize---
          file && !cropped && (
            <Stack direction="row" spacing={1} className="jc-sb mt-3">
              <Button color="error" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                variant="soft"
                onClick={() => setFile(null)}
                startIcon={<Iconify icon="mdi:image" width={20} height={20} />}
              >
                Change
              </Button>
              <Button
                variant="contained"
                onClick={getCroppedImg}
                startIcon={<Iconify icon="mdi:crop" width={20} height={20} />}
              >
                Crop
              </Button>
            </Stack>
          )
        }

        {
          // STEP 3. ---preview and upload---
          cropped && (
            <Stack direction="row" spacing={1} className="jc-sb mt-3">
              <Button color="error" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                variant="soft"
                onClick={() => setCropped(null)}
                startIcon={<Iconify icon="mdi:crop" width={20} height={20} />}
                disabled={loading}
              >
                Re crop
              </Button>

              <LoadingButton
                variant="contained"
                className="w-33"
                loading={loading}
                onClick={uploadImage}
                startIcon={<Iconify icon="mdi:upload" width={20} height={20} />}
                // disabled={!isDirty}
              >
                Upload
              </LoadingButton>

              {/* <Button className='w-33' variant='contained'
              startIcon={<Iconify icon='mdi:upload' width={20} height={20} />}
              onClick={uploadImage}
              loading={loading}
            >
              Upload
            </Button> */}
            </Stack>
          )
        }
      </Box>
    </Drawer>
  );
};

UploadImage.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onUpload: PropTypes.func,
  type: PropTypes.oneOf(['product', 'temp']),
};

export default UploadImage;
