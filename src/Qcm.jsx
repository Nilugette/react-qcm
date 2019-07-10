import React from "react";
import { database } from "./FirebaseConfig";
import { UserContext } from "./Store/UserContext";
import Title from "./Title";
import Question from "./Question";
// import fetchQcm from "./api/fetchQcm";
// import QuestionAsync from "./QuestionAsync";

class Qcm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      selectedQuestionId: null
    };

    // bindings
    this.selectQuestion = this.selectQuestion.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  // Life cycle
  componentDidMount() {
    this.updateQuestions(this.props.genreId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.genreId !== this.props.genreId) {
      database.ref("qcm").off();
      this.updateQuestions(this.props.genreId);
    }
  }

  componentWillUnmount() {
    database.ref("qcm").off();
  }

  updateQuestions(genreId) {
    if (!this.context.isLoggedIn) {
      this.setState({ questions: [] });
    }

    if (!genreId) {
      database.ref("qcm").on("value", snap => {
        let questions = [];
        snap.forEach(childSnap => {
          let elem = childSnap.val();
          // key
          elem.key = childSnap.key;
          questions.push(elem);
        });
        this.setState({ questions });
      });
    } else {
      database
        .ref("qcm")
        .orderByChild("genre_id")
        .equalTo(parseInt(genreId))
        .on("value", snap => {
          let questions = [];
          snap.forEach(childSnap => {
            let elem = childSnap.val();
            // key
            elem.key = childSnap.key;
            questions.push(elem);
          });
          this.setState({ questions: questions });
        });
    }

    // fetchQcm(this.props.genreId)
    //   .then(questions => {
    //     this.setState({
    //       questions
    //     });
    //   })
    //   .catch(e => {
    //     console.error("Error while fetching qcm");
    //     console.error(e);
    //   });
  }

  // Methods
  selectQuestion(id) {
    this.setState({
      selectedQuestionId: id
    });
  }

  // Render
  render() {
    if (!this.context.isLoggedIn) {
      return <div>Veuillez vous connecter pour accéder au QCM</div>;
    }
    let question = null;
    if (this.state.selectedQuestionId) {
      question = this.state.questions.find(
        e => e.id === this.state.selectedQuestionId
      );
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <nav>
            <ul className="list-group col">
              {this.state.questions.map(qcm => (
                <Title
                  key={`qcm-${qcm.id}`}
                  id={qcm.id}
                  title={qcm.title}
                  badge={qcm.badge}
                  onClick={this.selectQuestion}
                  selected={this.state.selectedQuestionId === qcm.id}
                />
              ))}
            </ul>
          </nav>
          <main className="col-8">
            {question ? (
              <Question question={question} />
            ) : (
              <div>Aucune question selectionnée</div>
            )}
            {/* {this.state.selectedQuestionId ? (
                  <QuestionAsync id={this.state.selectedQuestionId} />
                ) : (
                  <div>Aucune question selectionnée</div>
                )} */}
          </main>
        </div>
      </div>
    );
  }
}

// Soit on utilise le context type pour y avoir accès via "this.context" (1 seul max)
// Soit on utilise le composant "UserContext.Consumer" pour wrapper le composant QCM à l'extérieur de celui-ci
Qcm.contextType = UserContext;

export default Qcm;
