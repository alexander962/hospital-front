import React, { useState, useLayoutEffect, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar,
} from "@material-ui/core";
import "./Information.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function Information(props) {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");
  const [width, height] = useWindowSize();
  const [info, setInfo] = useState();

  useEffect(() => {
    if (width < 1025) {
      setInfo(true);
    } else {
      setInfo(false);
    }
  }, [width]);

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

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onClickTable = (e) => {
    if (name === "" || doctor === "" || date === "" || complaint === "") {
      setSeverity("error");
      setMessage("Заполните все поля!");
      setOpen(true);
    } else {
      props.addNewAppointment(name, doctor, date, complaint);
      setSeverity("success");
      setMessage("Успешно добавлено!");
      setOpen(true);
      setName("");
      setDate("");
      setDoctor("");
      setComplaint("");
    }
  };

  const addInfo = () => {
    setInfo(false);
  };

  const hideInfo = () => {
    setInfo(true);
  };

  return (
    <div className="Information-shadow">
      <Container fixed>
        {info ? (
          <div className="Information_btn">
            <Button
              variant="contained"
              onClick={() => addInfo()}
              id="addInfoBlockBtn"
            >
              Добавить данные в таблицу
            </Button>
          </div>
        ) : (
          <div className="Information">
            <div className="Information_block">
              <Typography className="Information-Text">Имя:</Typography>
              <TextField
                type="text"
                id="nameInput"
                value={name}
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="Information_block">
              <Typography className="Information-Text">Врач:</Typography>
              <TextField
                id="doctorInput"
                select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                variant="outlined"
              >
                {doctors.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="Information_block">
              <Typography className="Information-Text">Дата:</Typography>
              <TextField
                type="date"
                id="dateInput"
                value={date}
                variant="outlined"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="Information_block">
              <Typography className="Information-Text">Жалобы:</Typography>
              <TextField
                type="text"
                id="complaintsInput"
                value={complaint}
                variant="outlined"
                onChange={(e) => setComplaint(e.target.value)}
              />
            </div>
            <div className="Information_btns">
              <Button
                id="addBtn"
                variant="contained"
                onClick={() => onClickTable()}
                disabled={!name || !doctor || !date || !complaint}
              >
                Добавить
              </Button>

              <Button
                id="hideBtn"
                variant="contained"
                onClick={() => hideInfo()}
              >
                Скрыть
              </Button>
            </div>
          </div>
        )}
      </Container>
      <Snackbar 
        open={open} 
        autoHideDuration={4000} 
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Information;
