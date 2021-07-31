const express = require('express')
const routes = require('./routes')
const sequelize = require('./config/connection');
const app = express()
const PORT = process.env.PORT||3001;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({force:true}).then(() => {
app.listen(PORT, () => console.log('now listening'))
})

// the sycn means that this is a sequalize taking the models and connecting 
// themselves to asociated db TableHints. if it doesnt find a table it
// will create one for you