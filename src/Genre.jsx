import React from "react";
import fetchQcmByGenre from "./api/fetchQcmByGenre";

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }
  componentDidMount() {
    fetchQcmByGenre(this.props.match.params.id).then(questions =>
      this.setState({ questions })
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      fetchQcmByGenre(this.props.match.params.id).then(questions =>
        this.setState({ questions })
      );
    }
  }
  // Render
  render() {
    return (
      <div>
        <p>QCM par genre... {this.props.match.params.id}</p>
        {this.state.questions.map(q => (
          <div key={"question-" + q.id}>{q.title}</div>
        ))}
      </div>
    );
  }
}

export default Genre;
