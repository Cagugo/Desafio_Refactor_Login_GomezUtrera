document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/sessions/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        if (data.userType === 'admin') {
          window.location.href = '/api/sessions/admin';
        } else if (data.userType === 'user') {
          window.location.href = '/products';
        }
      } else {
        swal('Error', data.error, 'error');
      }
    } catch (error) {
      console.error('Error during login:', error);
      swal('Error', 'Error durante el login', 'error');
    }
  });
});
