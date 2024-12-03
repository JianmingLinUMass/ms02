document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Retrieve input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Send a POST request to the signup endpoint
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, user_email: email, user_password: password }),
        });

        const result = await response.json();
        if (response.ok) {
            // If signup is successful, notify the user and redirect to login
            alert('Signup successful!');
            window.location.href = '../LoginPage/login.html'; // Adjusted relative path
        } else {
            // Display error message
            alert(`Signup failed: ${result.message}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again.');
    }
});
