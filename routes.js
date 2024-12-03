const { Router } = require('express')

const router = Router();


// Health check endpoint
router.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

// Route to get all users (example)
router.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ];
    res.json(users);
});

// Route to get a specific user by ID
router.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = { id: userId, name: `User ${userId}` };
    res.json(user);
});

// Route to create a new user
router.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = Date.now(); // Simple ID generation
    res.status(201).json(newUser);
});

// Route to update a user by ID
router.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const updatedUser = req.body;
    updatedUser.id = userId;
    res.json(updatedUser);
});

// Route to delete a user by ID
router.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    res.status(204).send();
});

module.exports = router;