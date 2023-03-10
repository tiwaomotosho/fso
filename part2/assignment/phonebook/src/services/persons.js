import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const url = `http://localhost:3001/persons/${id}`;

  return axios
    .delete(url)
    .then((response) => {
      console.log(`Note with id ${id} was deleted successfully.`);
    })
    .catch((error) => {
      alert(`Error deleting note with id ${id}: ${error}`);
    });
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  deletePerson: deletePerson,
};
