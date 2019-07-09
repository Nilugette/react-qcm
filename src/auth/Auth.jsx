import React from "react";
import { firebase } from "../FirebaseConfig";
import Email from "../forms/Email";
import Password from "../forms/Password";
import { UserContext } from "../store/UserContext";

const controls = {
  email: {
    name: "email",
    placeholder: "Email...",
    value: "",
    valid: false,
    required: true
  },
  password: {
    name: "password",
    placeholder: "Password...",
    value: "",
    valid: false,
    required: true
  }
};

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = controls;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "password") {
      this.setState(prevState => ({
        password: {
          ...prevState.password,
          value,
          valid: value.length >= 6
        }
      }));
    } else if (name === "email") {
      this.setState(prevState => ({
        email: {
          ...prevState.email,
          value,
          valid:
            value.length > 0 &&
            value.match(
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
            )
        }
      }));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.email.value,
        this.state.password.value
      )
      .catch(console.error);
  }

  handleLogout() {
    firebase.auth().signOut();
  }

  // Render
  render() {
    const isValid = this.state.email.valid && this.state.password.valid;
    return (
      <div className="container">
        {this.context.isLoggedIn ? (
          <div>
            <p>Vous êtes connecté.</p>
            <button className="btn btn-primary" onClick={this.handleLogout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <h1>Identifiez-vous</h1>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <Email
                {...this.state.email}
                handleInputChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Password
                {...this.state.password}
                handleInputChange={this.handleInputChange}
              />
            </div>
            <button
              disabled={isValid === false}
              type="submit"
              className="btn btn-primary"
            >
              Se connecter
            </button>
          </form>
        )}
      </div>
    );
  }
}

// Soit on utilise le context type pour y avoir accès via "this.context" (1 seul max)
// Soit on utilise le composant "AuthWithContext" qui peut wrapper plusieurs contextes
Auth.contextType = UserContext;

export default Auth;
