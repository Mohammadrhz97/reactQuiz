function Options({ questions, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {questions.options.map((question, index) => (
        <button
          onClick={() => {
            dispatch({ type: "correctAnswer", payload: index });
          }}
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered
              ? index === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={question}
          disabled={hasAnswered}
        >
          {question}
        </button>
      ))}
    </div>
  );
}

export default Options;
