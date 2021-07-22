const User = require('./User')
const Post = require('./Post')

//create associations
//a user can make many posts
User.hasMany(Post,{
    foreignKey: 'user_id'
})

//this means that a post can only belong to one user
Post.belongsTo(User, {
    foreignKey:'user_id'
})

module.exports = {User, Post};