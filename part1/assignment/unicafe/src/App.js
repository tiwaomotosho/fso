import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ stats }) => {
  if (stats["total"] === 0) {
    return <div>No feedback given</div>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={stats["good"]} />
          <StatisticLine text="neutral" value={stats["neutral"]} />
          <StatisticLine text="bad" value={stats["bad"]} />
          <StatisticLine text="all" value={stats["total"]} />
          <StatisticLine text="average" value={stats["avg"]} />
          <StatisticLine text="positive" value={stats["pos"] + " %"} />
        </tbody>
      </table>
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
