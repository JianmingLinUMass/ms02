// Normally, this script should not be executed by itself. 
// Instead, other scripts which want to add/delete/modify the userAccounts.db should use methods and variables defined here.
// Examples of adding/deleting/modifying user account is provided in the `TestFilesOfCrudOpsOnUserAccounts` folder

// Reminder: Each account should have the following attributes:
// (username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz)

const Database = require('./database.js');  // Assuming your database.js file is in the same directory
const db = new Database('./back-end/userAccounts.db');  // Path to your SQLite database
const base64Converter = require('./base64.js');
const base64FileConverter = new base64Converter();


/* Variables should be defined here: */

const defaultUserProfilePathURL = 'https://github.com/JianmingLinUMass/ms02/blob/main/front-end/ProgressTracking/components/UserProfileComponent/profile-picture.jpg?raw=true';
const blob = await fetch(defaultUserProfilePathURL).then(r => r.blob());
const base64 = await base64FileConverter.convertFileToBase64(blob);
const defaultUserProfilePath = base64;

/* Functions should be defined here: */

// Function to add user accounts to the database
// Reminder: username (string), user_email (string), user_password (string), user_profile_path (string), 
//           user_level (integer), user_point_exercise (float), user_point_quiz (float)
async function addUserAccounts(userAccountsToAdd) {
    try {
        // Loop through each user account and add it to the database
        for (const ua of userAccountsToAdd) {
            const { username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz } = ua;

            await db.addUserAccount(username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz);  
            console.log(`User account added: "${username}"`);
        }
        console.log('All user accounts have been added successfully!');
    } catch (err) {
        console.error('Error adding user account:', err);
    } finally {
        // Close the database connection when done
        db.db.close();
    }
}

// Function to fetch user account(s) with a specific attribute and value in the database
// Reminder: username (string), user_email (string), user_password (string), user_profile_path (string), 
//           user_level (integer), user_point_exercise (float), user_point_quiz (float)
async function queryUserAccounts(attributes, values) {
    let accounts = null;
    try {
        accounts = await db.queryUserAccounts(attributes, values);  
        console.log(`Fetching User account with attribute: "${attributes}" and value: "${values}"`);
    } catch (err) {
        console.error('Error fetching user account:', err);
    } finally {
        // Close the database connection when done
        db.db.close();
    }
    return accounts;
}

// Function to delete an user account with a specific attribute and value in the database
// Reminder: username (string), user_email (string), user_password (string), user_profile_path (string), 
//           user_level (integer), user_point_exercise (float), user_point_quiz (float)
async function deleteUserAccount(deleteAttribute, deleteValue) {
    try {
        await db.deleteUserAccount(deleteAttribute, deleteValue);  
        console.log(`Deleted User account with attribute: "${deleteAttribute}" and value: "${deleteValue}"`);
    } catch (err) {
        console.error('Error deleting user account:', err);
    } finally {
        // Close the database connection when done
        db.db.close();
    }
}

// Function to modify an user account with attribute of `whereAttribute` and value of `whereValue` in the database.
// The content to be modified is specified by `attributes` and `values`.
// Reminder: username (string), user_email (string), user_password (string), user_profile_path (string), 
//           user_level (integer), user_point_exercise (float), user_point_quiz (float)
async function modifyUserAccount(attributes, values, whereAttribute, whereValue) {
    try {
        await db.modifyUserAccount(attributes, values, whereAttribute, whereValue);  
        console.log(`Modified user account modified with attribute: "${whereAttribute}" and value: "${whereValue}"`);
    } catch (err) {
        console.error('Error modifying user account:', err);
    } finally {
        // Close the database connection when done
        db.db.close();
    }
}


/* Anything defined in this script should be exported using module */
module.exports = {
    defaultUserProfilePath: defaultUserProfilePath, 
    addUserAccounts: addUserAccounts,
    queryUserAccounts: queryUserAccounts,
    deleteUserAccount: deleteUserAccount,
    modifyUserAccount: modifyUserAccount
};