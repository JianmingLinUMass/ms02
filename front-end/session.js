document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
      alert('Logging out...');
      const response = await fetch('/logout', { method: 'POST' });
      if (response.ok) {
        localStorage.removeItem('storedUsername');
        alert('Logged out successfully.');
        window.location.href = '/AccountPages/LoginPage/login.html';
      } else {
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred. Please try again.');
    }
  });
  