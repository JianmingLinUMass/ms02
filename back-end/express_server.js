const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Database = require('./database.js'); 
const bcrypt = require('bcrypt');


const app = express();
const PORT = 3000;

const dbFilePath = path.resolve(__dirname, 'questions.db');
const database = new Database(dbFilePath);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Configure session
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true if using HTTPS
// }));

// Serve static files from the front-end directory
const frontEndPath = path.join(__dirname, '../front-end');
app.use(express.static(frontEndPath));

// Make sure Express serves JavaScript files with the correct MIME type
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Redirect to login page by default
app.get('/', (req, res) => {
  res.redirect('/AccountPages/LoginPage/login.html'); // Adjusted path for login page
});

// Login validation endpoint
app.post('/login', async (req, res) => {
  try {
      const { username, user_password } = req.body;

      // Validate fields
      if (!username || !user_password) {
          return res.status(400).json({ message: "Username and password are required." });
      }

      // Query the database for the user
      const users = await databaseForUserAccounts.queryUserAccounts(['username'], [username]);
      if (users.length === 0) {
          return res.status(400).json({ message: "Invalid username or password." });
      }

      const user = users[0];

      // Compare hashed passwords
      const passwordMatch = await bcrypt.compare(user_password, user.user_password);
      if (!passwordMatch) {
          return res.status(400).json({ message: "Invalid username or password." });
      }

      // Successful login
      res.status(200).json({ message: "Login successful.", redirectUrl: '/Homepage/home-page.html' });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: "Internal server error." });
  }
});


/*
  Post from front end to query questions based on attributes of an object.

  pass an object that has query data in the form:
  {id: 42, language: "english"}, etc, not all data needs to be present

*/
app.post('/questions', async (req, res) => {
  console.log("Attempting to fetch questions");
  try {
    //will need edits for security, just getting it working for now: -loick

    //parsed obj from front end
    const { id, question,answer,language, category, exception, possible_answers } = req.body;
    const attributes = []
    const values = []

    const queryParams = { id, question, answer, language, category, exception, possible_answers };

    //split data into list of attributes and values
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        attributes.push(key);
        values.push(value);
      }
    }

    //pass attributes and values into a function that will use them to query the database.
    const questions = await database.queryQuestions(attributes, values);
    res.status(200).json(questions);

  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).send('Failed to fetch questions');
  }
});

/*
 User Account Section Starts
 */
const dbFilePathForUserAccounts = path.resolve(__dirname, 'userAccounts.db');
const databaseForUserAccounts = new Database(dbFilePathForUserAccounts);

app.post('/signup', async (req, res) => {
  try {
      const { username, user_email, user_password } = req.body;

      // Validate fields
      if (!username || !user_email || !user_password) {
          return res.status(400).json({ message: "All fields are required." });
      }

      // Check if the username exists
      const existingUsername = await databaseForUserAccounts.queryUserAccounts(['username'], [username]);
      if (existingUsername && existingUsername.length > 0) {
          return res.status(400).json({ message: "Username is already in use." });
      }

      // Check if the email exists
      const existingUsers = await databaseForUserAccounts.queryUserAccounts(['user_email'], [user_email]);
      if (existingUsers && existingUsers.length > 0) {
          return res.status(400).json({ message: "Email is already in use." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(user_password, 10);

      // Add the user to the database
      const defaultUserProfilePath = 'https://github.com/JianmingLinUMass/ms02/blob/main/front-end/ProgressTracking/components/UserProfileComponent/profile-picture.jpg?raw=true';
      const user_level = 1;
      const user_point_exercise = 0.0;
      const user_point_quiz = 0.0;

      await databaseForUserAccounts.addUserAccount(
          username,
          user_email,
          hashedPassword,
          defaultUserProfilePath,
          user_level,
          user_point_exercise,
          user_point_quiz
      );

      res.status(201).json({ message: "User account created successfully." });
  } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).json({ message: "Internal server error." });
  }
});

// pass an object that has query data in the form: {user_id: 1} or {user_email: "emailaddress456@gmail.com"}. The attribute has to be either `user_id` or `user_email`.
// This should only fetch one user account, if successful. (assuming either the id or the email address is unique)
app.post('/userAccounts', async (req, res) => {
  console.log("Attempting to fetch user accounts");
  try {
    // To fetch the user account using `user_email`, replace each initialization/appearance from `user_id` to `user_email`
    // Modify `user_id` here and `user_id` on the top of `progress-tracking.js`
    // const user_id = req.body; 
    // const attributes = [];
    // const values = [];

    // const queryParams = {user_id};
    // for (const [key, value] of Object.entries(queryParams)) {
    //   if (value) {
    //     attributes.push(key);
    //     values.push(value.value);
    //   }
    // }

    // req.body should contain an object of type {attribute: , value: }
    const bo = req.body;
    const attribute = bo.attribute;
    const value = bo.value;
    console.log('body:', bo)
    console.log('attribute:', attribute)
    console.log('value:', value)

    const userAccounts = await databaseForUserAccounts.queryUserAccounts([attribute], [value]);
    res.status(200).json(userAccounts);
  } catch (err) {
    console.error("Error fetching user accounts:", err);
    res.status(500).send('Failed to fetch user accounts');
  }
});

app.put('/userAccounts', async (req, res) => {
  console.log("Attempting to update user accounts");
  try {
    // req.body should contain an object of type {attribute: , value: }
    const bo = req.body;
    const attributes = bo.attributes;
    const values = bo.values;
    const whereAttribute = bo.attribute;
    const whereValue = bo.value;
    console.log('body:', bo)
    console.log('attributes:', attributes)
    console.log('values:', values)
    console.log('attribute:', whereAttribute)
    console.log('value:', whereValue)

    const userAccounts = await databaseForUserAccounts.modifyUserAccount(attributes, values, whereAttribute, whereValue);
    res.status(200).json(userAccounts);
  } catch (err) {
    console.error("Error updating user accounts:", err);
    res.status(500).send('Failed to update user accounts');
  }
});

app.put('/changeUserPassword', async (req, res) => {
  console.log("Attempting to update user password");
  try {
    // req.body should contain an object of type {attribute: , value: }
    const bo = req.body;
    const attributes = bo.attributes; // should be ["user_password"] only
    const values = bo.values; // should be a [plain password], where plain password is obtained from user input (when changing password)
    const whereAttribute = bo.attribute; // should be "username"; used to focus on current user account
    const whereValue = bo.value; // should be the username of current focusing user account
    console.log('body:', bo)
    console.log('attributes:', attributes)
    console.log('values:', values)
    console.log('attribute:', whereAttribute)
    console.log('value:', whereValue)

    const user_password = values[0]; // obtain user plain password
    const hashedPassword = await bcrypt.hash(user_password, 10); // hash the password
    const userAccounts = await databaseForUserAccounts.modifyUserAccount(attributes, [hashedPassword], whereAttribute, whereValue); // store the hashed password to userAccounts.db
    res.status(200).json(userAccounts);
  } catch (err) {
    console.error("Error updating user password:", err);
    res.status(500).send('Failed to update user password');
  }
});
/*
 User Account Section Ends
 */

// Catch-all for any requests to serve HTML files
app.get('*', (req, res) => {
  //initially put users on login page
  let filePath = path.join(frontEndPath, req.path === '/' ? 'AccountPages/LoginPage/login.html' : req.path);
  res.sendFile(filePath, err => {
    if (err) {
      console.error("Error serving file:", err);
      res.status(404).send('404 Not Found (probably a bad file path)');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
