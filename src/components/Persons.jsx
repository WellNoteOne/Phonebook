import axios from "axios";

const Persons = ({ persons, search, setPersons }) => {
  const personsToShow = persons.filter((person) =>
    person?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const deleting = (id, name) => {
    console.log("Deleted person has id:", id);
    console.log("Name is: ", name);
    const confirmDelete = window.confirm(`You want to delete: ${name}?`);
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/persons/${id}`).then((response) => {
        console.log(response);
        setPersons(persons.filter((p) => p.id !== id));
        alert(`YOU DELETED ${response.data.name}`);
      });
    } else alert(`You saved ${name}`);
  };

  const Name = ({ persons }) => {
    return (
      <li>
        {persons.name} {persons.number}{" "}
        <button onClick={() => deleting(persons.id, persons.name)}>
          delete
        </button>
      </li>
    );
  };

  return (
    <ul>
      {personsToShow.map((persons) => (
        <Name key={persons.id} persons={persons} />
      ))}
    </ul>
  );
};

export default Persons;
