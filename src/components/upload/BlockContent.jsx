// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Box className="ta-c p-3">
      <Typography gutterBottom variant="h5">
        Drop or Select file
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Drop files here or &nbsp;
        <Typography
          variant="body2"
          component="span"
          sx={{ color: 'primary.main', textDecoration: 'underline' }}
        >
          click
        </Typography>
        &nbsp; to browse
      </Typography>
    </Box>
  );
}
