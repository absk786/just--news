const router = require('express').Router();
const {User} = require('../../models')

//GET request /api/users/ when the client makes a GET request to /api/users, we will select all users from the user table in the database and send it back as JSON.
router.get('/', (req,res) => {
// access our user model and run the findAll() method 
User.findAll({
    attributes: {exclude:['password']}
}).then(dbUserData => res.json(dbUserData)).catch(err => {
    console.log(err);
    res.status(500).json(err)
    })
})

// request /api/users/1
router.get('/:id', (req,res) => {
User.findOne({
    attributes:{exclude:['password']},
    where:{id:req.params.id}})
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
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//login authentication
// We queried the User table using the findOne() method for the email entered by the user and assigned it to req.body.email.
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that email address!' });
          return;
        }

        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password)
        if (!validPassword) {
            res.status(400).json({messege:"incorrect password"})
        }
        res.json({ user:dbUserData, messege:"you are now logged in"})
      });  
    });

//Put request /api/users/1 to update a record
router.put('/:id', (req,res) => {
// expects {username: "lernantino", email: "lern@email.com", password: "password"}
//if req.body has exact key/value pairs to match the model you can just use `req.body` instead
User.update(req.body,{
    //need to add an option to the query call for hooks
individualHooks:true,
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











