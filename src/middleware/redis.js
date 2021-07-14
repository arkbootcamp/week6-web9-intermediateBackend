require('dotenv').config()
const redis = require('redis')
const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
})
const helper = require('../helpers/wrapper')

client.on('connect', () => {
  console.log('Connected to our redis instance!')
})

module.exports = {
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di dalam redis')
        return helper.response(
          res,
          200,
          'Success Get Data By Id',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada di dalam redis')
        next()
      }
    })
  },
  getMovieRedis: (req, res, next) => {
    client.get(`getmovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di dalam redis')
        const newResult = JSON.parse(result) // {result, pageInfo}
        return helper.response(
          res,
          200,
          'Success Get Movie',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('data tidak ada di dalam redis')
        next()
      }
    })
  },
  // ====================
  clearDataMovieRedis: (req, res, next) => {
    // proses pertama cari kunci yang berawalan getmovie
    client.keys('getmovie*', (_error, result) => {
      // console.log(result) // ['getmovie:1', 'getmovie:{page limit ..}']
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
  // ====================
}
