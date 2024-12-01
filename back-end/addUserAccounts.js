const Database = require('./database.js');  // Assuming your database.js file is in the same directory
const db = new Database('./userAccounts.db');  // Path to your SQLite database

const defaultUserProfilePath = 'https://github.com/JianmingLinUMass/ms02/blob/main/front-end/ProgressTracking/components/UserProfileComponent/profile-picture.jpg?raw=true'

// User accounts you want to insert
// (username, user_email, user_password, user_profile_path)
const userAccountsToAdd = [
    {username: 'username123', user_email: 'emailaddress456@gmail.com', user_password: 'password789', user_profile_path: defaultUserProfilePath}
];

// Function to add user accounts to the database

// username (string), user_email (string), user_password (string), user_profile_path (string)
async function addUserAccounts() { // If not modifying the database, this function will not be called
    try {
        // Loop through each user account and add it to the database
        for (const ua of userAccountsToAdd) {
            const { username, user_email, user_password, user_profile_path } = ua;

            await db.addUserAccount(username, user_email, user_password, user_profile_path);  
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

// Run the function
addUserAccounts();
