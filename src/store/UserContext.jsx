import React, { createContext, Component } from "react";
import { firebase } from "../FirebaseConfig";

export const UserContext = createContext({ isLoggedIn: false });

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = { isLoggedIn: false };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoggedIn: Boolean(user) });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe !== null) {
      this.unsubscribe();
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
