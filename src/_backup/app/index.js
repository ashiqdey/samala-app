// import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// components
import Page from '../../components/micro/Page';
//
import CategoryCards from './components/CategoryCards';
import SearchBar from './components/SearchBar';
import FeaturedProducts from '../../widgets/FeaturedProducts';
// import UploadPrescription from './components/UploadPrescription';


// -----------------------------------------------

export default function AppPage() {
  return (
    <Page title="Home">
      <Container maxWidth='xl'>
        <SearchBar />
        <CategoryCards />
        <FeaturedProducts />
        {/* <UploadPrescription /> */}
      </Container>
    </Page>
  );
}


