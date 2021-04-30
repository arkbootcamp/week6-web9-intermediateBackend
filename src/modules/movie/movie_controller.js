const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      let { page, limit, searchByName } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      // console.log('searchdata = 'searchByName)
      // betikan default value
      // page = 1
      // limit = 10
      // sort = movie_id ASC
      // search = ''
      const totalData = await movieModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }

      const result = await movieModel.getDataAll(limit, offset, searchByName)
      for (const value of result) {
        // console.log(value)
        // value.premiere = await movieModel.getPremiereByMovieId(value.movie_id)
        value.premiere = [
          { premiere_id: 1, premiere_name: 'Cinema21' },
          { premiere_id: 2, premiere_name: 'By.2' }
        ]
      }
      // console.log(req.query)
      client.setex(
        `getmovie:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )
      return helper.response(res, 200, 'Success Get Data', result, pageInfo)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)
      // kondisi pengecekan apakah data di dalam databe dengan id ..
      // console.log(result) // [] | [......]
      if (result.length > 0) {
        client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By Id ... Not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMovie: async (req, res) => {
    try {
      const { movieName, movieCategory, movieReleaseDate } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_image: req.file ? req.file.filename : ''
      }
      const result = await movieModel.createData(setData)
      return helper.response(res, 200, 'Success Create Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi pengecekan apakah data di dalam database ada berdasarkan id ...
      // proses untuk mendeleta file lama
      const { movieName, movieCategory, movieReleaseDate } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_updated_at: new Date(Date.now())
      }
      const result = await movieModel.updateData(setData, id)
      return helper.response(res, 200, 'Success Update Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      // 1. buat request di post
      // 2. set up controller dan model
      // 3. mendelete data yang ada di dalam folder uploads fs.unlink
      console.log(req.params)
      // hasil response untuk delete id yg kedelete saja
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
