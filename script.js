
function createEditButton(userId, name, date, time) {
  const editButton = document.createElement('span');
  editButton.className = 'edit-button';
  editButton.innerHTML = '&#9998;';
  editButton.addEventListener('click', function() {
    populateFormForEdit(userId, name, date, time);
  });
  return editButton;
}

function populateFormForEdit(userId, name, date, time) {
  document.getElementById('userId').value = userId;
  document.getElementById('name').value = name;
  document.getElementById('date').value = date;
  document.getElementById('time').value = time;
}


document.getElementById('appointmentForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const appointment = {
    name: name,
    date: date,
    time: time
  };

  let requestPromise;

  if (userId) {

    requestPromise = axios.put(`https://crudcrud.com/api/your-unique-identifier/${userId}`, appointment);
  } else {
  
    requestPromise = axios.post('https://crudcrud.com/api/your-unique-identifier', appointment);
  }

  requestPromise
    .then(response => {
      console.log('Appointment stored successfully:', response.data);
      alert('Appointment saved successfully!');
      document.getElementById('appointmentForm').reset();
      if (userId) {
        updateUserDetail(userId, name, date, time);
      } else {
        addUserDetail(response.data._id, name, date, time);
      }
    })
    .catch(error => {
      console.error('Error storing appointment:', error);
      alert('Failed to save appointment. Please try again.');
    });
});


function updateUserDetail(userId, name, date, time) {
  const userElement = document.getElementById(userId);
  if (userElement) {
    const userDetails = userElement.querySelector('.user-info');
    userDetails.querySelector('p:nth-child(1)').textContent = name;
    userDetails.querySelector('p:nth-child(2)').textContent = date;
    userDetails.querySelector('p:nth-child(3)').textContent = time;
  }
}


axios.get('https://crudcrud.com/api/your-unique-identifier')
  .then(response => {
    const appointments = response.data;
    for (const appointment of appointments) {
      addUserDetail(appointment._id, appointment.name, appointment.date, appointment.time);
    }
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });
