import PropTypes from 'prop-types';
import React, { useState } from 'react';

// @mui
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
//
import Dropzone from '../components/vendor/Dropzone';
import Iconify from '../components/micro/Iconify';

// hooks

// -----------------------------------------------


const UploadImage = ({ open, onClose }) => {
  const [file, setFile] = useState(null);


  const onCancel = () => {
    setFile(null);
    onClose();
  }

  // convert base64 to blob
  const getBlob = (file) => URL.createObjectURL(file);

  // on file selected
  const onSelect = (acceptedFiles) => setFile(getBlob(acceptedFiles[0]));




  return (
    <Drawer
      anchor='bottom'
      open={!!open}
      onClose={onClose}
      // onOpen={() => null}
      PaperProps={{ sx: { bgcolor: 'var(--grey-200)', borderRadius: '20px 20px 0 0' } }}
    >
      <Box className='p-2'>
        <Typography variant='h4' className='mb-4'>Upload prescription</Typography>

        {
          // STEP 1. ---select file---
          !file ? <Dropzone
            // accept="image/*"
            onDrop={onSelect}
          /> : <div className="ta-c py-2 px-5">
            <img
              src={file}
              alt='...'
              style={{ maxWidth: '70%', maxHeight: '200px', margin: 'auto' }}
            />
          </div>
        }



        {
          file && (<Stack direction='row' spacing={1} className='jc-sb mt-3'>
            <Button color='error' onClick={onCancel}>
              Cancel
            </Button>

            <Button variant='soft' onClick={() => setFile(null)}>
              Change
            </Button>

            <Button className='w-33' variant='contained'
              startIcon={<Iconify icon='mdi:upload' width={20} height={20} />}
            >
              Upload
            </Button>
          </Stack>)
        }
      </Box>
    </Drawer>
  );
}

UploadImage.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default UploadImage;
