const express = require('express')
const Route = express.Router()

const transactionController = require('./transaction_controller')

Route.get('/export/:id', transactionController.exportTransaction)
Route.post('/topup', transactionController.postTopUp)
Route.post('/midtrans-notification', transactionController.postMidtransNotif)

module.exports = Route
