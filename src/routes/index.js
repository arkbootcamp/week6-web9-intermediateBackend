const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const bookingRouter = require('../modules/booking/booking_routes')
const authRouter = require('../modules/auth/auth_routes')
const transactionRouter = require('../modules/transaction/transaction_routes')

// [1]
// Route.get('/hello', (req, res) => {
//   res.status(200).send('Hello World')
// })

// [2]
Route.use('/movie', movieRouter)
Route.use('/booking', bookingRouter)
Route.use('/auth', authRouter)
Route.use('/transaction', transactionRouter)

module.exports = Route
