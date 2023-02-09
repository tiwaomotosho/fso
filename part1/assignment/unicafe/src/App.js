import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const Statistics = ({ stats }) => {
  if (stats["total"] === 0) {
    return <div>No feedback given</div>;
  } else {
    return (
      <div>
        <div>good {stats["good"]}</div>
        <div>neutral {stats["neutral"]}</div>
        <div>bad {stats["bad"]}</div>
        <div>all {stats["total"]}</div>
        <div>average {stats["avg"]}</div>
        <div>positive {stats["pos"]} %</div>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const avg = (good - bad) / total;
  const pos = (good / total) * 100;
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    avg: avg,
    pos: pos,
  };
  // console.log({ stats });
  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      <Header text={"statistics"} />
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
