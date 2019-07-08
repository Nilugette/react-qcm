import React from "react";
import PropTypes from "prop-types";
import fetchQuestion from "./api/fetchQuestion";
import InputRadio from "./InputRadio";

class QuestionAsync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      isFetching: true,
      hasError: false,
      selectedAnswer: null
    };

    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetchQuestion(this.props.id)
      .then(q => {
        this.setState({
          question: q,
          isFetching: false
        });
      })
      .catch(() => {
        this.setState({
          isFetching: false,
          hasError: true
        });
      });
  }

  componentDidUpdate(prevProps) {
    /* Attention à la requete asynchrone : possibilité de race condition */
    if (prevProps.id !== this.props.id) {
      this.setState({
        isFetching: true
      });
      fetchQuestion(this.props.id)
        .then(q => {
          // On vérifie que la réponse correspond bien à la question selectionnée
          if (this.props.id === q.id) {
            // la nouvelle question est reçue
            this.setState({
              question: q,
              isFetching: false,
              hasError: false,
              selectedAnswer: null
            });
          }
        })
        .catch(() => {
          this.setState({
            isFetching: false,
            hasError: true
          });
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
    console.log("Vous avez répondu", this.state.selectedAnswer);
    if (this.state.selectedAnswer === this.state.question.response) {
      console.log("Gagné");
    } else {
      console.log("Perdu");
    }
  }

  render() {
    if (this.state.isFetching) {
      return <div>Chargement...</div>;
    }

    if (this.state.hasError) {
      return <div>Une erreur est survenue !</div>;
    }

    const { title, question, badge, commandes, c1, c2 } = this.state.question;
    return (
      <div className="">
        <div>
          <h3 className="d-inline mr-2">{title}</h3>
          <span className="text-secondary">{badge}</span>
        </div>
        <p className="mt-4 h5">{question}</p>
        {commandes ? <pre>{commandes}</pre> : null}
        <form onSubmit={this.handleSubmit}>
          <InputRadio
            label={c1}
            name="question"
            checked={this.state.selectedAnswer === "c1"}
            onChange={this.handleChange}
            value={"c1"}
          />
          <InputRadio
            label={c2}
            name="question"
            checked={this.state.selectedAnswer === "c2"}
            onChange={this.handleChange}
            value={"c2"}
          />

          <input
            className="btn btn-primary"
            type="submit"
            value="Répondre"
            disabled={this.state.selectedAnswer === null}
          />
        </form>
      </div>
    );
  }
}

QuestionAsync.propTypes = {
  id: PropTypes.number.isRequired
};

export default QuestionAsync;
