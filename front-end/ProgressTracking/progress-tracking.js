import { AppControlComponent } from '/ProgressTracking/components/AppControlComponent/AppControlComponent.js' 
import { fetchUserAccount, modifyUserAccount } from '/ProgressTracking/crudOpsOnUserAccountsFrontEnd.js';

// Create the User Page (showing user metrics on the page)
const appController = new AppControlComponent();
const appContainer = document.getElementById('app');
appContainer.appendChild(appController.render());



/* The following is an example to fetch an user account stored in userAccounts.db */ 

const attribute = "username"; // we switch focusing user account by username
const value = localStorage.getItem("storedUsername"); // obtained when user successfully logged in

// Fetch an user account and apply it to appController
const account = fetchUserAccount({attribute, value}); // parameter is an object
await account.then(function(result){
    console.log('post:', result);
    appController.setUserAccountInfoToField(result.username, result.user_email, result.user_password, result.user_profile_path, 
        result.user_level, result.user_point_exercise, result.user_point_quiz);
});




/* The following is an example to modify an user account stored in userAccounts.db */ 

// const attributesToModify = ["user_level", "user_point_exercise", "user_point_quiz"];
// const valuesToModify = [2, 2, 2];

// // Modify an user account
// const account2 = modifyUserAccount({attributesToModify, valuesToModify, attribute, value});
// await account2.then(function(result){
//     console.log('put:', result);
//     appController.setUserAccountInfoToField(result.username, result.user_email, result.user_password, result.user_profile_path, 
//         result.user_level, result.user_point_exercise, result.user_point_quiz);
// });

