import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import NotFound from "./NotFound";
import Home from "./Home";
import Qcm from "./Qcm";
import Genre from "./Genre";
import Nav from "./Nav";

class App extends React.Component {
  // Render
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-Header">
            <Nav />
          </header>
          <div className="App-Content">
            <Route path="/" exact component={Home} />
            <Route path="/qcm/" component={Qcm} />
            <Route
              path="/genre/:id"
              render={({ match }) => {
                // TODO do not use hard coded values
                if (
                  parseInt(match.params.id) === 1 ||
                  parseInt(match.params.id) === 2
                ) {
                  return <Genre id={match.params.id} />;
                }

                // Or use Redirect component from react-router
                return <NotFound />;
              }}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
