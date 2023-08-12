// import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// components
import Iconify from '../../../components/micro/Iconify';
import SvgIconStyle from '../../../components/micro/SvgIconStyle';
import UploadPrescriptionDialog from '../../../dialogs/UploadPrescription';
// hooks
// -----------------------------------------------


export default function UploadPrescription() {
  const [uploadDialog, setUploadDialog] = useState(null);


  return (
    <Stack
      direction='row'
      className='jc-sb ai-c py-2 br-2 my-2'
      sx={{ bgcolor: 'primary.lighter' }}
    >
      <Stack className='jc-c ai-c' sx={{ width: 90, height: 100, color: 'info.main' }}>
        <SvgIconStyle
          src='/assets/samala/icons/duo-bill.svg'
          sx={{
            width: 80,
            height: 80,
            transform: 'translateX(16px)'
          }}
        />
      </Stack>

      <Stack className='ai-c ta-c px-2' sx={{ width: 'calc(100% - 90px)' }}>
        <Typography variant='h4' color='primary.darker'>Order with prescription</Typography>
        <Typography variant='font5'>
          Upload prescription and we
          will deliver your medicines
        </Typography>

        <Button
          onClick={() => setUploadDialog(true)}
          variant='contained'
          className='w-75 mt-2'
          startIcon={<Iconify icon='ic:baseline-cloud-upload' />}
        >
          Upload
        </Button>
      </Stack>

      <UploadPrescriptionDialog open={uploadDialog} onClose={() => setUploadDialog(false)} />

    </Stack>
  );
}


