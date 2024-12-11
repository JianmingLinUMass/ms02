const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Database = require('./database.js'); 
const bcrypt = require('bcrypt');
const session = require('express-session');
const base64Converter = require('./base64.js');

const app = express();
const PORT = 3000;

const questionsdbFilePath = path.resolve(__dirname, 'questions.db');
const questionsDatabase = new Database(questionsdbFilePath);

const friendsdbFilePath = path.resolve(__dirname, 'friendDatabase.db');
const friendsDatabase = new Database(friendsdbFilePath)

const base64FileConverter = new base64Converter();

const tasksdbFilePath = path.resolve(__dirname, 'tasks.db');
const tasksDatabase = new Database(tasksdbFilePath);

const theoryDBFilePath = path.resolve(__dirname, 'theory.db')
const theoryDB = new Database(theoryDBFilePath)
// Initialize tasks table
tasksDatabase.createTasksTable().catch(err => {
    console.error('Error creating tasks table:', err);
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 // Configure session
 // Middleware to create a session
 app.use(session({
   secret: '12345',
   resave: false,
   saveUninitialized: false,
   cookie: { secure: false } // Set to true if using HTTPS
 }));

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

       // Store session data
       req.session.user = {
        id: user.id,
        username: user.username
      };

      // Successful login
      res.status(200).json({ message: "Login successful.", redirectUrl: '/Homepage/home-page.html' });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: "Internal server error." });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  if (req.session) {
    // Destroy session
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: "Failed to log out." });
      }
      // Successfully logged out
      res.status(200).json({ message: "Logout successful.", redirectUrl: '/AccountPages/LoginPage/login.html' });
    });
  } else {
    res.status(400).json({ message: "No active session found." });
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
    const questions = await questionsDatabase.queryQuestions(attributes, values);
    res.status(200).json(questions);

  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).send('Failed to fetch questions');
  }
});

//Post to query theory text from the database.

app.post('/blocks', async (req, res) => {
  console.log("Attempting to fetch text");
  try {
    //parsed obj from front end
    const {id, text, unit, block} = req.body;
    const attributes = []
    const values = []

    const queryParams = {id, text, unit, block};

    //split data into list of attributes and values
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        attributes.push(key);
        values.push(value);
      }
    }

    //pass attributes and values into a function that will use them to query the database
    const blocks = await theoryDB.queryTheory(attributes, values);
    res.status(200).json(blocks);

  } catch (err) {
    console.error("Error fetching text:", err);
    res.status(500).send('Failed to fetch text');
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

      // Convert default profile file into base64 
      const defaultUserProfilePath = 'https://github.com/JianmingLinUMass/ms02/blob/main/front-end/ProgressTracking/components/UserProfileComponent/profile-picture.jpg?raw=true';
      const blob = await fetch(defaultUserProfilePath).then(r => r.blob());
      const base64 = await base64FileConverter.convertFileToBase64(blob); // add base64 to userAccounts.db as user_profile_path, instead of defaultUserProfilePath

      // Add the user to the database
      const user_level = 1;
      const user_point_exercise = 0.0;
      const user_point_quiz = 0.0;

      await databaseForUserAccounts.addUserAccount(
          username,
          user_email,
          hashedPassword,
          base64,
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

// pass an object that has query data in the form like: {user_email: "emailaddress456@gmail.com"}.
// This should only fetch one user account, if successful.
app.post('/userAccounts', async (req, res) => {
  console.log("Attempting to fetch user accounts");
  try {
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


/*
Friends Section Starts
*/

// Add a friend
app.post('/friends/add', async (req, res) => {
  console.log('attempting to add a friend')
  const { user1_name, user2_name } = req.body;
  try {
      if (!user1_name || !user2_name) {
          return res.status(400).json({ message: "Both user IDs are required." });
      }

      await friendsDatabase.addFriend(user1_name, user2_name);
      res.status(201).json({ message: "Friendship added successfully." });
  } catch (err) {
      console.error('Error adding friendship:', err);
      res.status(500).json({ message: "Internal server error." });
  }
});

// Remove a friend
app.post('/friends/remove', async (req, res) => {
  console.log('attempting to remove a friend')
  const { user1_name, user2_name } = req.body;
  try {
      if (!user1_name || !user2_name) {
          return res.status(400).json({ message: "Both user IDs are required." });
      }

      await friendsDatabase.removeFriend(user1_name, user2_name);
      res.status(200).json({ message: "Friendship removed successfully." });
  } catch (err) {
      console.error('Error removing friendship:', err);
      res.status(500).json({ message: "Internal server error." });
  }
});

// Fetch all friends for a user
app.post('/friends/get', async (req, res) => {
  console.log('attempting to get all friends')

  console.log(req)
  const { username } = req.body;

  console.log("get friends", username)
  try {
      if (!username) {
          return res.status(400).json({ message: "Username is required." });
      }

      const sql = `
          SELECT user2_name AS friend_name FROM friends WHERE user1_name = ?
          UNION
          SELECT user1_name AS friend_name FROM friends WHERE user2_name = ?;
      `;
      const friends = await friendsDatabase.runCommand(sql, [username, username]);
      res.status(200).json(friends);
  } catch (err) {
      console.error('Error fetching friends:', err);
      res.status(500).json({ message: "Internal server error." });
  }
});

app.post('/friend-requests/send', async (req, res) => {
  console.log('attempting to add a friend request')

  const { sender_name, receiver_name } = req.body;
  
  try {
      if (!sender_name || !receiver_name) {
          return res.status(400).json({ message: "Sender and receiver usernames are required." });
      }

      // Add friend request
      await friendsDatabase.addFriendRequest(sender_name, receiver_name);
      res.status(201).json({ message: "Friend request sent." });
  } catch (err) {
      console.error("Error sending friend request:", err);
      res.status(500).json({ message: "Internal server error." });
  }
});

app.get('/friend-requests/get-all', async (req, res) => {
  console.log('attempting to get all friend requests')
  const { username } = req.query;
  console.log(username)
  try {
      if (!username) {
          return res.status(400).json({ message: "Username is required." });
      }

      // Fetch pending friend requests
      const requests = await friendsDatabase.getFriendRequests(username);
      console.log(requests)
      res.status(200).json(requests);
  } catch (err) {
      console.error("Error fetching friend requests:", err);
      res.status(500).json({ message: "Internal server error." });
  }
});

app.put('/friend-requests/update', async (req, res) => {
  console.log('attempting to update a friend request')

  const { sender_name, recipient_name, newStatus } = req.body;
  try {
      if (!sender_name || !recipient_name || !newStatus) {
          return res.status(400).json({ message: "Request ID and new status are required." });
      }

      if (!['accepted', 'rejected'].includes(newStatus)) {
          return res.status(400).json({ message: "Invalid status. Must be 'accepted' or 'rejected'." });
      }

      // Update friend request status
      await friendsDatabase.updateFriendRequest(sender_name, recipient_name, newStatus);

      if (newStatus === 'accepted'){
        await friendsDatabase.addFriend(sender_name,recipient_name);
      }
      res.status(200).json({ message: `Friend request ${newStatus}.` });
  } catch (err) {
      console.error("Error updating friend request:", err);
      res.status(500).json({ message: "Internal server error." });
  }
});

// Tasks Routes
app.post('/api/tasks', async (req, res) => {
  try {
      const { username, content } = req.body;
      await tasksDatabase.addTask(username, content);
      const tasks = await tasksDatabase.getTasks(username);
      res.status(201).json(tasks);
  } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ message: 'Failed to add task' });
  }
});

app.get('/api/tasks/:username', async (req, res) => {
  try {
      const tasks = await tasksDatabase.getTasks(req.params.username);
      res.json(tasks);
  } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

app.delete('/api/tasks/:taskId', async (req, res) => {
  try {
      await tasksDatabase.deleteTask(req.params.taskId);
      res.json({ message: 'Task deleted successfully' });
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Failed to delete task' });
  }
});

app.patch('/api/tasks/:taskId', async (req, res) => {
  try {
      const { status } = req.body;
      await tasksDatabase.updateTaskStatus(req.params.taskId, status);
      res.json({ message: 'Task updated successfully' });
  } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Failed to update task' });
  }
});

/*
Friends Section Ends
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
