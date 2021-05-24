import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { TextField, MenuItem, Button } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./EditModal.scss";

function EditModal(props) {
  const [nameEdit, setNameEdit] = useState(props.itemEdit.name);
  const [doctorEdit, setDoctorEdit] = useState(props.itemEdit.doctor);
  const [dateEdit, setDateEdit] = useState(
    new Date(props.itemEdit.date).toISOString().split("T")[0]
  );
  const [complaintEdit, setComplaintEdit] = useState(props.itemEdit.complaint);

  let doctors = [
    {
      value: "Иван Иванов Иваныч",
    },
    {
      value: "Еврий Евринов Еврийский",
    },
    {
      value: "Bиталий Виталов Виталович",
    },
  ];

  let editParams = {
    item: props.itemEdit,
    nameEdit,
    doctorEdit,
    dateEdit,
    complaintEdit
  }

  return (
    <div>
      <Dialog
        open={props.editMod}
        onClose={() => props.setEditMod(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Изменить прием</DialogTitle>
        <DialogContent>
          <DialogContentText>Имя:</DialogContentText>
          <TextField
            type="text"
            id="nameInput"
            value={nameEdit}
            variant="outlined"
            onChange={(e) => setNameEdit(e.target.value)}
            autoFocus
            margin="dense"
            fullWidth
          />
          <DialogContentText>Врач:</DialogContentText>
          <TextField
            type="text"
            id="doctorInput"
            select
            value={doctorEdit}
            variant="outlined"
            onChange={(e) => setDoctorEdit(e.target.value)}
            margin="dense"
            fullWidth
          >
            {doctors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <DialogContentText>Дата:</DialogContentText>
          <TextField
            type="date"
            id="dateInput"
            value={dateEdit}
            variant="outlined"
            onChange={(e) => setDateEdit(e.target.value)}
            fullWidth
          />
          <DialogContentText>Жалобы:</DialogContentText>
          <TextField
          id="complaintsInputEdit"
          multiline
          rows={4}
          defaultValue="Default Value"
          onChange={(e) => setComplaintEdit(e.target.value)}
          variant="outlined"
          fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => props.setEditMod(false)}
            color="primary"
            id="btnCancel"
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              props.editEl(
                editParams
              )
            }
            color="primary"
            id="btnDelete"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditModal;
