require('dotenv').config()
let express = require('express')
let app = express()
let sequelize = require('./db')
let bodyParser = require('body-parser')
let user = require('./controllers/usercontroller')
let porklog = require('./controllers/porklogcontroller')
let beeflog = require('./controllers/beeflogcontroller')
let poultrylog = require('./controllers/poultrylogcontroller')
let seafoodlog = require('./controllers/seafoodlogcontroller')
let vegetablelog = require('./controllers/vegetablelogcontroller')


sequelize.sync()
app.use(bodyParser.json())
app.use(require('./middleware/headers'))
app.use('/que/user', user)
app.use(require('./middleware/validate-session'))
app.use('/que/pork', porklog)
app.use('/que/beef', beeflog)
app.use('/que/poultry', poultrylog)
app.use('/que/seafood', seafoodlog)
app.use('/que/vegetable', vegetablelog)

app.listen(4000, function () {
    console.log('App is listening 4000')
})