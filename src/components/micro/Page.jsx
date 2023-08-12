import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
//
// import { useTheme } from '@mui/material/styles';
// const theme = useTheme();

// -----------------------------------------------


const Page = ({ children, title = '', meta }) => (
  <>
    <Helmet>
      {/* <meta name="theme-color" content={theme.palette.background.paper} /> */}
      <title>{`${title} | Samala Pharmacy`}</title>
      {meta}
    </Helmet>
    {children}
  </>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  // color: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
