// The following code is a template to fetch user account(s) to userAccounts.db
// It uses queryUserAccount() in crudOperationsOnUserAccounts.js

const queAcc = require('../crudOperationsOnUserAccounts.js'); // remember to update the path if this file is not found
const attribute = ["username"];
const value = ["user1"];

// Call queryUserAccount() to fetch user account(s) with attribute of `attribute` and value of `value`
const accounts = queAcc.queryUserAccounts(attribute, value);
accounts.then(function(result){
    console.log(result)
});