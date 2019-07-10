import React from "react";
import Question from "./Question";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

let dataQcm = {
  id: 1,
  title: "Framework React",
  question: "React est-il un framework ?",
  c1: "oui",
  c2: "non",
  response: "c2",
  status: "open",
  success: false,
  choice: null,
  badge: "medium"
};

describe("<Question />", () => {
  it("should initialize correclty", () => {
    const question = mount(<Question question={dataQcm} />);
    expect(question).toHaveLength(1);
  });

  it("should show a box indicating a correct answer", () => {
    const question = mount(<Question question={dataQcm} />);
    const form = question.find("form");

    // Vérifier que le composant n'existe pas avant de répondre
    const beforeResponse = question.find("p.alert-success");
    expect(beforeResponse.exists()).toBe(false);

    // envoi du choix
    const choiceC2 = question.find('input[type="radio"]').at(1);
    choiceC2.simulate("change", { target: { value: "c2" } });

    const button = question.find("button");

    // Vérifier que le bouton est bien enabled avant le submit
    expect(button.props().disabled).toBe(false);

    // Envoie du formulaire
    button.simulate("submit");

    // Besoin de récupérer à nouveau le bouton car sinon ses props ne seront pas à jour
    const updatedButton = question.find("button");

    // Vérifier que le bouton est bien disabled après le submit
    expect(updatedButton.props().disabled).toBe(true);

    const response = question.find("p.alert-success");
    expect(response.text()).toEqual("Bravo vous avez bien répondu");
  });
});
