const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>total of {sum} exercises</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part, id) => (
      <Part key={id} part={part} />
    ))}
  </>
);

const Course = ({ courseAll }) => (
  <>
    <Header course={courseAll.course} />
    <Content parts={courseAll.parts} />
  </>
);

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
    {
      name: "State of a component extra",
      exercises: 18,
    },
  ];

  const courseAll = {
    course: course,
    parts: parts,
  };

  return (
    <div>
      <Course courseAll={courseAll} />
<<<<<<< HEAD
      {/* I already did what was expected for 2.3 */}
=======
      {/* I already did what was expected for 2.4 */}
>>>>>>> 2c262ba2cca6b56385364bd7f6796f5444ba113b
      <Total
        sum={courseAll.parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </div>
  );
};

export default App;
