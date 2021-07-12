const mysql = require('mysql2')
require('dotenv').config()

const dbConfig = {
  host: process.env.DB_HOST, // SERVER DB (CHECK YOUR EMAIL)
  user: process.env.DB_USER, // USERNAME DB (CHECK YOUR EMAIL)
  password: process.env.DB_PASS, // PASSWORD DB (CHECK YOUR EMAIL)
  database: process.env.DB_NAME, // NAME DATABASE
  port: process.env.DB_PORT
}
// const connection = mysql.createConnection(dbConfig)

// connection.connect((error) => {
//   if (error) {
//     console.log(error.code)
//   }
//   console.log("You're now connected...")
// })

// https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
let connection

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig) // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err)
      setTimeout(() => {
        handleDisconnect()
      }, 2000) // We introduce a delay before attempting to reconnect,
    } else {
      console.log("You're now connected...")
    } // to avoid a hot loop, and to allow our node script to
  }) // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on('error', function (err) {
    console.log('db error', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect() // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err // server variable configures this)
    }
  })
}

handleDisconnect()

module.exports = connection
