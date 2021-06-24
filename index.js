const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3001
const passport = require('passport')
const passportConfig = require('./config/passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const authMiddleware = require('./middlewares/auth')

passportConfig(passport)

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(cors())

//COOKIE CONFIG
app.use(
  cookieSession({
    name: 'shopingsession',
    keys: ['ensure this is protected', 'ensure! this is !protected'],
  }),
)

// app.use(authMiddleware.ensureAuth)

app.use('/api/products', require('./routes/products.route'))
app.use('/api/orders', require('./routes/orders.route'))
app.use('/api/users', require('./routes/users.route'))
app.use('/api/auth', require('./routes/auth.route'))

app.listen(port, (err) => {
  if (err) console.log('error connection')
  else console.log(`subscriber connected to ${port}`)
})
