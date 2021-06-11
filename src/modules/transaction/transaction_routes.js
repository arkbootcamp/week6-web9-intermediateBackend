const express = require('express')
const Route = express.Router()

const transactionController = require('./transaction_controller')

Route.get('/export/:id', transactionController.exportTransaction)

module.exports = Route
