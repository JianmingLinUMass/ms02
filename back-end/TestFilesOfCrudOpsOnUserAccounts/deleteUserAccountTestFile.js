// The following code is a template to delete an user account to userAccounts.db
// It uses deleteUserAccount() in crudOperationsOnUserAccounts.js

const delAcc = require('../crudOperationsOnUserAccounts.js'); // remember to update the path if this file is not found
const deleteAttribute = "username";
const deleteValue = "user1";

// Call deleteUserAccount() to delete the user account with attribute of `deleteAttribute` and value of `deleteValue`
delAcc.deleteUserAccount(deleteAttribute, deleteValue);

//node back-end/TestFilesOfCrudOpsOnUserAccounts/deleteUserAccountTestFile.js