const midtransClient = require('midtrans-client')

module.exports = {
  createTopup: ({ topupId, topupAmount }) => {
    return new Promise((resolve, reject) => {
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-server-KItkJVnyFsZRa-JD5HL_x_DC',
        clientKey: 'SB-Mid-client-lyiBVkXY-ImOkiuQ'
      })
      const parameter = {
        transaction_details: {
          order_id: topupId,
          gross_amount: topupAmount
        },
        credit_card: {
          secure: true
        }
      }
      snap
        .createTransaction(parameter)
        .then((transaction) => {
          // transaction token
          const transactionToken = transaction.token
          console.log('transaction:', transaction)
          console.log('transactionToken:', transactionToken)
          resolve(transaction.redirect_url)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }
}
