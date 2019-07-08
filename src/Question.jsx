import React from "react";
import PropTypes from "prop-types";
import InputRadio from "./InputRadio";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: null,
      isSubmitted: false
    };

    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    // On réinitialise la réponse quand on change de question
    if (prevProps.question.id !== this.props.question.id) {
      this.setState({
        selectedAnswer: null,
        isSubmitted: false
      });
    }
  }
  handleChange(e) {
    this.setState({
      selectedAnswer: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmitted: true
    });
  }
  render() {
    const {
      title,
      badge,
      question,
      commandes,
      c1,
      c2,
      response
    } = this.props.question;
    return (
      <div className="">
        <div>
          <h3 className="d-inline mr-2">{title}</h3>
          <span className="text-secondary">{badge}</span>
        </div>
        <p className="mt-4 h5">{question}</p>
        {commandes ? <pre>{commandes}</pre> : null}
        <form className="mb-4" onSubmit={this.handleSubmit}>
          <InputRadio
            label={c1}
            name="question"
            checked={this.state.selectedAnswer === "c1"}
            onChange={this.handleChange}
            value={"c1"}
            disabled={this.state.isSubmitted}
          />
          <InputRadio
            label={c2}
            name="question"
            checked={this.state.selectedAnswer === "c2"}
            onChange={this.handleChange}
            value={"c2"}
            disabled={this.state.isSubmitted}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={
              this.state.selectedAnswer === null || this.state.isSubmitted
            }
          >
            Répondre
          </button>
        </form>
        {this.state.isSubmitted && this.state.selectedAnswer === response ? (
          <p className="alert-success p-2">Bravo vous avez bien répondu</p>
        ) : null}
        {this.state.isSubmitted && this.state.selectedAnswer !== response ? (
          <p className="alert-danger p-2">Raté !</p>
        ) : null}
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    commandes: PropTypes.string,
    c1: PropTypes.string.isRequired,
    c2: PropTypes.string.isRequired,
    response: PropTypes.string.isRequired
  }).isRequired
};

export default Question;
