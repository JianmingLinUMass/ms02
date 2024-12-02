import { AppControlComponent } from '/ProgressTracking/components/AppControlComponent/AppControlComponent.js' 


// Load the first user account here, and initialize appController with the returned values
const attribute = "user_id" // here we use `user_id` to retrieve the first user account
const value = 1; // load the user account with user_id 1
const { user_id, username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz } = await loadUserAccount({attribute, value});

const appController = new AppControlComponent(user_id, username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz);
const appContainer = document.getElementById('app');
appContainer.appendChild(appController.render());

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
        // queryParams should only contain one attribute: `user_id` or `user_email`
        const userAccounts = await response.json();
        console.log(userAccounts);

        // The specific user account is found
        if (userAccounts.length > 0) {
            const account = userAccounts[0];
            const username = account.username;
            const user_email = account.user_email;
            const user_password = account.user_password;
            const user_profile_path = account.user_profile_path;
            const user_level = account.user_level;
            const user_point_exercise = account.user_point_exercise;
            const user_point_quiz = account.user_point_quiz;

            // console.log('In loadUserAccount()')
            // console.log('username: ', username);
            // console.log('user_email: ', user_email);
            // console.log('user_password: ', user_password);
            // console.log('user_profile_path: ', user_profile_path);
            // console.log('user_level: ', user_level);
            // console.log('user_point_exercise: ', user_point_exercise);
            // console.log('user_point_quiz: ', user_point_quiz);
            // console.log('');

            return {user_id: value, username: username, user_email: user_email, user_password: user_password, user_profile_path: user_profile_path,
                    user_level: user_level, user_point_exercise: user_point_exercise, user_point_quiz: user_point_quiz };
        } else {
            // Otherwise, report that no user account is found
            console.log('No user account is available');
            return {user_id: value, username: null, user_email: null, user_password: null, user_profile_path: null,
                    user_level: null, user_point_exercise: null, user_point_quiz: null };
        }
    } catch (err) {
        console.error('Failed to load user account:', err);
        return {user_id: value, username: null, user_email: null, user_password: null, user_profile_path: null,
                user_level: null, user_point_exercise: null, user_point_quiz: null };
    }
}

// // Initialize the page by loading an user account
// const attribute = "user_id" // load the user with user_id 1
// const value = 1
// window.onload = loadUserAccount({attribute, value}); // {attribute: "user_id", value: 1}

export { loadUserAccount };