//
// import { CheckboxIcon, CheckboxCheckedIcon, CheckboxIndeterminateIcon } from './CustomIcons';

// -----------------------------------------------

export default function Checkbox(theme) {
  return {
    MuiCheckbox: {
      defaultProps: {
        // icon: <CheckboxIcon />,
        // checkedIcon: <CheckboxCheckedIcon />,
        // indeterminateIcon: <CheckboxIndeterminateIcon />,
      },

      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          borderRadius: "20px"
          // '&.Mui-checked.Mui-disabled, &.Mui-disabled': {
          //   color: theme.palette.action.disabled,
          // },
        },
      },
    },
  };
}
