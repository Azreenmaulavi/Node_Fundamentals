// 6.Create a node.js file that Insert Multiple Records in "student" table, and display the result object on console.

const mysql=require("mysql")

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

   const query=`INSERT INTO student (name,age,studClass) values ?`

   const values=[
    ['John',20,"fybcs"],
    ['Johnny',21,"sybcs"],
    ['Rahul',22,"tybcs"],
   ]

   connection.query(query,[values],(error,results,fields)=>{
    if(error){
        console.log("Error inserting data into table",error)
    }
    console.log("Data inserted",results.affectedRows);
    console.log("Results Object",results)

    connection.end()
   })
}

)