import React from "react";
import Qcm from "./Qcm";
import fetchGenre from "./api/fetchGenre";

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: {
        id: null,
        name: ""
      }
    };

    this.updateGenre = this.updateGenre.bind(this);
  }

  componentDidMount() {
    this.updateGenre(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.updateGenre(this.props.id);
    }
  }

  updateGenre(genreId) {
    fetchGenre(genreId)
      .then(genre => this.setState({ genre }))
      .catch(e => {
        console.error("Error while fetching genre");
        console.error(e);
      });
  }

  // Render
  render() {
    return (
      <div>
        <p>QCM par genre : {this.state.genre.name}</p>
        <Qcm genreId={this.props.id} />
      </div>
    );
  }
}

export default Genre;
