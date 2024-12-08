// An example showing how to modify the specific user account using `attribute`=username

/** Note: YOU HAVE TO LOGIN SUCCESSFULLY IN ORDER TO MAKE THE FOLLOWING SCRIPT WORK **/

import { modifyUserAccount } from '../crudOpsOnUserAccountsFrontEnd.js';

// Note: Please specify the user account ONLY using "username"
const attribute = "username"; // DON'T CHANGE THIS

// Use this value to focus on the current active user account (*has to login successfully first*)
// localStorage.getItem("storedUsername") will only work if the login is successful, therefore please login, then test your code
const value = localStorage.getItem("storedUsername");

// Specify the attributes you want to modify, along with the respective values
// Reminder: all attributes in an user account: 
//   username (string), user_email (string), user_password (string), user_profile_path (string), 
//   user_level (integer), user_point_exercise (float), user_point_quiz (float)

const attributesToModify = ["user_level", "user_point_exercise", "user_point_quiz"];
const valuesToModify = [2, 2, 2];

// Modify an user account
const account = modifyUserAccount(attributesToModify, valuesToModify, attribute, value);
await account.then(function(result){
    /* You can access fetched account ONLY in this function. The fetched account will not work outside this function. */

    // result will return the updated user account
    // You can access it like this:
    console.log('fetched account:', result);
    console.log('username:', result.username);
    console.log('user_email:', result.user_email);
    console.log('user_password:', result.user_password);   
    console.log('user_profile_path:', result.user_profile_path);
    console.log('user_level:', result.user_level);    
    console.log('user_point_exercise:', result.user_point_exercise);
    console.log('user_point_quiz:', result.user_point_quiz);

    /* Beyond this function, you can no longer access the "account" variable defined here */
});