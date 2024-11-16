const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Handle static files (CSS, JS, etc.)
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'];
    const extname = path.extname(req.url);
    
    // Check if the file requested is a static file (like CSS, JS, etc.)
    if (staticExtensions.includes(extname)) {
        const filePath = path.join(__dirname, '../front-end', req.url);

        // Set the correct content type based on file extension (NOTE: maybe check in future if js has switch statement and if that would mka ethis easier, prob redundant)
        let contentType = 'text/plain';
        if (extname === '.css') contentType = 'text/css';
        else if (extname === '.js') contentType = 'application/javascript';
        else if (extname === '.png') contentType = 'image/png';
        else if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
        else if (extname === '.gif') contentType = 'image/gif';
        else if (extname === '.svg') contentType = 'image/svg+xml';
        else if (extname === '.ico') contentType = 'image/x-icon';

        // serve the static file(S)
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found (probably incorrect file name)');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
    // get HTML files
    else if (req.method === 'GET') {
        let filePath = path.join(__dirname, '../front-end', req.url === '/' ? 'home-page.html' : req.url);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    // Handle form submission (POST request).
    else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedData = parse(body);
            const inputData = parsedData.inputData;

            // Read or initialize empty data array
            fs.readFile(path.join(__dirname, '../data.json'), 'utf8', (err, data) => {
                const jsonData = err ? [] : JSON.parse(data);
                jsonData.push({ inputData, timestamp: new Date() });

                // Write data back to the JSON file
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
        // Handle 404 for any other routes.
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found (probably a bad file path)');
    }
});

// start  server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
