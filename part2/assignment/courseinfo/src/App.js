const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => (
  <p>
    <b>total of {sum} exercises</b>
  </p>
);

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
    <Header course={courseAll.name} />
    <Content parts={courseAll.parts} />
    <Total
      sum={courseAll.parts.reduce((sum, part) => sum + part.exercises, 0)}
    />
  </>
);

const CourseList = ({ courses }) => (
  <>
    {courses.map((course, id) => (
      <Course key={id} courseAll={course} />
    ))}
  </>
);

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web Development curriculum</h1>
      <CourseList courses={courses} />
    </div>
  );
};

export default App;
