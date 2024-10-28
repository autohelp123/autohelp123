// app.js

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for the homepage
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route to get all users (example)
app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ];
    res.json(users);
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = { id: userId, name: `User ${userId}` };
    res.json(user);
});

// Route to create a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = Date.now(); // Simple ID generation
    res.status(201).json(newUser);
});

// Route to update a user by ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const updatedUser = req.body;
    updatedUser.id = userId;
    res.json(updatedUser);
});

// Route to delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
