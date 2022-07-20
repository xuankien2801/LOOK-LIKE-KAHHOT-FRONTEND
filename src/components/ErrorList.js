import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

// This component is a popup that activates an error popup
// The detals of the error message are passed in as props
export default function ErrorList ({ title, desc, toggle, sessionId }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div id="alert-dialogue">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="popup"
        aria-describedby="alerts the user to a specified action"
        aria-modal='true'
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {desc} {sessionId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id='alert-close' onClick={toggle} autoFocus aria-label='Close popup button'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ErrorList.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  toggle: PropTypes.func,
  sessionId: PropTypes.string,
}
