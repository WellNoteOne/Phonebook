import axios from "axios";

const PersonForm = ({
  persons,
  newName,
  setNewName,
  setNewNumber,
  newNumber,
  setPersons,
}) => {
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
          });
      } else {
        setNewName("");
        setNewNumber("");
        console.log("How you want");
        return;
      }
    }

    axios.post("http://localhost:3001/persons", newPerson).then((response) => {
      setNewName("");
      setNewNumber("");
      setPersons(persons.concat(response.data));
      console.log(response);
      <h1>Hello</h1>;
      console.log("Person was added under id:", response.data.id);
    });
  };

  return (
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
  );
};

export default PersonForm;
