const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection');
const app = express()
const PORT = process.env.PORT||3001;
const path = require('path')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({})
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: [],
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db:sequelize
    })
}

app.use(session(sess))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//turn on routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//turn on connection to db and server
sequelize.sync({force:true}).then(() => {
app.listen(PORT, () => console.log('now listening'))
})

// the sycn means that this is a sequalize taking the models and connecting 
// themselves to asociated db TableHints. if it doesnt find a table it
// will create one for you