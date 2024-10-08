// 5.Create a node.js file that Select all records from the "customers" table, and display the result object on console.

const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',    // Your database host
  user: 'root',         // Your MySQL username
  password: '',         // Your MySQL password
  database: 'employee'  // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
  
  // Query to select all records from the "customers" table
  const query = 'SELECT * FROM emp';
  
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from customers table:', error);
      return;
    }
    
    // Log the results to the console
    console.log('Customer Records:', results);
    
    // Close the connection after querying
    connection.end();
  });
});
