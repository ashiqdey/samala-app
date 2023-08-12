import PropTypes from 'prop-types';
import React from 'react';
import DropzoneAlias from 'react-dropzone';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
//
import SvgIconStyle from '../micro/SvgIconStyle';

// ---------------------------

function Dropzone({ multiple, className, ...props }) {
  const classes = `dropzone ${multiple && 'dropzone-multiple'} ${className}`;

  return (
    <DropzoneAlias
      accept={{
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg', '.jpg'],
      }}
      multiple={multiple}
      {...props}
    >
      {({ getRootProps, getInputProps }) => (
        <div className={classes} {...getRootProps()}>
          <input {...getInputProps()} />
          <ButtonBase className="dz-message d-flex fd-c ai-c">
            <SvgIconStyle
              sx={{ width: 120, height: 120, color: 'grey.400' }}
              src='/assets/samala/icons/duo-image.svg'
            />
            <Typography variant='font4'>Drop files here to upload</Typography>
          </ButtonBase>
        </div>
      )}
    </DropzoneAlias>
  );
}

export default Dropzone;

Dropzone.propTypes = {
  multiple: PropTypes.bool,
  className: PropTypes.string,
};