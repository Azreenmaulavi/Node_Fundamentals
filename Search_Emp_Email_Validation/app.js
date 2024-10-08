const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',     // Replace with your MySQL host
    user: 'root',          // Replace with your MySQL username
    password: '',          // Replace with your MySQL password
    database: 'employee' // Replace with your MySQL database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// GET endpoint to search for an employee by email
app.get('/employee', (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const query = `SELECT * FROM emp WHERE email = ?`;
    
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching employee:', err);
            return res.status(500).json({ error: 'Failed to fetch employee' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.json(results[0]);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
