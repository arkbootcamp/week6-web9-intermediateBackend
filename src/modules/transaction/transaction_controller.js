const helper = require('../../helpers/wrapper')
const ejs = require('ejs')
const pdf = require('html-pdf')
const path = require('path')
const transactionModel = require('./transaction_model')
const midtransClient = require('midtrans-client')

module.exports = {
  exportTransaction: async (req, res) => {
    try {
      const { id } = req.params
      const fileName = `${id}.pdf`
      const result = {
        senderName: 'Bagus',
        receiverName: 'Timo',
        students: [
          {
            name: 'Joy',
            email: 'joy@example.com',
            city: 'New York',
            country: 'USA'
          },
          {
            name: 'John',
            email: 'John@example.com',
            city: 'San Francisco',
            country: 'USA'
          },
          {
            name: 'Clark',
            email: 'Clark@example.com',
            city: 'Seattle',
            country: 'USA'
          },
          {
            name: 'Watson',
            email: 'Watson@example.com',
            city: 'Boston',
            country: 'USA'
          },
          {
            name: 'Tony',
            email: 'Tony@example.com',
            city: 'Los Angels',
            country: 'USA'
          }
        ]
      }
      ejs.renderFile(
        path.join(__dirname, '../../templates', 'report-transfer-template.ejs'),
        { result: result },
        (err, data) => {
          if (err) {
            return helper.response(res, 400, 'Failed Export Transaction', err)
          } else {
            const options = {
              height: '11.25in',
              width: '8.5in',
              header: {
                height: '20mm'
              },
              footer: {
                height: '20mm'
              }
            }
            pdf
              .create(data, options)
              .toFile(
                path.join(__dirname, '../../../public/transfer/', fileName),
                function (err, data) {
                  if (err) {
                    return helper.response(
                      res,
                      400,
                      'Failed Export Transaction',
                      err
                    )
                  } else {
                    return helper.response(
                      res,
                      200,
                      'Success Export File Transaction',
                      {
                        url: `http://localhost:3001/backend1/api/${fileName}`
                      }
                    )
                  }
                }
              )
          }
        }
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postTopUp: async (req, res) => {
    try {
      // [1] jika tidak menggunakan midtrans
      // menjalankan proses post data ke table topup status = berhasil
      // menjalankan proses update data balance
      console.log(req.body)
      // [2] jika menggunakan midtrans
      // menjalankan proses post data ke table topup status = pending
      // const topupData = menjalankan model untuk post data ke table topup
      const topupData = {
        topupId: 12347,
        topupAmount: 100000
      }
      const topup = await transactionModel.createTopup(topupData)
      return helper.response(res, 200, 'Success TopUp Please Confirm ...', {
        redirectUrl: topup
      })
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMidtransNotif: async (req, res) => {
    try {
      console.log(req.body)
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-server-KItkJVnyFsZRa-JD5HL_x_DC',
        clientKey: 'SB-Mid-client-lyiBVkXY-ImOkiuQ'
      })
      snap.transaction.notification(req.body).then((statusResponse) => {
        const orderId = statusResponse.order_id
        const transactionStatus = statusResponse.transaction_status
        const fraudStatus = statusResponse.fraud_status
        console.log(statusResponse)

        console.log(
          `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
        )

        // Sample transactionStatus handling logic

        if (transactionStatus == 'capture') {
          // capture only applies to card transaction, which you need to check for the fraudStatus
          if (fraudStatus == 'challenge') {
            // TODO set transaction status on your databaase to 'challenge'
          } else if (fraudStatus == 'accept') {
            // TODO set transaction status on your databaase to 'success'
            // [1] MENJALANKAN MODEL UNTUK GET DATA DARI TABLE BALANCE SUPAYA MENDAPATKAN USERID & TOPUPAMOUNT BERDASARKAN TOPUPID(ORDERID)
            // [2] MENJALANKAN MODEL UNTUK MENGUPDATE STATUS TOPUP BERDASARKAN TOPUPID(ORDERID)
            // [3] MENJALANKAN MODEL UNTUK MENGUPDATE DATA BALANCE
          }
        } else if (transactionStatus == 'settlement') {
          // TODO set transaction status on your databaase to 'success'
          // [1] MENJALANKAN MODEL UNTUK GET DATA DARI TABLE BALANCE SUPAYA MENDAPATKAN USERID & TOPUPAMOUNT BERDASARKAN TOPUPID(ORDERID)
          // [2] MENJALANKAN MODEL UNTUK MENGUPDATE STATUS TOPUP BERDASARKAN TOPUPID(ORDERID)
          // [3] MENJALANKAN MODEL UNTUK MENGUPDATE DATA BALANCE
          // await updateBalance(userId, topupAmount)
        } else if (transactionStatus == 'deny') {
          // TODO you can ignore 'deny', because most of the time it allows payment retries
          // and later can become success
        } else if (
          transactionStatus == 'cancel' ||
          transactionStatus == 'expire'
        ) {
          // TODO set transaction status on your databaase to 'failure'
          // [2] MENJALANKAN MODEL UNTUK MENGUPDATE STATUS TOPUP BERDASARKAN TOPUPID(ORDERID)
        } else if (transactionStatus == 'pending') {
          // TODO set transaction status on your databaase to 'pending' / waiting payment
          // [2] MENJALANKAN MODEL UNTUK MENGUPDATE STATUS TOPUP BERDASARKAN TOPUPID(ORDERID)
        }
      })
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
