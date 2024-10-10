const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // replace with your MySQL username
  password: '',  // replace with your MySQL password
  database: 'test'  // replace with your MySQL database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Delete student by roll_no and show the remaining students' data in the console
app.delete('/student/:roll_no', (req, res) => {
  const roll_no = req.params.roll_no;

  // Delete the student record
  const deleteQuery = 'DELETE FROM student WHERE id = ?';

  db.query(deleteQuery, [roll_no], (err, deleteResult) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting student');
      return;
    }

    if (deleteResult.affectedRows === 0) {
      res.status(404).send('Student not found');
    } else {
      // Fetch the remaining data after deletion
      const remainingDataQuery = 'SELECT * FROM student';

      db.query(remainingDataQuery, (err, remainingResults) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching remaining students data');
          return;
        }

        // Log the remaining data in the console
        console.log('Remaining students data:', remainingResults);

        // Send the remaining data as the response
        res.send({
          message: `Student with roll_no ${roll_no} deleted successfully.`,
          remainingStudents: remainingResults
        });
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
