import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import mainImg from "../../images/logo.svg";
import view from "../../images/view.svg";
import noView from "../../images/invisible.svg";
import "./SignIn.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignIn() {
  let history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [severity, setSeverity] = useState("error");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // api.login(email, password);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const signInCheck = async () => {
    try {
      await axios.post("http://localhost:8000/checkUser", {
        login: login,
        password: password,
      });
      setSeverity("success");
      setMessage("Вы удачно авторизованы");
      setOpen(true);
      localStorage.setItem("user", { login });
      history.push("/appointment");
    } catch (e) {
      setSeverity("error");
      setMessage("Вы ввели неверный логин или пароль");
      setOpen(true);
    }
  };

  const onClickSignInBtn = (e) => {
    if (login === "" || password === "") {
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
    } else {
      signInCheck();
    }
  };

  function show_hide_password() {
    let input = document.getElementById("passwordSingIn");
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

  return (
    <div>
      <Header heading="Войти в систему" />
      <div className="content-block">
        <div className="Content-mainImg">
          <img src={mainImg} alt="logo" />
        </div>
        <div className="SignIn-form">
          <p>Войти в систему</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="loginSignIn"> Login: </label>
            <input
              type="text"
              id="loginSignIn"
              value={login}
              placeholder="Login"
              onChange={(e) => setLogin(e.target.value)}
            />
            <label htmlFor="passwordSignIn"> Password: </label>
            <div className="password-block">
              <input
                type="password"
                id="passwordSingIn"
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
            <div className="send-block">
              <input
                type="submit"
                value="Войти"
                id="form-btn_s"
                onClick={(e) => onClickSignInBtn(e)}
              />
              <Link to="/registration">Зарегистрироваться</Link>
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

export default SignIn;
