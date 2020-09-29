import React, { FC, memo, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
  resetPassword: () => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({
  open,
  handleClose,
  resetPassword,
}) => {
  const [email, setEmail] = useState<string>("");

  return (
    // TODO: Handle Form Validation
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="reset-dialog-title"
    >
      <DialogTitle id="reset-dialog-title">Reset Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To reset your password, please enter your email address here. We will
          send you all the instructions shortly.
        </DialogContentText>
        <TextField
          autoFocus
          variant="outlined"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={resetPassword} color="primary">
          Reset password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ForgotPassword);
