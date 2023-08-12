import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// @mui
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
//
import { MEDICINE_CATEGORY } from '../configs';
import { PATHS } from '../routes/paths';

// -----------------------------------------------

const MedicineCategory = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="bottom"
      open={!!open}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          bgcolor: 'var(--grey-0)',
          borderRadius: '20px 20px 0 0',
          px: 2,
          pb: 2,
        },
      }}
    >
      <Grid container spacing={2} className="mt-0">
        {MEDICINE_CATEGORY.map((e) => (
          <Grid key={e.name} item xs={4}>
            <ButtonBase
              to={`${PATHS.app.search}?categories=${e.id}`}
              component={Link}
              sx={{
                bgcolor: 'background.paper',
                // width: '100px',
                height: '100px',
                // ml: i === 0 ? 0 : 2,
                fontWeight: '400',
                '&:hover': {
                  bgcolor: 'background.paper',
                },
              }}
              className="d-flex ai-c jc-c fd-c br-15"
            >
              <Box sx={{ width: '50px', height: '50px' }} className="d-flex ai-c jc-c fd-c br-1">
                <img className="w-100 dark-brightness-09" src={`/assets/samala/images/${e.icon}`} alt="..." />
              </Box>
              <Typography variant="h6" component="div" className="mt-1 ta-c lh-1" sx={{ color: 'var(--grey-700)' }}>
                {e.name}
              </Typography>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Drawer>
  );
};

MedicineCategory.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MedicineCategory;
