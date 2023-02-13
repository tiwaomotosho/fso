import { useState } from "react";

const Person = ({ person }) => {
  return (
    <>
      {person.name}
      <br />
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
    };

    if (persons.some((person) => person.name === personObject.name)) {
      window.alert(`${personObject.name} is already added to phonebook`);
    } else {
      console.log(
        "condition is",
        !persons.every((person) => person.name === personObject.name)
      );
      setPersons(persons.concat(personObject));
      setNewName("");
    }
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, id) => (
          <Person key={id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
