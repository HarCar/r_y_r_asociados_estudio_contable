document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registration-form');
    const registrationMessageElement = document.getElementById('registration-message');
  
    registrationForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const newUsername = document.getElementById('new-username').value;
      const newPassword = document.getElementById('new-password').value;
  
      const response = await fetch('/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });
  
      const data = await response.json();
      if (response.ok) {
        registrationMessageElement.style.color = 'green';
        window.location.href = `/bienvenida?username=${newUsername}`;
      } else {
        registrationMessageElement.style.color = 'red';
      }
  
      registrationMessageElement.textContent = data.message;
    });
  });
  