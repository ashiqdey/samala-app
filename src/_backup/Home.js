import { Navigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/micro/Page';
import { PATHS } from '../routes/paths';

// -----------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));


// -----------------------------------------------

export default function HomePage() {

  return (
    <Page title="Home">
      <RootStyle>
        <Navigate to={PATHS.root} />
      </RootStyle>
    </Page>
  );
}
