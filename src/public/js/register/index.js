document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      age: age,
      password: password,
    };

    fetch('/api/sessions/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        if (response.ok) {
          swal('Usuario registrado', 'Loguéate con tu Email y Password', 'success').then(function () {
            window.location.href = '/';
          });
        } else {
          swal('No se pudo realizar el registro', 'Ya existe un usuario con ese correo electrónico', 'error');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});
