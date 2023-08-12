import PropTypes from 'prop-types';
// @mui
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

// -----------------------------------------------


const ConfirmDialog = ({ options, onClose, onDelete, onConfirm, children }) => {

  if (!options) {
    return null;
  }

  return (
    <Dialog
      open={!!options}
      onClose={onClose}
      maxWidth="md"
      aria-labelledby="delete-confirmation-alert"
      aria-describedby="delete-confirmation-alert-description"
      PaperProps={{ elevation: 0 }}
    >
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit'>Cancel</Button>
        {
          onDelete && <LoadingButton
            variant="contained"
            color='error'
            loading={options?.loading}
            onClick={onDelete}
          >
            Yes, Delete
          </LoadingButton>
        }

        {
          onConfirm && <LoadingButton
            variant="contained"
            color='success'
            loading={options?.loading}
            onClick={onConfirm}
          >
            Yes, Confirm
          </LoadingButton>
        }
      </DialogActions>
    </Dialog>)
}

export default ConfirmDialog;

ConfirmDialog.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.node,
};
