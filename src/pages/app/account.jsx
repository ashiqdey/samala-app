import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

// components
import Page from '../../components/micro/Page';
import SettingMode from '../../components/settings/SettingMode';
import UploadPrescriptionDialog from '../../dialogs/UploadPrescription';
import AccountMenu from './components/AccountMenu';
//
import useAuth from '../../hooks/useAuth';
import { config } from '../../configs';

// -----------------------------------------------

export default function Account({ admin }) {
  const [uploadDialog, setUploadDialog] = useState(null);
  const { user } = useAuth();

  return (
    <Page title="Account">
      <Container maxWidth="xl" className="pt-2">
        <Stack direction="row" spacing={2} className="ai-c br-15 p-2 mb-2" sx={{ bgcolor: 'info.main', color: '#fff' }}>
          <Avatar
            src={user?.dp || ''}
            alt=""
            // color='default'
            sx={{ width: 56, height: 56, bgcolor: 'info.light', color: '#fff' }}
          />
          <Stack>
            <Typography variant="h3">{user.name || ''}</Typography>
            <Typography variant="subtitle1" sx={{ color: '#fff', opacity: 0.8 }}>
              {user?.email || user?.phone || ''}
            </Typography>
          </Stack>
        </Stack>

        <AccountMenu admin={admin} setUploadDialog={setUploadDialog} />

        <Stack sx={{ mt: 6, mb: 2 }}>
          <SettingMode />
        </Stack>

        <UploadPrescriptionDialog open={uploadDialog} onClose={() => setUploadDialog(false)} />

        <Box className="ta-c font6 o-50">V{config.VERSION}</Box>
      </Container>
    </Page>
  );
}

Account.propTypes = {
  admin: PropTypes.bool,
};
