import React from "react";
import { NavLink } from "react-router-dom";

export default () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to="/">
      QCM React
    </NavLink>
    <ul className="nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact activeClassName="disabled">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/qcm" activeClassName="disabled">
          QCM
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/genre/1" activeClassName="disabled">
          Dev Front
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/genre/2" activeClassName="disabled">
          Dev Back
        </NavLink>
      </li>
    </ul>
  </nav>
);
