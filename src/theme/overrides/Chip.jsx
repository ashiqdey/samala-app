//
// import { CloseIcon } from './CustomIcons';

// -----------------------------------------------

export default function Chip(theme) {


  const softStyle = (color) => ({
    color: theme.palette[color].dark,
    backgroundColor: theme.palette[color].lighter
  });


  return {
    MuiChip: {
      defaultProps: {
        // deleteIcon: <CloseIcon />,
      },
      variants: [
        {
          props: { variant: 'soft' },
        },
      ],

      styleOverrides: {
        colorDefault: {
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: theme.palette.text.secondary,
          },
        },
        root: {
          '&.MuiChip-sizeSmall': {
            height: '19px',
            fontSize: '0.7em'
          },
        },
        outlined: {
          // borderColor: theme.palette.grey[500_32],
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main,
          },
          '&.MuiChip-colorSecondary': {
            borderColor: theme.palette.secondary.main,
          },
        },

        soft: {
          '&.MuiChip-softPrimary': softStyle('primary'),
          '&.MuiChip-softSecondary': softStyle('secondary'),
          '&.MuiChip-softInfo': softStyle('info'),
          '&.MuiChip-softSuccess': softStyle('success'),
          '&.MuiChip-softWarning': softStyle('warning'),
          '&.MuiChip-softError': softStyle('error'),
        },

        //
        avatarColorInfo: {
          color: theme.palette.info.contrastText,
          backgroundColor: theme.palette.info.dark,
        },
        avatarColorSuccess: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.success.dark,
        },
        avatarColorWarning: {
          color: theme.palette.warning.contrastText,
          backgroundColor: theme.palette.warning.dark,
        },
        avatarColorError: {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.error.dark,
        },
      },
    },
  };
}
