// Handle login logic
if (window.location.pathname.endsWith('login.html')) {
    const form = document.getElementById('login-form');
    const errorEl = document.getElementById('error');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorEl.textContent = '';
  
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
  
  // Handle contact info view
  if (window.location.pathname.endsWith('index.html')) {
    const emailToQuery = 'sender@example.com';
    const token = localStorage.getItem('token');
    const errorEl = document.getElementById('error');
  
    async function loadContactInfo() {
      if (!token) {
        errorEl.textContent = 'You must be logged in to view this page.';
        return;
      }
  
      try {
        const res = await fetch(`http://localhost:5000/api/contact-info?email=${emailToQuery}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          errorEl.textContent = data.message || 'Failed to load contact info.';
          return;
        }
  
        document.getElementById('email').textContent = data.email;
        document.getElementById('name').textContent = data.full_name;
        document.getElementById('title').textContent = data.job_title;
        document.getElementById('department').textContent = data.department;
        document.getElementById('phone').textContent = data.phone_number;
  
      } catch (err) {
        errorEl.textContent = 'Error fetching contact data.';
      }
    }
  
    loadContactInfo();
  }
  