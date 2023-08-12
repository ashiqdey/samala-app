// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/micro/Page';
// sections

// -----------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));


// -----------------------------------------------

export default function HomePage() {
  return (
    <Page title="Homepage">
      <RootStyle>
        Home
      </RootStyle>
    </Page>
  );
}
