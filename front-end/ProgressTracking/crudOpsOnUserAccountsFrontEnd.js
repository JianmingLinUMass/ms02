// Fetch an user account
async function fetchUserAccount(queryParams = {}) { // parameter is an object
    console.log('queryParams in fetchUserAccount():', queryParams);
    try {
        // Fetch user accounts from the server
        const response = await fetch('/userAccounts', {
            method: 'POST',  // Use POST instead of GET
            headers: {
                'Content-Type': 'application/json'  // Inform the server we're sending JSON
            },
            body: JSON.stringify(queryParams)  // Convert the queryParams object to a JSON string
        });

        console.log('response in fetchUserAccount():', response);
        // queryParams should only contain one attribute: `user_id` or `user_email`
        const userAccounts = await response.json();
        console.log(userAccounts);

        // The specific user account is found
        if (userAccounts.length > 0) {
            const account = userAccounts[0];
            const user_id = account.user_id;
            const username = account.username;
            const user_email = account.user_email;
            const user_password = account.user_password;
            const user_profile_path = account.user_profile_path;
            const user_level = account.user_level;
            const user_point_exercise = account.user_point_exercise;
            const user_point_quiz = account.user_point_quiz;

            return {user_id: user_id, username: username, user_email: user_email, user_password: user_password, user_profile_path: user_profile_path,
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

// Modify an user account
async function modifyUserAccount(attributes, values, attribute, value) {
    console.log('attributes in modifyUserAccount():', attributes);
    try {
        // Modify user account from the server
        const response = await fetch('/userAccounts', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'  // Inform the server we're sending JSON
            },
            body: JSON.stringify({attributes, values, attribute, value}) 
        });

        console.log('response in modifyUserAccount():', response);
        const userAccounts = await response.json();
        console.log(userAccounts);

        // The specific user account is found
        if (userAccounts.length > 0) {
            const account = userAccounts[0];
            const user_id = account.user_id
            const username = account.username;
            const user_email = account.user_email;
            const user_password = account.user_password;
            const user_profile_path = account.user_profile_path;
            const user_level = account.user_level;
            const user_point_exercise = account.user_point_exercise;
            const user_point_quiz = account.user_point_quiz;

            return {user_id: user_id, username: username, user_email: user_email, user_password: user_password, user_profile_path: user_profile_path,
                    user_level: user_level, user_point_exercise: user_point_exercise, user_point_quiz: user_point_quiz };
        } else {
            // Otherwise, report that no user account is found
            console.log('No user account is available');
            return {user_id: null, username: null, user_email: null, user_password: null, user_profile_path: null,
                    user_level: null, user_point_exercise: null, user_point_quiz: null };
        }
    } catch (err) {
        console.error('Failed to modify user account:', err);
        return {user_id: null, username: null, user_email: null, user_password: null, user_profile_path: null,
                user_level: null, user_point_exercise: null, user_point_quiz: null };
    }
}

// Modify an user account
async function modifyUserPasswordOnly(attributes, values, attribute, value) {
    // Note: attributes should only be ["user_password"]
    //       values should be a [plain password], where plain password is obtained from user input (when changing password)
    //       attribute should only be "username"
    //       value should be the username of the current focusing user account
    console.log('attributes in modifyUserPasswordOnly():', attributes);
    try {
        // Modify user account from the server
        const response = await fetch('/changeUserPassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'  // Inform the server we're sending JSON
            },
            body: JSON.stringify(attributes, values, attribute, value)  // Convert the queryParams object to a JSON string
        });

        console.log('response in modifyUserPasswordOnly():', response);
        const userAccounts = await response.json();
        console.log(userAccounts);

        // The specific user account is found
        if (userAccounts.length > 0) {
            const account = userAccounts[0];
            const user_id = account.user_id
            const username = account.username;
            const user_email = account.user_email;
            const user_password = account.user_password;
            const user_profile_path = account.user_profile_path;
            const user_level = account.user_level;
            const user_point_exercise = account.user_point_exercise;
            const user_point_quiz = account.user_point_quiz;

            return {user_id: user_id, username: username, user_email: user_email, user_password: user_password, user_profile_path: user_profile_path,
                    user_level: user_level, user_point_exercise: user_point_exercise, user_point_quiz: user_point_quiz };
        } else {
            // Otherwise, report that no user account is found
            console.log('No user account is available');
            return {user_id: null, username: null, user_email: null, user_password: null, user_profile_path: null,
                    user_level: null, user_point_exercise: null, user_point_quiz: null };
        }
    } catch (err) {
        console.error('Failed to modify user account:', err);
        return {user_id: null, username: null, user_email: null, user_password: null, user_profile_path: null,
                user_level: null, user_point_exercise: null, user_point_quiz: null };
    }
}

export { fetchUserAccount, modifyUserAccount, modifyUserPasswordOnly };
