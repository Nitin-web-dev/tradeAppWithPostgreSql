const client = require("./config/config.js");
const axios = require("axios");
// Define the schema name and table name

const fetchData = () => {
  const tradedataSchema = "TradeDataSchema"; // You can change this to the desired schema name
  const tradedatatable = "TradeDataTable"; // Replace with your desired table name

  // Define the SQL query to create the schema and table
  const createSchemaAndTableQuery = `
  CREATE SCHEMA IF NOT EXISTS ${tradedataSchema};
  
  CREATE TABLE IF NOT EXISTS ${tradedataSchema}.${tradedatatable} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last   VARCHAR(50) NOT NULL,
    buy    VARCHAR(50) NOT NULL,
    sell   VARCHAR(50) NOT NULL,
    volume VARCHAR(50) NOT NULL,
    base_unit VARCHAR(50) NOT NULL
  );
`;

  client.query(createSchemaAndTableQuery, (error, result) => {
    if (error) {
      console.error("Error creating schema and table:", error);
    } else {
      console.log("Schema and table created successfully.");
    }

    // Don't forget to release the client when you're done.
    //   client.end();
  });

  // Define the URL of the API endpoint you want to fetch data from
  const apiUrl = "https://api.wazirx.com/api/v2/tickers";

  // Fetch data from the API
  axios
    .get(apiUrl)
    .then((response) => {
      const resData = response.data; // The fetched data
      const data = Object.values(resData);

      // Sort the data by the "sell" value in descending order
      const sortedTickers = data.sort((a, b) => b.sell - a.sell);

      // Get the top 10 data points
      const top10Data = sortedTickers.slice(0, 10);
      // Call a function to insert the data into the database
      for (let i = 0; i < top10Data.length; i++) {
        console.log(top10Data[i]);
        insertDataIntoDatabase(top10Data[i]);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });

  function insertDataIntoDatabase(data) {
    // console.log(data)

    const result = [data];
    result.forEach((v) => {
      let { name, last, buy, sell, volume, base_unit } = v;

      // console.log(name);

      client.query(
        `INSERT INTO ${tradedataSchema}.${tradedatatable}
        (name, last, buy, sell, volume, base_unit) 
 
        VALUES('${name}','${last}','${buy}','${sell}','${volume}','${base_unit}')`,

        (error, result) => {
          if (error) {
            console.error("Error inserting data:", error.message);
          } else {
            console.log("Data inserted successfully.");
          }
        }
      );
    });
  }
};

module.exports = fetchData;
