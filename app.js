const express = require('express')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
// const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

// app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})

module.exports = app