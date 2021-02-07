// TODO Разобраться с условными конструкциями для way и title

import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../../images/logo.svg';

const pathsMap = {
  "/": {url: "sign-in", label: "Выйти"},
  "/sign-up": {url: "sign-in", label: "Войти"},
  "/sign-in": {url: "sign-up", label: "Регистрация"}

};


function Header(props) {
  const location = useLocation().pathname;

  const urlAndTitle = pathsMap[location] ? pathsMap[location] : {url: "sign-in", label: "Войти"};

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
      <div className="header__wrapper">
        { props.isLoggedIn && <p className="header__email">{props.email}</p>}
        <Link className="header__link" to={urlAndTitle.url} onClick={props.loggedInOff}>{ urlAndTitle.label }</Link>
      </div>
    </header>
  );
}

export default Header;
