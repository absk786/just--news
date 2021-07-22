const router = require('express').Router();
const {User} = require('../../models')

//GET request /api/users/ when the client makes a GET request to /api/users, we will select all users from the user table in the database and send it back as JSON.
router.get('/', (req,res) => {
// access our user model and run the findAll() method 
User.findAll().then(dbUserData => res.json(dbUserData)).catch(err => {
    console.log(err);
    res.status(500).json(err)
    })
})

// request /api/users/1
router.get('/:id', (req,res) => {
User.findOne({where:{id:req.params.id}})
.then(
    dbUserData => {
        if (!dbUserData) {
            res.status(400).json({
                messege: 'no user found with this id'
            })
            return;
        }
        res.json(dbUserData)
    }
)
.catch(
    err => {
        console.log(err)
        res.status(500).json(err)
    }
)
})

//POST request /api/users
router.post('/', (req,res) => {
// expects {username: "lernantino", email: "lern@email.com", password: "password"}
User.create(
    {
        username:'TestUser1',
        email:'testuser@email.com',
        password:'password'
    }
)
.then(dbUserData => res.json(dbUserData))
.catch(err => {
    console.log(err); 
    res.status(500).json(err);
})
})

//POST request /api/users/1
router.post('/:id', (req,res) => {

})

//Put request /api/users/1 to update a record
router.put('/:id', (req,res) => {
// expects {username: "lernantino", email: "lern@email.com", password: "password"}
//if req.body has exact key/value pairs to match the model you can just use `req.body` instead

User.update(req.body,{
where: {
    id: req.params.id
}
})
.then (dbUserData => {
    if (!dbUserData[0]) {
        res.status(404).json({
            messege:"no user found with this id"
        })
        return;
    }
    res.json(dbUserData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})
})

//Delete request /api/users/1
router.delete('/:id', (req,res) => {
User.destroy({
    where:{
        id:req.params.id
    }
})
.then(dbUserData => {
    if(!dbUserData) {
        res.status(404).json({messege:"no user found with this id"})
    }
    res.json(dbUserData);
})
.catch(err => {
    console.log(err)
    res.status(500).json(err)
})
})

module.exports = router;

// Sequelize is a JavaScript Promise-based library, meaning we get to use .then() with all of the model methods!
// To insert data, we can use Sequelize's .create() method. Pass in key/value pairs where the keys are what we defined in the User model and the values are what we get from req.body. In SQL, this command would look like the following code:
// This .update() method combines the parameters for creating data and looking up data. We pass in req.body to provide the new data we want to use in the update and req.params.id to indicate where exactly we want that new data to be used.











