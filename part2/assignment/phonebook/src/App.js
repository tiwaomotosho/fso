import { useState, useEffect } from "react";
import Person from "./components/Person";

import personService from "./services/persons";

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

const Notification = ({ style, message }) => {
  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [newPattern, setNewPattern] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    error: true,
  });

  const alert = errorMessage.error
    ? {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }
    : {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      };

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName.name,
      number: newName.number,
    };

    if (persons.some((person) => person.name === personObject.name)) {
      const personFind = persons.find(
        (person) => person.name === personObject.name
      );

      if (personFind.number !== personObject.number) {
        if (
          window.confirm(
            `${personObject.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          personService
            .update(personFind.id, {
              ...personFind,
              number: personObject.number,
            })
            .then((returnedNote) => {
              setErrorMessage({
                message: `Information of ${personFind.name} has been successfully updated`,
                error: false,
              });
              setTimeout(() => {
                setErrorMessage({
                  message: null,
                  error: true,
                });
              }, 5000);
              setPersons(
                persons.map((person) =>
                  person.id !== personFind.id ? person : returnedNote
                )
              );
            })
            .catch((error) => {
              setErrorMessage({
                message: `Information of ${personFind.name} has already been removed from server`,
                error: true,
              });
              setTimeout(() => {
                setErrorMessage({
                  message: null,
                  error: true,
                });
              }, 5000);
              setPersons(
                persons.filter((person) => person.id !== personFind.id)
              );
              console.log(
                `Error updating note with id ${personFind.id}: ${error}`
              );
            });
        }
      } else window.alert(`${personObject.name} is already added to phonebook`);
    } else {
      personService.create(personObject).then((response) => {
        setErrorMessage({
          message: `Added ${personObject.name}`,
          error: false,
        });
        setTimeout(() => {
          setErrorMessage({
            message: null,
            error: true,
          });
        }, 5000);
        setPersons(persons.concat(response));
        setNewName({ name: "", number: "" });
      });
    }
  };

  const toggleDelete = (person, id) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
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
      <Notification style={alert} message={errorMessage.message} />
      <Filter pattern={newPattern} onChange={handlePatternChange} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        onNumberChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      <div>
        {personsFiltered.map((person) => (
          <Person
            key={person.id}
            person={person}
            toggleDelete={() => toggleDelete(person, person.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
