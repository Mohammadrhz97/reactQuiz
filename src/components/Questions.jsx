import Options from "./Options";

function Questions({ questions, dispatch, answer }) {
  return (
    <>
      <div>
        <h4>{questions.question}</h4>
      </div>
      <Options questions={questions} dispatch={dispatch} answer={answer} />
    </>
  );
}

export default Questions;
