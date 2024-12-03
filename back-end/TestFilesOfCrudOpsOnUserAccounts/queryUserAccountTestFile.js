// The following code is a template to fetch user account(s) to userAccounts.db
// It uses queryUserAccount() in crudOperationsOnUserAccounts.js

const queAcc = require('../crudOperationsOnUserAccounts.js'); // remember to update the path if this file is not found
const attribute = ["user_id"];
const value = [1];

// Call queryUserAccount() to fetch user account(s) with attribute of `attribute` and value of `value`
const accounts = queAcc.queryUserAccount(attribute, value);
accounts.then(function(result){
    console.log(result)
});