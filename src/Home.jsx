import React from "react";
import { UserContext } from "./Store/UserContext";
import { database } from "./FirebaseConfig";
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isResetting: false
    };
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.setState({ isResetting: true });
    database
      .ref("qcm")
      .once("value")
      .then(snap => {
        const updates = {};
        snap.forEach(val => {
          updates["/qcm/" + val.key + "/status"] = "open";
          updates["/qcm/" + val.key + "/choice"] = null;
          updates["/qcm/" + val.key + "/success"] = false;
        });
        database
          .ref()
          .update(updates)
          .then(() => {
            this.setState({ isResetting: false });
          });
      });
  }
  // Render
  render() {
    return (
      <div>
        <h1>Bienvenu sur la page des QCM</h1>
        <p>QCM sur Angular et React</p>
        {this.context.isLoggedIn ? (
          <button
            className="btn btn-danger"
            onClick={this.handleReset}
            disabled={this.state.isResetting}
          >
            {this.state.isResetting ? "Resetting..." : "Reset QCM"}
          </button>
        ) : null}
      </div>
    );
  }
}

Home.contextType = UserContext;

export default Home;
