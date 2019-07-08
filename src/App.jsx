import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Qcm from "./Qcm";

class App extends React.Component {
  // Render
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-Header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink className="navbar-brand" to="/">
                QCM React
              </NavLink>
              <ul className="nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/"
                    exact
                    activeClassName="disabled"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/qcm"
                    activeClassName="disabled"
                  >
                    QCM
                  </NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <div className="App-Content">
            <Route path="/" exact component={Home} />
            <Route path="/qcm/" component={Qcm} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
