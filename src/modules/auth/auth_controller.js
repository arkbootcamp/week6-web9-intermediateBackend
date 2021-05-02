const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/wrapper')
const authModel = require('./auth_model')
const nodemailer = require('nodemailer')
require('dotenv').config()

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
      // https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4N78ToeMZfGrjVbk-kR95NcXdeZBPjuMIbllyX9vO7Te7z9HXQNo8LA0WUR_ACHHXAg2l4G67dmKBk8loxwQiA_wxRYvQ
      console.log(process.env.SMTP_EMAIL)
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_EMAIL, // generated ethereal user
          pass: process.env.SMTP_PASSWORD // generated ethereal password
        }
      })

      const mailOptions = {
        from: '"Tickitz 👻" <memo.in.aja@gmail.com>', // sender address
        to: userEmail, // list of receivers
        subject: 'Tickitz - Activation Email', // Subject line
        html:
          "<b>Click Here to activate</b><a href='http://localhost:3001/api/v1/user-activation/1'>Click !</>" // html body
      }

      await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log(error)
          return helper.response(res, 400, 'Email not send !')
        } else {
          console.log('Email sent:' + info.response)
          const result = await authModel.register(setData)
          delete result.user_password
          return helper.response(res, 200, 'Success Register User', result)
        }
      })
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
