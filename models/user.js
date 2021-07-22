const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt')

//create user model
class User extends Model {
}
//define table columns and configuration
User.init(
    //table column definitions go here start of parent object
    {
            // this is the definition of the id column
        id: {
            type: DataTypes.INTEGER,// use the special equalize data types object provide what type of data it is
            allowNull:false, //this is equiv of SQLs NOT NULL option
            primaryKey: true, //instruct that this is primary key
            autoIncrement:true //turn on autoincrement
        },
            //define a username column
        username: {
            type:DataTypes.STRING,
            allowNull:false
        },
        //define an email columns
        email: {
            type:DataTypes.STRING,
            allowNull:false,
            unique:true, //there cannot be any duplicate values in this table
            //if allowNull is set to false we can run our data through validators before creating tjhe table data
            validate: {
                isEmail:true
            }
        },
        //define a passwor column
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [4] //lenght must be 4 chars long
            }
        }
},
//finish of parent object
//use beforeCreate() hook to execute bcryt has fxn, we pass in userdata object
//that contans the plaintext password in the password property. we also pass in
//salt round value of 10. this is then passed to the Promis object as newUserData object
//with a hashed password property. the return statement the exits out of the fxn
// returning the hashed pwd in newUserData fxn
    {
        hooks: {// set up beforeCreate lifecycle hook functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
              },

            //set up beforeUpdate lifecycle "hook" fxnality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
                return updatedUserData;
            }
              
        },
        
        //table configuration options go here (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //pass in our imported sequalize connection (the direct connection to our db)
        sequelize,
        //dont automatically create createdAt/updatedAt timestamp field
        timestamps: false,
        //dont pluralize name of database table
        freezeTableName:true,
        //use underscore instead of camel casing
        underscored: true,
        //make is so our model name stays lowercase in databse
        modelName:'user'
}
)

module.exports = User;


// Before setting up columns for the table,
//  let's review what we just wrote. First,
//  we imported the Model class and DataTypes object from Sequelize. 
// This Model class is what we create our own models from using the extends
//  keyword so User inherits all of the functionality the Model class has.

// Once we create the User class, we use the .init()
// method to initialize the model's data and configuration, 
// passing in two objects as arguments. The first object will
//  define the columns and data types for those columns.
//  The second object it accepts configures certain options for the table.

// Each column's definition gets its own type definition, in which we use the imported Sequelize DataTypes object to define what type of data it will be.
// Every time we extend a class from the Sequelize Model class, that new class (or model, in this case) inherits a number of methods for creating, reading, updating, and deleting data from a database. The .init() method we execute after is the part that actually provides context as to how those inherited methods should work.