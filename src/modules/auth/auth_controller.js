const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/wrapper')
const authModel = require('./auth_model')

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      console.log(`before Encrypt = ${userPassword}`)
      console.log(`after Encrypt = ${encryptPassword}`)

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword
      }
      // kondisi cek email apakah ada di dalam database ?
      // jika ada response gagal msg = email sudah pernah di daftarkan
      // jika tidak ada = menjalankan proses model register user
      const result = await authModel.register(setData)
      delete result.user_password
      return helper.response(res, 200, 'Success Register User', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataConditions({
        user_email: userEmail
      })
      // console.log(checkEmailUser)
      // proses 1 pengecekkan apakah email ada di database atau tidak ?
      if (checkEmailUser.length > 0) {
        // proses 2 pengecekan password apakah password yang dimasukkan sesuai atau tidak
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Success login !', result)
        } else {
          return helper.response(res, 400, 'Wrong password !')
        }
      } else {
        return helper.response(res, 404, 'Email / Account not registed')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
