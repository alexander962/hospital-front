import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "../Header/Header";
import mainImg from "../../images/logo.svg";
import view from "../../images/view.svg";
import noView from "../../images/invisible.svg";
import "./Registration.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Registration() {
  let history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addNewUser = async () => {
    try {
      await axios.post("http://localhost:8000/createUser", {
        login: login,
        password: password,
      });
      setSeverity("success");
      setMessage("Вы удачно зарегестрированны");
      setOpen(true);
      localStorage.setItem("user", "user");
      history.push("/appointment");
      window.location.reload();
    } catch (e) {
      setSeverity("error");
      setMessage("Такой пользователь уже существует");
      setOpen(true);
    }
  };

  const onClickRegisterBtn = (e) => {
    if (login === "" || password === "" || repeatPassword === "") {
      setMessage("Заполните все поля!");
      setOpen(true);
    } else if (login.length < 6) {
      setMessage("Минимальное колличество символов для Login = 6");
      setOpen(true);
    } else if (!/(?=.*[0-9])(?=.*[A-Za-z]){5,}/.test(password)) {
      setMessage(
        "Введите в поле password не менее 6 латинских символов, минимум 1 из которых является числом"
      );
      setOpen(true);
    } else if (password !== repeatPassword) {
      setMessage("Пароли не совпадают!");
      setOpen(true);
    } else {
      addNewUser();
      setLogin("");
      setPassword("");
      setRepeatPassword("");
    }
  };

  function show_hide_password() {
    let input = document.getElementById("password");
    let linkA = document.getElementsByClassName("password-control")[0];
    if (input.getAttribute("type") == "password") {
      linkA.src = view;
      input.setAttribute("type", "text");
    } else {
      linkA.src = noView;
      input.setAttribute("type", "password");
    }
    return false;
  }

  function show_hide_password_repeat() {
    let input = document.getElementById("password-repeat");
    let linkA = document.getElementsByClassName("password-control_repeat")[0];
    if (input.getAttribute("type") == "password") {
      linkA.src = view;
      input.setAttribute("type", "text");
    } else {
      linkA.src = noView;
      input.setAttribute("type", "password");
    }
    return false;
  }

  return (
    <div>
      <Header heading="Зарегистрироваться в системе" />
      <div className="content-block">
        <div className="Content-mainImg">
          <img src={mainImg} alt="logo" />
        </div>
        <div className="Registration-form">
          <p>Регистрация</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="login"> Login: </label>
            <input
              type="text"
              id="login"
              value={login}
              placeholder="Login"
              onChange={(e) => setLogin(e.target.value)}
            />
            <label htmlFor="password"> Password: </label>
            <div className="password-block">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={noView}
                className="password-control"
                onClick={() => show_hide_password()}
              />
            </div>
            <label htmlFor="password"> Repeat password: </label>
            <div className="password-block">
              <input
                type="password"
                id="password-repeat"
                placeholder="Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <img
                src={noView}
                className="password-control_repeat"
                onClick={() => show_hide_password_repeat()}
              />
            </div>
            <div className="send-block">
              <input
                type="submit"
                value="Зарегистрироваться"
                id="form-btnr"
                onClick={(e) => onClickRegisterBtn(e)}
              />
              <Link to="/autorization">Авторизоваться</Link>
            </div>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Registration;
