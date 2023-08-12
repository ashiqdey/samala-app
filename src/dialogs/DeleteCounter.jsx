import PropTypes from 'prop-types';
// @mui
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// -----------------------------------------------


const DeleteCounter = ({ open, onClose, onDelete, counter }) => {

  if (!open) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      aria-labelledby="delete-confirmation-alert"
      aria-describedby="delete-confirmation-alert-description"
      PaperProps={{ elevation: 0 }}
    >
      <DialogTitle id="delete-dialog-title">Delete Counter</DialogTitle>
      <DialogContent sx={{ mt: 2, minWidth: 300 }}>
        <DialogContentText id="delete-dialog-description">
          <b>Name:</b> {counter.counter_name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='success'>Cancel</Button>
        <Button onClick={onDelete} autoFocus variant='contained' color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>)
}

export default DeleteCounter;

DeleteCounter.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  counter: PropTypes.any,
};
