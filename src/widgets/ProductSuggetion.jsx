import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

// @mui
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
//
import { productUrl } from '../utils/formatString';
import Iconify from '../components/micro/Iconify';



export default function ProductSuggetion({ suggestions }) {
  if (suggestions.length === 0) {
    return null;
  }

  return (<Paper
    className='p-f zi-100 w-100 l-0 of-a'
    sx={{
      top: 58,
      height: 'calc(100% - 60px)',
      borderTop: `1px dashed var(--grey-300)`,
    }}
  >
    <List>
      {
        suggestions.map(e => <ListItem
          key={e.id}
          to={productUrl(e.title, e.id)}
          component={Link}
          className='c-inherit'
          disablePadding
        >
          <ListItemButton>
            <ListItemText
              primary={e.title}
              primaryTypographyProps={{ className: 'text-truncate pr-2' }}
              sx={{ width: 'calc(100% - 70px)' }}
            />
            <Iconify icon='mdi:magnify' width={20} />
          </ListItemButton>
        </ListItem>)
      }
    </List>
  </Paper>);
}
ProductSuggetion.propTypes = {
  suggestions: PropTypes.array
};

