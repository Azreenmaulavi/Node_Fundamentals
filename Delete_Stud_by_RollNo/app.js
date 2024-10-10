const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // replace with your MySQL username
  password: '',  // replace with your MySQL password
  database: 'test'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Delete student by roll_no and show the student's data in the console
app.delete('/student/:roll_no', (req, res) => {
  const roll_no = req.params.roll_no;

  // First, fetch the student's data before deleting
  const selectQuery = 'SELECT * FROM student';

  db.query(selectQuery, [roll_no], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching student data');
      return;
    }

    if (result.length === 0) {
      res.status(404).send('Student not found');
    } else {
      // Log the student's data before deletion
      console.log('Student data to be deleted:', result[0]);

      // Proceed with deletion
      const deleteQuery = 'DELETE FROM student WHERE id = ?';

      db.query(deleteQuery, [roll_no], (err, deleteResult) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error deleting student');
          return;
        }

        res.send(`Student with roll_no ${roll_no} deleted successfully.`);
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
