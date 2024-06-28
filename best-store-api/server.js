const jsonServer = require('json-server')
const multer = require('multer')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    let date = new Date()
    let imageFilename = date.getTime() + "_" + file.originalname
    req.body.imagesFilename = imageFilename
    cb(null, imageFilename)
  }
})

const bodyParser = multer({ storage: storage }).any()

// JSON Server body-parser to handle JSON payloads
server.use(jsonServer.bodyParser)

// Multer middleware to handle multipart/form-data
server.use(bodyParser)

// POST /products endpoint
server.post("/products", (req, res, next) => {
  let date = new Date()
  req.body.createdAt = date.toISOString()

  if (req.body.price) {
    req.body.price = Number(req.body.price)
  }

  let hasErrors = false
  let errors = {}

  if (req.body.name.length < 2) {
    hasErrors = true
    errors.name = "The name length should be at least 2 characters"
  }
  if (req.body.brand.length < 2) {
    hasErrors = true
    errors.brand = "The brand length should be at least 2 characters"
  }
  if (req.body.category.length < 2) {
    hasErrors = true
    errors.category = "The category length should be at least 2 characters"
  }
  if (req.body.price <= 0) {
    hasErrors = true
    errors.price = "The price is not valid"
  }
  if (req.body.description.length < 10) {
    hasErrors = true
    errors.description = "The description length should be at least 10 characters"
  }

  if (hasErrors) {
    // Return bad request (400) with validation errors
    res.status(400).jsonp(errors)
    return
  }

  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)

// Start the server
server.listen(4000, () => {
  console.log('JSON Server is running')
})
