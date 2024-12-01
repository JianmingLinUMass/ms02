import { AppControlComponent } from '/ProgressTracking/components/AppControlComponent/AppControlComponent.js' 
import { UserMetricsRepositoryFactory } from '/ProgressTracking/services/UserMetricsRepositoryFactory.js';

const appController = new AppControlComponent();
const appContainer = document.getElementById('app');
appContainer.appendChild(appController.render());

const metricsRepository = UserMetricsRepositoryFactory.get('local');

// Fetch an user account
async function loadUserAccount(queryParams = {}) {
    try {
        // Fetch user accounts from the server
        const response = await fetch('/userAccounts', {
            method: 'POST',  // Use POST instead of GET
            headers: {
                'Content-Type': 'application/json'  // Inform the server we're sending JSON
            },
            body: JSON.stringify(queryParams)  // Convert the queryParams object to a JSON string
        });

        console.log('response:', response);
        // Since queryParams should only contain one attribute: `user_id`, userAccounts should only have one account, if successful
        const userAccounts = await response.json();
        console.log(userAccounts);

        // If the specific user account is found, update the front-end
        if (userAccounts.length > 0) {
            const account = userAccounts[0];
            const username = account.username;
            const user_email = account.user_email;
            const user_password = account.user_password;
            const user_profile_path = account.user_profile_path;
            console.log('username: ', username);
            console.log('user_email: ', user_email);
            console.log('user_password: ', user_password);
            console.log('user_profile_path: ', user_profile_path);
        } else {
            // Otherwise, report that no user account is found
            console.log('No user account is available');
        }
    } catch (err) {
        console.error('Failed to load user account:', err);
    }
}

// Initialize the page by loading an user account
const attribute = "user_id" // load the user with user_id 1
const value = 1
window.onload = loadUserAccount({attribute, value}); // {attribute: "user_id", value: 1}