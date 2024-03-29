import { useEffect, useReducer } from "react";
import Headers from "./Header.jsx";
import Main from "./Main.jsx";
import Error from "./Error.jsx";
import Loader from "./Loader.jsx";
import StartScreen from "./StartScreen.jsx";
import Questions from "./Questions.jsx";
import NextButton from "./NextButton.jsx";
import Progress from "./Progress.jsx";
import FinishScreen from "./FinishScreen.jsx";

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  point: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "Data Reseived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "Data Failed":
      return {
        ...state,
        status: "Error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "correctAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };
    case "nextButton":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.point > state.highscore ? state.point : state.highscore,
      };

    default: {
      throw new Error("action Unknown");
    }
  }
}

export default function App() {
  const [{ questions, status, index, answer, point, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestion = questions.length;
  const maxpossiblePoint = questions.reduce((pre, cur) => pre + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "Data Reseived", payload: data }))
      .catch((err) => dispatch({ type: "Data Failed" }));
  }, []);
  return (
    <div className="app">
      <Headers />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestion}
              point={point}
              maxpossiblePoint={maxpossiblePoint}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestion={numQuestion}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            point={point}
            maxpossiblePoint={maxpossiblePoint}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
