import React from "react";

import Title from "./Title";
import Question from "./Question";
import QuestionAsync from "./QuestionAsync";

class Qcm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qcms: [],
      genres: [],
      selectedQuestionId: null
    };

    // bindings
    this.selectQuestion = this.selectQuestion.bind(this);
  }

  // Life cycle
  componentDidMount() {
    const url = process.env.PUBLIC_URL + "/data/qcm.json";
    fetch(url)
      .then(r => r.json())
      .then(data => {
        this.setState({
          qcms: data.qcm,
          genres: data.genres
        });
      })
      .catch(e => {
        console.error("Error while fetching", url);
        console.error(e);
      });
  }

  // Methods
  selectQuestion(id) {
    this.setState({
      selectedQuestionId: id
    });
  }

  // Render
  render() {
    let question = null;
    if (this.state.selectedQuestionId) {
      question = this.state.qcms.find(
        e => e.id === this.state.selectedQuestionId
      );
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <nav>
            <ul className="list-group col">
              {this.state.qcms.map(qcm => (
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

export default Qcm;
