import PropTypes from 'prop-types';
import { useState } from 'react';
import { useFormContext, Controller, } from 'react-hook-form';
// @mui
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
//
import Iconify from "../micro/Iconify";


// ----------------------------------------------------------------------
/* 
<RHFTags
  name='keyword'
  values={keywords}
  onChange={onKeywordChange}
  textfieldProps={{
    label: "Enter keyword...",
    fullWidth: true,
  }}
/> 
*/
// ----------------------------------------------------------------------

RHFTags.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  textfieldProps: PropTypes.object,
  onChange: PropTypes.func,
};
export default function RHFTags({ name, values, textfieldProps, onChange }) {
  const { control } = useFormContext();

  const [newWord, setNewword] = useState("");

  const changeHandler = (e) => {
    setNewword(e.target.value)
  };


  const onEnter = (e) => {
    if (e.key === 'Enter') {
      const temp = [...values, newWord.toLowerCase()];

      setNewword("");
      onChange([...new Set(temp)]);
    }
  };
  const handleDelete = (word) => {
    const temp = values.filter(e => e !== word)
    onChange([...temp]);
  };


  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (<>
          <TextField
            {...textfieldProps}
            value={newWord}
            onKeyDown={onEnter}
            onChange={changeHandler}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {
                    newWord.length > 2 && <IconButton onClick={() => onEnter({ key: 'Enter' })} edge="end">
                      <Iconify icon='mdi:plus' />
                    </IconButton>
                  }
                </InputAdornment>
              ),
            }}
          />

          <Stack direction='row' className='fw-w mt-2'>
            {values.map((tag) => <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDelete(tag)}
              sx={{ margin: '0 8px 8px 0' }}
            />)}
          </Stack>
          {
            checkError && (
              <FormHelperText error sx={{ px: 2 }}>
                {error?.message}
              </FormHelperText>
            )
          }
        </>)
      }}
    />
  );
}
