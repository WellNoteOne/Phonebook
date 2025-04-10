import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then((response) => response.data);
};

const deleting = (id, name) => {
  console.log("Deleted person has id:", id);
  console.log("Name is: ", name);
  const confirmDelete = window.confirm(`You want to delete: ${name}?`);
  if (confirmDelete) {
    const request = axios.delete(`http://localhost:3001/persons/${id}`);
    return request.then((response) => {
      console.log(response);
      setPersons(persons.filter((p) => p.id !== id));
      alert(`YOU DELETED ${response.data.name}`);
    });
  } else alert(`You saved ${name}`);
};

export default { getAll, create, update, deleting };
