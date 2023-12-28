// Requiring modules
const express = require('express');
const app = express();
const sql = require("msnodesqlv8");
const connectionString = `DSN=abc;`;
const bodyParser = require('body-parser');


// Get request
app.get('/', function (req, res) {


	
    const query = "select * from WheatherApp where RequestID = 1";

sql.query(connectionString, query, (err, rows) => {
    if (err) {
        console.error(err);
       // res.status(500).send("Internal Server Error"); // Send an error response
        res.status(500).json({ error: "Internal Server Error" });

        return;
    }
       
    // Log the rows (for debugging purposes)
    console.log("Query result:", rows);

    // Send the response to the client
    //res.send(rows);
    res.send(rows);

});


});

app.get('/lastid', function (req,res){


    const query = "select max(RequestID) from WheatherApp ";


    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error(err);
           // res.status(500).send("Internal Server Error"); // Send an error response
            res.status(500).json({ error: "Internal Server Error" });
    
            return;
        }
           
        // Log the rows (for debugging purposes)
        console.log("Query result:", rows);
    
        // Send the response to the client
        //res.send(rows);
        res.send(rows);
    
    });


});

app.post('/RequestID:id',function (req,res){
res.send('this is post req is '+ req.params.id);

});

app.use(bodyParser.json());

app.post('/RequestID/:id', function (req, res) { // Extract RequestID from the request parameters
    const requestId = req.params.id;

    // Access the entire payload from the request body
    const requestData = req.body;

    // Process the data as needed
    // For example, you can log it or send a response back to the client
    console.log(`Received data for RequestID ${requestId}:`);
    console.log('Location:', requestData.location);
    console.log('Current:', requestData.current);
    // ... process other fields ...

    // Send a response back to the client
    res.send('Data received successfully');
});

let server = app.listen(8080, function () {
	console.log('Server is listening at port 8080...');
});
