// 7.Create a node.js file that Select all records from the "customers" table, and delete the specified record.
 const mysql=require('mysql')

 const connection=mysql.createConnection(
    {
        host:"localhost",
        user:'root',
        password:'',
        database:'test'
    }
);

connection.connect((err)=>{
    if(err){
        console.log("Error Connecting to MySQL",err)
        return
    }
   console.log("Connected to databse")

   // Query to select all records from the "customers" table
  connection.query('SELECT * FROM customer', (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from customers table:', error);
      return;
    }

    // Log all records from the "customers" table
    console.log('All customer records:', results);
    // Specify the customer ID to delete (replace '1' with the actual ID you want to delete)
    const customerIdToDelete = 1;

    // Query to delete a record based on a condition
    connection.query('DELETE FROM customer WHERE id = ?', [customerIdToDelete], (error, deleteResult) => {
      if (error) {
        console.error('Error deleting customer:', error);
        return;
      }

      // Log the result of the deletion
      console.log(`Deleted record with customer ID ${customerIdToDelete}:`, deleteResult);

      // Close the database connection
      connection.end();
    });
});
});