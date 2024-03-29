function NextButton({ dispatch, answer, index, numQuestion }) {
  if (answer === null) return null;
  if (index < numQuestion - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextButton" })}
      >
        Next
      </button>
    );
  }
  if (index === numQuestion - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
