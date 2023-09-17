
const client = require("./config/config.js");
const express = require("express");
const path = require('path')
const app = express();
const fetchData = require('./fetchData.js');
//middleware
app.use(express.json());


app.use(express.static(path.join(__dirname,'public')))
//fetch data
// if wan't to add data invoke below funciton;
// fetchData()


const tradedataSchema = "TradeDataSchema"; // You can change this to the desired schema name
const tradedatatable = "TradeDataTable";
// Define a route to fetch data from PostgreSQL and send it as JSON
app.get('/api/fetch-data', (req, res) => {
    const query = `SELECT * FROM ${tradedataSchema}.${tradedatatable}`; // Replace with your SQL query
  
    client.query(query, (error, result) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data.' });
      } else {
        const data = result.rows; // Extract the data from the query result
        res.json(data); // Send the data as JSON
      }
    });
  });


app.listen(8080, () => {
  console.log("Sever is now listening at port 8080");
});
