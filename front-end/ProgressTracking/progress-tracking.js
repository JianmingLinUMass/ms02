import { AppControlComponent } from '/ProgressTracking/components/AppControlComponent/AppControlComponent.js' 

const appController = new AppControlComponent();
const appContainer = document.getElementById('app');
appContainer.appendChild(appController.render());

// Fetch an user account and apply it to appController
const account = appController.fetchUserAccount(appController.attribute, appController.value);
await account.then(function(result){
    console.log('post:', result);
    appController.setUserAccountInfoToField(result.user_id, result.username, result.user_email, result.user_password, result.user_profile_path, 
        result.user_level, result.user_point_exercise, result.user_point_quiz);
});

appController.attribute = "user_id";
appController.value = 1;

const attributes = ["username", "user_email", "user_level"];
const values = ["newName123", "newEmailAddress456", 9];

const account2 = appController.readUserAccount(attributes, values, appController.attribute, appController.value);
await account2.then(function(result){
    console.log('put:', result);
    appController.setUserAccountInfoToField(result.user_id, result.username, result.user_email, result.user_password, result.user_profile_path, 
        result.user_level, result.user_point_exercise, result.user_point_quiz);
});

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

            return {user_id: appController.value, username: username, user_email: user_email, user_password: user_password, user_profile_path: user_profile_path,
                    user_level: user_level, user_point_exercise: user_point_exercise, user_point_quiz: user_point_quiz };
        } else {
            // Otherwise, report that no user account is found
            console.log('No user account is available');
            return {user_id: null, username: null, user_email: null, user_password: null, user_profile_path: null,
                    user_level: null, user_point_exercise: null, user_point_quiz: null };
        }
    } catch (err) {
        console.error('Failed to load user account:', err);
        return {user_id: null, username: null, user_email: null, user_password: null, user_profile_path: null,
                user_level: null, user_point_exercise: null, user_point_quiz: null };
    }
}

async function getUserAccount(queryParams = {}) {
    console.log('queryParams:', queryParams);
    try {
        // Fetch user accounts from the server
        const response = await fetch('/userAccounts', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'  // Inform the server we're sending JSON
            },
            body: JSON.stringify(queryParams)  // Convert the queryParams object to a JSON string
        });

        console.log('response in update:', response);
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

            return {user_id: appController.value, username: username, user_email: user_email, user_password: user_password, user_profile_path: user_profile_path,
                    user_level: user_level, user_point_exercise: user_point_exercise, user_point_quiz: user_point_quiz };
        } else {
            // Otherwise, report that no user account is found
            console.log('No user account is available');
            return {user_id: null, username: null, user_email: null, user_password: null, user_profile_path: null,
                    user_level: null, user_point_exercise: null, user_point_quiz: null };
        }
    } catch (err) {
        console.error('Failed to load user account:', err);
        return {user_id: null, username: null, user_email: null, user_password: null, user_profile_path: null,
                user_level: null, user_point_exercise: null, user_point_quiz: null };
    }
}


export { loadUserAccount, getUserAccount };