// 10.Create a nodejs express server to list all the employees from the employee table validate response on any REST client like POSTMAN.

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',     // Your MySQL server host
    user: 'root',          // Your MySQL username
    password: '',          // Your MySQL password
    database: 'employee' // Your MySQL database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// API endpoint to list all employees
app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM emp';

    // Query the database to get all employees
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch employees' });
        }

        // Send the results as a JSON response
        res.status(200).json({
            message: 'Employees fetched successfully',
            data: results
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
