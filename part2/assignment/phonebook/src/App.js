import { useState } from "react";

const Person = ({ person }) => {
  return (
    <>
      <b>Name</b>:{person.name}; <b>Number</b>:{person.number}
      <br />
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [newPattern, setNewPattern] = useState("");

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

  const handleNameChange = (event) => {
    console.log("name is", event.target.value);
    // setNewName(event.target.value);
    setNewName({ ...newName, name: event.target.value });
  };

  const handlePhoneChange = (event) => {
    console.log("phone is", event.target.value);
    // setNewName(event.target.value);
    setNewName({ ...newName, number: event.target.value });
  };

  const handlePatternChange = (event) => {
    console.log("pattern is", event.target.value);
    // setNewName(event.target.value);
    setNewPattern(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input value={newPattern} onChange={handlePatternChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName.name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newName.number} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsFiltered.map((person, id) => (
          <Person key={id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
