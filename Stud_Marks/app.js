// Create a node js server to list all the students having marks greater than 60 using mysq

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',       // MySQL host
    user: 'root',   // MySQL username
    password: '', // MySQL password
    database: 'test'       // Database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// GET endpoint to fetch students with marks greater than 60
app.get('/students/marks-greater-than-60', (req, res) => {
    const sql = 'SELECT * FROM student WHERE marks > 60';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
