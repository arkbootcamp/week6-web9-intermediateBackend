const express = require('express')
const Route = express.Router()
// 1
// const { sayHello } = require('./movie_controller')
// 2
const movieController = require('./movie_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

// 1
// Route.get('/hello', sayHello)
// 2
Route.get('/hello', movieController.sayHello)
Route.get('/', authMiddleware.authentication, movieController.getAllMovie)
Route.get('/:id', movieController.getMovieById)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  movieController.postMovie
)
Route.patch('/:id', movieController.updateMovie)
Route.delete('/', movieController.deleteMovie)

module.exports = Route
