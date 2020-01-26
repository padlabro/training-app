export default {
  getData: () => fetch('http://localhost:3000/trainings').then(res => res.json()),
  deleteData: id =>
    fetch(`http://localhost:3000/trainings/${id}`, {
      method: 'DELETE'
    }),
  editData: data =>
    fetch(`http://localhost:3000/trainings/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    }),
  postData: data =>
    fetch(`http://localhost:3000/trainings/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
};
