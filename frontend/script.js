// Only bind login logic if we're on the login page
if (window.location.pathname.endsWith('login.html')) {
    const form = document.getElementById('login-form');
    const errorEl = document.getElementById('error');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorEl.textContent = ''; // Reset error
  
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
  
      try {
        const res = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          errorEl.textContent = data.message || 'Login failed.';
          return;
        }
  
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
      } catch (err) {
        errorEl.textContent = 'Error connecting to server.';
      }
    });
  }
  