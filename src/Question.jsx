import React from "react";
import PropTypes from "prop-types";
import InputRadio from "./InputRadio";
import { database } from "./FirebaseConfig";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: props.question.choice,
      isSubmitting: false
    };

    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      selectedAnswer: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmitting: true
    });

    var updates = {};
    updates["/qcm/" + this.props.question.key + "/status"] = "closed";
    updates[
      "/qcm/" + this.props.question.key + "/choice"
    ] = this.state.selectedAnswer;
    updates["/qcm/" + this.props.question.key + "/success"] =
      this.state.selectedAnswer === this.props.question.response;

    database
      .ref()
      .update(updates)
      .then(value => {
        this.setState({
          isSubmitting: false
        });
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
      status,
      success
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
            disabled={status === "closed"}
          />
          <InputRadio
            label={c2}
            name="question"
            checked={this.state.selectedAnswer === "c2"}
            onChange={this.handleChange}
            value={"c2"}
            disabled={status === "closed"}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={
              this.state.selectedAnswer === null ||
              this.state.isSubmitting ||
              status === "closed"
            }
          >
            Répondre
          </button>
        </form>
        {status === "closed" && success ? (
          <p className="alert-success p-2">Bravo vous avez bien répondu</p>
        ) : null}
        {status === "closed" && !success ? (
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
