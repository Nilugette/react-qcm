import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "./Store/UserContext";

export default () => {
  // Utilisation du Hook "useContext", prend en parametre le contexte à récupérer
  // A utiliser uniquement dans un composant "fonctionnel" (en non sous forme de classe)
  // Evite l'utilisation du composant "UserContext.Consumer"
  const { isLoggedIn } = useContext(UserContext);
  return (
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
        {isLoggedIn ? (
          <>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/qcm"
                activeClassName="disabled"
              >
                QCM
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/genre/1"
                activeClassName="disabled"
              >
                Dev Front
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/genre/2"
                activeClassName="disabled"
              >
                Dev Back
              </NavLink>
            </li>
          </>
        ) : null}
        <li className="nav-item">
          <NavLink className="nav-link" to="/auth" activeClassName="disabled">
            {isLoggedIn ? "Logout" : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
