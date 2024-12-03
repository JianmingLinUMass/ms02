// The following code is a template to add user account(s) to userAccounts.db
// It uses defaultUserProfilePath and addUserAccounts() in crudOperationsOnUserAccounts.js

const addAcc = require('../crudOperationsOnUserAccounts.js'); // remember to update the path if this file is not found
const defaultUserProfilePath = addAcc.defaultUserProfilePath;

// The user account(s) to be added to userAccounts.db
const userAccountsToAdd = [
    {username: 'username2', user_email: 'useremail2@gmail.com', user_password: 'password2', user_profile_path: defaultUserProfilePath, 
        user_level: 2, user_point_exercise: 5.5, user_point_quiz: 7.0 },
];
// Call addUserAccounts() to add these accounts
addAcc.addUserAccounts(userAccountsToAdd);