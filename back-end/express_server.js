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

/*
  pass an object that has query data in the form:
  {id: 42, language: "english"}, etc, not all data needs to be present
*/
app.post('/questions', async (req, res) => {
  console.log("Attempting to fetch questions");
  try {
    //need edits for security, just getting it working for now: -loick
    const { id, question,answer,language, category, exception, possible_answers } = req.body;
    const attributes = []
    const values = []

    const queryParams = { id, question, answer, language, category, exception, possible_answers };

    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        attributes.push(key);
        values.push(value);
      }
    }

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

      // Validate required fields
      if (!username || !user_email || !user_password) {
          return res.status(400).json({ message: "All fields are required." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(user_password, 10);

      // Add the user to the database
      const defaultUserProfilePath = 'front-end/ProgressTracking/components/UserProfileComponent/profile-picture.jpg'; // Replace with your default profile picture path
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
    // **TO-Improve: if we can have an `attribute` holding either `user_id` or `user_email`, and can make queryParams = {attribute}, the conversion problem will be much simpler
    const user_id = req.body; 
    const attributes = [];
    const values = [];

    const queryParams = {user_id};
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        attributes.push(key);
        values.push(value.value);
      }
    }

    const userAccounts = await databaseForUserAccounts.queryUserAccounts(attributes, values);
    //const userAccounts = await databaseForUserAccounts.queryUserAccounts([], []); // get all user accounts stored in userAccounts.db
    res.status(200).json(userAccounts);
  } catch (err) {
    console.error("Error fetching user accounts:", err);
    res.status(500).send('Failed to fetch user accounts');
  }
});
/*
 User Account Section Ends
 */

// Catch-all for any requests to serve HTML files
app.get('*', (req, res) => {
  let filePath = path.join(frontEndPath, req.path === '/' ? 'Homepage/home-page.html' : req.path);
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
