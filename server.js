const express = require('express');
const { verifyCredentials, createUser } = require('./src/database');

const app = express();
const PORT = 8000;

app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Call the verifyCredentials function from the database module
  verifyCredentials(email, password, (error, isValid) => {
    if (error) {
      console.error('Error verifying credentials:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (isValid) {
      console.log('Login successful');
      const response = { isValid: true };
      res.json(response);
    } else {
      console.log('Invalid email or password');
      const response = { isValid: false };
      res.json(response);
    }
  });
});

app.post('/api/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    // Call the createUser function from the database module
    createUser(firstName, lastName, email, password, (error) => {
      if (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      console.log('User created successfully');
      res.status(200).json({ message: 'Signup successful' });
    });
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
