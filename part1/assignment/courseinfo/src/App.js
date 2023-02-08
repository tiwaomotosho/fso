// Unfortunately, the entire application is in the same component.
// Refactor the code so that it consists of three new components:
// Header, Content, and Total.All data still resides in the App component,
// which passes the necessary data to each component using props.
// Header takes care of rendering the name of the course,
// Content renders the parts and their number of exercises and
// Total renders the total number of exercises.

const Header = (props) => {
  console.log(props);
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  console.log(props);
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application Development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <>
      <Header course={course} />
      <Content name={part1} exercises={exercises1} />
      <Content name={part2} exercises={exercises2} />
      <Content name={part3} exercises={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  );
};

export default App;
