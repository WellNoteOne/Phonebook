import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const baseUrl = "http://localhost:3001/persons";

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
      <button onClick={getAll}>get all data</button>
      <Filter search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} setPersons={setPersons} />
    </div>
  );
};

export default App;
