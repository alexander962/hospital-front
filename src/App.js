import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Appointment from "./Components/Appointments/Appointment";
import SignIn from "./Components/SignIn/SignIn";
import Registration from "./Components/Registration/Registration";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/appointment" component={Appointment} />
        <Route path="/registration" component={Registration} />
        <Route path="/autorization" component={SignIn} />
      </Switch>

      {localStorage.getItem("user") ? (
        <Switch>
          <Redirect to="/appointment" />
        </Switch>
      ) : window.location.href ===
        "http://localhost:3000/autorization" ? null : window.location.href ===
        "http://localhost:3000/registration" ? null : (
        <Redirect from="/" to="/autorization" />
      )}
    </div>
  );
}

export default App;
