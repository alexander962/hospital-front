import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Header from "../Header/Header";
import Table from "./Table/Table";
import Sort from "./SortFilter/Sort";
import Information from "./Information/Information";
import "./Appointment.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Appointment() {
  let history = useHistory();
  const [appointments, setAppointment] = useState([]);
  const [howSort, setHowSort] = useState("none");
  const [directSort, setDirectSort] = useState("asc");
  const [dateFrom, setDateFrom] = useState("");
  const [dateBy, setDateBy] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const outBtn = () => {
    localStorage.removeItem("user");
    history.push("/autorization");
  };

  const addNewAppointment = async (name, doctor, date, complaint) => {
    try {
      await axios.post("http://localhost:8000/createNewAppointment", {
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      });
      getAllAppoints(dateFrom, dateBy);
      history.push("/appointment");
    } catch (e) {
      setOpen(true);
    }
  };

  useEffect(() => getAllAppoints(dateFrom, dateBy), []);

  const getAllAppoints = async (dateFrom, dateBy) => {
    try {
      await axios
        .get("http://localhost:8000/getAllAppointments")
        .then((res) => {
          let arr = onFilter(dateFrom, dateBy, res.data.data);
          let arrNew = sortApp(arr, howSort, directSort);
          setAppointment(arrNew);
        });
    } catch (e) {
      setOpen(true);
    }
  };

  const sortApp = (arr, str, directSort) => {
    switch (directSort) {
      case "asc":
        return arr.sort((a, b) =>
          a[str] > b[str] ? 1 : a[str] < b[str] ? -1 : 0
        );

      case "desc":
        return arr.sort((a, b) =>
          a[str] < b[str] ? 1 : a[str] > b[str] ? -1 : 0
        );
    }
  };

  const onFilter = (dateFrom, dateBy, appointments) => {
    switch (true) {
      case dateFrom != "" && dateBy != "":
        return appointments.filter((item) => {
          return (
            item.date.split("T")[0] >= dateFrom &&
            item.date.split("T")[0] <= dateBy
          );
        });

      case dateFrom === "" && dateBy === "":
        return appointments;

      case dateFrom !== "" && dateBy === "":
        return appointments.filter((item) => {
          return item.date.split("T")[0] >= dateFrom;
        });

      case dateFrom === "" && dateBy !== "":
        return appointments.filter((item) => {
          return item.date.split("T")[0] <= dateBy;
        });
    }
  };

  return (
    <div className="Appointment">
      <Header heading="Приемы">
        <button onClick={() => outBtn()} className="outBtn">
          Выйти
        </button>
      </Header>
      <Information addNewAppointment={addNewAppointment} />
      <Sort
        appointments={appointments}
        directSort={directSort}
        setDirectSort={setDirectSort}
        sortApp={sortApp}
        setAppointment={setAppointment}
        getAllAppoints={getAllAppoints}
        howSort={howSort}
        setHowSort={setHowSort}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateBy={dateBy}
        setDateBy={setDateBy}
        onFilter={onFilter}
      />
      <Table
        setAppointment={setAppointment}
        appointments={appointments}
        getAllAppoints={getAllAppoints}
        setHowSort={setHowSort}
        dateFrom={dateFrom}
        dateBy={dateBy}
      />
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          "Ошибка соединения с сервером"
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Appointment;
