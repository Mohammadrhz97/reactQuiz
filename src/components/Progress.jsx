function Progress({ index, numQuestion, point, maxpossiblePoint, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{point}</strong> / {maxpossiblePoint}
      </p>
    </header>
  );
}

export default Progress;
