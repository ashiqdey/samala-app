import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// -----------------------------------------------
/* ----- USAGE -----
<Breadcrumbs
  links={[
    { url: PATHS.general.app, text: 'Dashboard' },
    { url: PATHS.vendor.root, text: 'Vendor' },
    { text: 'Add vendor' }
  ]}
/>
*/
// -----------------------------------------------

CustomBreadcrumbs.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string.isRequired,
  })),
};
export default function CustomBreadcrumbs({ links }) {
  if (links.length === 0) {
    return null;
  }
  if (links.length === 1) {
    return <Typography color="text.primary">{links[links.length - 1].text}</Typography>
  }

  return <Breadcrumbs>
    {
      links.slice(0, -1).map(link => (<Link
        key={link.url}
        component={RouterLink}
        underline='hover'
        color='inherit'
        to={link.url}
      >
        {link.text}
      </Link>))
    }

    <Typography color="text.primary">{links[links.length - 1].text}</Typography>
  </Breadcrumbs>
}


