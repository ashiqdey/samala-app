import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// -----------------------------------------------
const validPincodes = ['735303'];

const AddresDialog = ({ open, onClose, onConfirm, data }) => {
  const [name, setName] = useState(data.name || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [address, setAddress] = useState(data.address || '');
  const [pin, setPin] = useState(validPincodes[0]);
  const { enqueueSnackbar } = useSnackbar();

  const onSave = () => {
    const phoneInitial = ['6', '7', '8', '9'];

    if (name.length < 2) {
      enqueueSnackbar('Name is required', { variant: 'error' });
      return;
    }
    if (phone.length !== 10 || !phoneInitial.includes(phone.charAt(0))) {
      enqueueSnackbar('Invalid phone number', { variant: 'error' });
      return;
    }
    if (address.length < 7) {
      enqueueSnackbar('Pleae write a proper address', { variant: 'error' });
      return;
    }

    if (!validPincodes.includes(pin)) {
      enqueueSnackbar('Sorry, we dont deliver to this pincode yet 😢', { variant: 'error' });
      return;
    }

    onConfirm({
      name: name.substr(0, 30),
      phone,
      address,
    });
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={!!open}
      onClose={onClose}
      PaperProps={{ elevation: 0, sx: { borderRadius: '20px 20px 0 0' } }}
    >
      <Box className="p-2">
        <Typography variant="h4" className="mb-4">
          Update address
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Phone number"
            name="phone_number"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value.substr(0, 10))}
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            }}
          />

          <TextField
            label="Address"
            name="address"
            variant="outlined"
            multiline
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value.substr(0, 150))}
          />

          <TextField
            label="Pincode"
            name="pin"
            variant="outlined"
            value={pin}
            onChange={(e) => setPin(e.target.value.substr(0, 6))}
            type="number"
          />
        </Stack>
        <Stack direction="row" spacing={2} className="mt-3">
          <Button className="w-50" variant="soft" size="large" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-50" variant="contained" size="large" onClick={onSave}>
            Save
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

AddresDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  data: PropTypes.object,
};

export default AddresDialog;
