import PropTypes from 'prop-types';
import { useFormContext, Controller, } from 'react-hook-form';
// @mui
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
// 
import Iconify from '../micro/Iconify';
import useAuth from '../../hooks/useAuth';



// ----------------------------------------------------------------------

RHFKitchen.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  onChange: PropTypes.any,
};
export default function RHFKitchen({ name, values, onChange }) {
  const { control } = useFormContext();
  const { kitchens } = useAuth();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (<>
          <Stack direction='row' sx={{ flexWrap: 'wrap' }}>
            {kitchens.map((kitchen) => {
              const isSelected = values.includes(kitchen.id);
              return <Chip
                key={kitchen.id}
                label={kitchen.name}
                onClick={() => onChange(kitchen.id)}
                onDelete={() => onChange(kitchen.id)}
                variant={isSelected ? "filled" : "outlined"}
                deleteIcon={isSelected ? <Iconify icon='ic:baseline-done' /> : <></>}
                color={isSelected ? 'primary' : 'default'}
                sx={{ margin: '0 8px 8px 0' }}
              />
            })}
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
