import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const message = (messageText, time) => {
    setErrorMessage(messageText);
    setTimeout(() => {
      setErrorMessage(null);
    }, time);
  };
  const baseUrl = "http://localhost:3001/persons";

  const handleNameChange = (event) => {
    event.preventDefault();

    if (newName == "") {
      alert("Field 'name' can't be empty");
      return;
    }
    if (newNumber == "") {
      alert("Field 'number' can't be empty");
      return;
    }

    const nameExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (nameExist) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, do you want to replace it?`
      );
      if (confirm) {
        axios
          .put(`http://localhost:3001/persons/${nameExist.id}`, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === nameExist.id ? response.data : person
              )
            );
            setNewName("");
            setNewNumber("");
            alert("Number was updated");
          })
          .catch((error) => {
            message(
              `Person '${newName}' was already removed from server`,
              5000
            );
          });
      } else {
        setNewName("");
        setNewNumber("");
        console.log("How you want");
        return;
      }
    } else {
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setNewName("");
          setNewNumber("");
          setPersons(persons.concat(response.data));
          console.log(response);
          <h1>Hello</h1>;
          console.log("Person was added under id:", response.data.id);
        });
      message(`Person ${newName}was added`, 3000);
    }
  };

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log(response);
      setPersons(response.data);
    });
  }, []);

  const getAll = () => {
    axios.get(baseUrl).then((response) => {
      console.log("Answer from server:", response.status);
      console.log("List of all data: ", response.data);
      alert("Dont PRESS IT without need");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <button onClick={getAll}>get all data</button>
      <Filter search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <form onSubmit={handleNameChange}>
        <div>
          name:{" "}
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} setPersons={setPersons} />
    </div>
  );
};

export default App;
