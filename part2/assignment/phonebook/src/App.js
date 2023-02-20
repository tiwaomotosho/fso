import { useState, useEffect } from "react";
import axios from "axios";

const Person = ({ person }) => {
  return (
    <>
      <b>Name</b>:{person.name}; <b>Number</b>:{person.number}
      <br />
    </>
  );
};

const Filter = ({ pattern, onChange }) => {
  return (
    <div>
      filter shown with <input value={pattern} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({ onSubmit, newName, onNameChange, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName.name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newName.number} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons }) => (
  <div>
    {persons.map((person, id) => (
      <Person key={id} person={person} />
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [newPattern, setNewPattern] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName.name,
      number: newName.number,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === personObject.name)) {
      window.alert(`${personObject.name} is already added to phonebook`);
    } else {
      console.log(
        "condition is",
        !persons.every((person) => person.name === personObject.name)
      );
      setPersons(persons.concat(personObject));
      setNewName({ name: "", number: "" });
    }
  };
  const regex = new RegExp(`${newPattern}`, "i");
  const personsFiltered = persons.filter((person) => regex.test(person.name));
  // console.log(personsFiltered);

  // Refactoring the Event Handlers professionally
  const handleEvent =
    (title, callback, isObj = true) =>
    (event) => {
      console.log(`${title} is`, event.target.value);
      if (isObj) callback({ ...newName, [title]: event.target.value });
      else callback(event.target.value);
    };

  const handleNameChange = handleEvent("name", setNewName);
  const handlePhoneChange = handleEvent("number", setNewName);
  const handlePatternChange = handleEvent("pattern", setNewPattern, false);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter pattern={newPattern} onChange={handlePatternChange} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        onNumberChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsFiltered} />
    </div>
  );
};

export default App;
