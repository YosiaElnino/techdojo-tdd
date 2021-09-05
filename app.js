const express = require('express')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})

module.exports = app