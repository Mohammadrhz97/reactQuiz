import { useEffect, useReducer } from "react";
import Headers from "../moduls/Header.jsx";
import Main from "../moduls/Main.jsx";
import Error from "../moduls/Error.jsx";
import Loader from "../moduls/Loader.jsx";
import StartScreen from "../moduls/StartScreen.jsx";
import Questions from "../moduls/Questions.jsx";

const initialState = {
  questions: [],
  status: "Loading",
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
    default: {
      throw new Error("action Unknown");
    }
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestion = questions.length;

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
        {status === "active" && <Questions />}
      </Main>
    </div>
  );
}
