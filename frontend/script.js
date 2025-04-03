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

  // Handle contact-info view logic if on index.html
if (window.location.pathname.endsWith('index.html')) {
    const emailToQuery = 'sender@example.com'; // Simulated sender email
    const token = localStorage.getItem('token');
    const errorEl = document.getElementById('error');
  
    if (!token) {
      errorEl.textContent = 'You must be logged in to view this page.';
      return;
    }
  
    fetch(`http://localhost:5000/api/contact-info?email=${emailToQuery}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          errorEl.textContent = data.message;
          return;
        }
  
        document.getElementById('email').textContent = data.email;
        document.getElementById('name').textContent = data.full_name;
        document.getElementById('title').textContent = data.job_title;
        document.getElementById('department').textContent = data.department;
        document.getElementById('phone').textContent = data.phone_number;
      })
      .catch(() => {
        errorEl.textContent = 'Failed to fetch contact information.';
      });
  }
  
  