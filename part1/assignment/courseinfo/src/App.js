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
        {props.name} {props.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part name={props.part1} exercises={props.exercises1} />
      <Part name={props.part2} exercises={props.exercises2} />
      <Part name={props.part3} exercises={props.exercises3} />
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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <Content
        part1={part1.name}
        part2={part2.name}
        part3={part3.name}
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </>
  );
};

export default App;
