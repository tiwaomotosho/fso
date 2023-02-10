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

export default CourseList;
