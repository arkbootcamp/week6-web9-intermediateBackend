const helper = require('../../helpers/wrapper')

module.exports = {
  postBooking: async (req, res) => {
    try {
      console.log(req.body)
      // destructuring data
      // [1]
      // set data untuk table booking
      // resultBooking = menjalankan model untuk menyimpan data ke table booking

      // [2]
      // buat looping dari booking seat
      // (element) => {
      //   console.log(element) cek
      //   set data untuk table booking seat
      //    const setData2 = {
      //      booking_id: ...,
      //      booking_seat: ...
      //    }
      // menjalankan model untuk menyimpan data ke table booking seat
      // }

      // response
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
