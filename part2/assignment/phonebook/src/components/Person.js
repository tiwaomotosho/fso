const Person = ({ person, toggleDelete }) => {
  return (
    <>
      <b>Name</b>:{person.name}; <b>Number</b>:{person.number}
      <button onClick={toggleDelete}>delete</button>
      <br />
    </>
  );
};

export default Person;
