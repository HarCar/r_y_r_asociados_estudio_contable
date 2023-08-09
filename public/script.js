// script.js
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const messageElement = document.getElementById('message');
  
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        messageElement.style.color = 'green';
        window.location.href = `/bienvenida?username=${username}`;

      } else {
        messageElement.style.color = 'red';
      }
  
      messageElement.textContent = data.message;
    });
  });
  