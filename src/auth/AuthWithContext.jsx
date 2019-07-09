import React from "react";
import { UserContext } from "../store/UserContext";
import Auth from "./Auth";

// Exemple d'utilisation des contexte avec un Consumer
// Il est possible d'en wrapper plusieurs
// => Ajoute une props qui va changer en fonction de l'état du contexte
class AuthWithContext extends React.Component {
  // Render
  render() {
    return (
      <UserContext.Consumer>
        {value => <Auth isLoggedIn={value.isLoggedIn} />}
      </UserContext.Consumer>
    );
  }
}

export default AuthWithContext;
