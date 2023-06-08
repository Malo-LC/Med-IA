const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Math0623736244',
  database: 'media-db',
});

// Connect to the database
connection.connect((error) => {
    if (error) {
      console.error('Failed to connect to the database:', error);
    } else {
      console.log('Connected to the database');
    }
  });
  
  // Function to check if email and password exist in the database
  function verifyCredentials(email, password, callback) {
    const query = `SELECT * FROM users_data WHERE email = ? AND password = ?`;
    const values = [email, password];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        // If the query returns any results, the credentials are valid
        const isValid = results.length > 0;
        callback(null, isValid);
      }
    });
  }
  
  function createUser(firstName, lastName, email, password, callback) {
    const query = `INSERT INTO users_data (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
    const values = [firstName, lastName, email, password];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    });
  }

  module.exports = {
    verifyCredentials,
    createUser,
  };