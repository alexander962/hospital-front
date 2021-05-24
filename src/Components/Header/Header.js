import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import logo from "../../images/logo.png";
import "./Header.scss";

function Header(props) {
  return (
    <div className="Header">
      <AppBar className="Header-appBar">
        <Container fixed>
          <Toolbar className="toolbar">
            <div className='Header-block'>
              <img src={logo} alt="logo" />
              <Typography className="Header-logoText">
                {props.heading}
              </Typography>
            </div>
            {props.children}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
