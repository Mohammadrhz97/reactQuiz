import { useEffect } from "react";

function Timer({ dispatch, seconds }) {
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch, seconds]
  );
  return (
    <div className="timer">
      {minute < 10 && 0}
      {minute}:{second < 10 && 0}
      {second}
    </div>
  );
}

export default Timer;
