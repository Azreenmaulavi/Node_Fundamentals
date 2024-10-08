// 9.Create a node js express server to provide register REST API validate response on any REST client like POSTMAN


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Simulated user storage (for demo purposes, this should be a database)
const users = [];

// Registration API endpoint
app.post('/register', (req, res) => {
  const { email, password, name } = req.body;

  // Simple validation: check if all required fields are provided
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required: name, email, and password' });
  }

  // Check if password length is sufficient (for simplicity, no regex)
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Check if the user already exists (by email)
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Add the new user to the users array
  const newUser = { email, password, name };
  users.push(newUser);

  // Send success response
  return res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


