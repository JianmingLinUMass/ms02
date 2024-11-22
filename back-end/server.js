const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const Database = require('./database.js'); // Import the Database class

const PORT = 3000;

// Initialize the database
const dbFilePath = path.resolve(__dirname, 'questions.db');
const database = new Database(dbFilePath);

// // Create the questions table
// database.createQuestionsTable().then(() => {
//     console.log('Questions table initialized.');
// }).catch(err => {
//     console.error('Error initializing questions table:', err);
// });

const server = http.createServer(async (req, res) => {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'];
    const extname = path.extname(req.url);

    // Handle static files
    if (staticExtensions.includes(extname)) {
        const filePath = path.join(__dirname, '../front-end', req.url);
        let contentType = 'text/plain';

        if (extname === '.css') contentType = 'text/css';
        else if (extname === '.js') contentType = 'application/javascript';
        else if (extname === '.png') contentType = 'image/png';
        else if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
        else if (extname === '.gif') contentType = 'image/gif';
        else if (extname === '.svg') contentType = 'image/svg+xml';
        else if (extname === '.ico') contentType = 'image/x-icon';

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    } 

    //questions

    else if (req.method === 'GET' && req.url === '/questions') {
        console.log("attempting to fetch questions")

        try {
            const questions = await database.getAllQuestions();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(questions));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Failed to fetch questions');
        }
    } 
    // Serve HTML files
    else if (req.method === 'GET') {
        let filePath = path.join(__dirname, '../front-end', req.url === '/' ? 'Homepage/home-page.html' : req.url);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found (probably a bad file path)');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } 
    // Handle POST requests to /add-question
    // else if (req.method === 'POST' && req.url === '/add-question') {
    //     let body = '';
    //     req.on('data', chunk => {
    //         body += chunk.toString();
    //     });

    //     req.on('end', async () => {
    //         const parsedData = querystring.parse(body);
    //         const { question, answer, category } = parsedData;

    //         try {
    //             await database.addQuestion(question, answer, category);
    //             res.writeHead(200, { 'Content-Type': 'text/plain' });
    //             res.end('Question added successfully!');
    //         } catch (err) {
    //             res.writeHead(500, { 'Content-Type': 'text/plain' });
    //             res.end('Failed to add question');
    //         }
    //     });
    // } 
    // Handle GET requests to /questions

    // Handle 404 for other routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found (probably a wrong file path)');
    }
});


// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
