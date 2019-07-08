import React from "react";
import Email from "../forms/Email";
import Password from "../forms/Password";

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
    console.log(this.state);
  }

  // Render
  render() {
    const isValid = this.state.email.valid && this.state.password.valid;
    return (
      <div className="container">
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
      </div>
    );
  }
}

export default Auth;
