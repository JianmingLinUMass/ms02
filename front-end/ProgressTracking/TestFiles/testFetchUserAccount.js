// An example showing how to fetch the specific user account using `attribute`=username

/** Note: YOU HAVE TO LOGIN SUCCESSFULLY IN ORDER TO MAKE THE FOLLOWING SCRIPT WORK **/

import { fetchUserAccount } from '../crudOpsOnUserAccountsFrontEnd.js';

// Note: Please fetch the user account ONLY using "username"
const attribute = "username"; // DON'T CHANGE THIS

// Use this value to focus on the current active user account (*has to login successfully first*)
// localStorage.getItem("storedUsername") will only work if the login is successful, therefore please login, then test your code
const value = localStorage.getItem("storedUsername");

// Fetch an user account
const account = fetchUserAccount({attribute, value}); // parameter is an object
await account.then(function(result){
    /* You can access fetched account ONLY in this function. The fetched account will not work outside this function. */

    // result will have a return type of: user_id, username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz
    // You can access them like this:
    console.log('fetched account:', result);
    console.log('user_id:', result.user_id);
    console.log('username:', result.username);
    console.log('user_email:', result.user_email);
    console.log('user_password:', result.user_password);   
    console.log('user_profile_path:', result.user_profile_path);
    console.log('user_level:', result.user_level);    
    console.log('user_point_exercise:', result.user_point_exercise);
    console.log('user_point_quiz:', result.user_point_quiz);

    /* Beyond this function, you can no longer access the "account" variable defined here */
});