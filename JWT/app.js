// 14.Create a nodejs express server to generate jwt token in the response of login api.

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Secret key for JWT signing
const JWT_SECRET = 'itsMeM@@hi'; // Replace with a strong secret key

// Sample user data (In a real application, this would come from a database)
const users = [
    {
        id: 1,
        username: 'john',
        password: 'password123' // In a real application, passwords should be hashed
    }
];

// POST endpoint for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user in the sample data
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    });

    // Respond with the token
    res.json({ token });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
