const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        //serve the HTML form
        fs.readFile(path.join(__dirname, '../front-end/index.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Server Error :p');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        // form submission and write to JSON file
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedData = parse(body);
            const inputData = parsedData.inputData;

            //read  data or initialize empty array
            fs.readFile(path.join(__dirname, '../data.json'), 'utf8', (err, data) => {
                const jsonData = err ? [] : JSON.parse(data);
                jsonData.push({ inputData, timestamp: new Date() });

                //write  data to JSON
                fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('500 Server Error :(');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Data saved successfully!');
                    }
                });
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

//start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

