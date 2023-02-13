import { useState } from "react";

const Person = ({ person }) => {
  return (
    <>
      <b>Name</b>:{person.name}; <b>Phone</b>:{person.phone}
      <br />
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040 - 1234567" },
  ]);
  const [newName, setNewName] = useState({ name: "", phone: "" });

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName.name,
      phone: newName.phone,
    };

    if (persons.some((person) => person.name === personObject.name)) {
      window.alert(`${personObject.name} is already added to phonebook`);
    } else {
      console.log(
        "condition is",
        !persons.every((person) => person.name === personObject.name)
      );
      setPersons(persons.concat(personObject));
      setNewName({ name: "", phone: "" });
    }
  };

  const handleNameChange = (event) => {
    console.log("name is", event.target.value);
    // setNewName(event.target.value);
    setNewName({ ...newName, name: event.target.value });
  };

  const handlePhoneChange = (event) => {
    console.log("phone is", event.target.value);
    // setNewName(event.target.value);
    setNewName({ ...newName, phone: event.target.value });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName.name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newName.phone} onChange={handlePhoneChange} />
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
