const {Client} = require('pg')


const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'admin@123',
    database: 'tradeApp'
})

client.connect()
.then(() => {
    // If the connection is successful
    console.log('Connected to PostgreSQL database');
    // client.end(); // Close the connection
  })
  .catch(error => {
    // If there's an error connecting to the database
    console.error('Error connecting to PostgreSQL:', error);
  });
module.exports = client;