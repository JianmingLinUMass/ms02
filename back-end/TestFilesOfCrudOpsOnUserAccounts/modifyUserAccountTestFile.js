// The following code is a template to modify an user account to userAccounts.db
// It uses modifyUserAccount() in crudOperationsOnUserAccounts.js

const modAcc = require('../crudOperationsOnUserAccounts.js'); // remember to update the path if this file is not found
const attributes = ["username", "user_email", "user_level"];
const values = ["newName", "newEmailAddress@gmail.com", 10];
const whereAttribute = "user_id";
const whereValue = 1;

// Call modifyUserAccount() to modify the user account with attribute of `deleteAttribute` and value of `deleteValue`.
// The content to be modified is specified by `attributes` and `values`.
modAcc.modifyUserAccount(attributes, values, whereAttribute, whereValue);