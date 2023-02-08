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

const Part = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.parts["name"]} {props.parts["exercises"]}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part parts={props.parts[0]} />
      <Part parts={props.parts[1]} />
      <Part parts={props.parts[2]} />
    </>
  );
};

const Total = (props) => {
  console.log(props);
  const total = props.parts.reduce((sum, data) => sum + data.exercises, 0);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

export default App;
