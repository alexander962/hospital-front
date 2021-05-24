import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import "./DeleteModal.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteModal(props) {
  return (
    <div>
      <Dialog
        open={props.deleteMod}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setDeleteMod(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Удалить приём?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Вы действительно хотите удалить прием?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => props.setDeleteMod(false)}
            color="primary"
            id="btnCancel"
          >
            Cancel
          </Button>
          <Button
            onClick={() => props.deleteEl(props.idDel)}
            color="primary"
            id="btnDelete"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;
