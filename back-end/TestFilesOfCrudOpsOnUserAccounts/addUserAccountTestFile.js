// The following code is a template to add user account(s) to userAccounts.db
// It uses defaultUserProfilePath and addUserAccounts() in crudOperationsOnUserAccounts.js

const addAcc = require('../crudOperationsOnUserAccounts.js'); // remember to update the path if this file is not found
const defaultUserProfilePath = addAcc.defaultUserProfilePath;

const hashedPassword = await bcrypt.hash('p2', 10);

// The user account(s) to be added to userAccounts.db
const userAccountsToAdd = [
    {username: 'u2', user_email: 'ea2@gmail.com', user_password: hashedPassword, user_profile_path: defaultUserProfilePath, 
        user_level: 2, user_point_exercise: 2.0, user_point_quiz: 2.0 },
];
// Call addUserAccounts() to add these accounts
addAcc.addUserAccounts(userAccountsToAdd);