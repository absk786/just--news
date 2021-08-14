const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  console.log(req.session)
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//hardcode the post data to see if working
router.get('/post/:id', (req,res) => {
Post.findOne({
  where: {
    id:req.params.id
  },
  attributes:[
    'id',
    'post_url',
    'title',
    'created_at',
    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),'vote_count']
  ],
  include:[
    {
      model:Comment,
      attributes:['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include:{
        model:User,
        attributes:['username']
      }
    },
    {
      model:User,
      attributes:['username']
    }
  ]
}).then(dbPostData => {
  if(!dbPostData) {
    res.status(404).json({message:'no post found with this id'})
    return
  }
  
  //serealize the data
  const post = dbPostData.get({plain:true})
  //pass data to template
  res.render('single-post', {post})
}).catch(err => {
  console.log(err)
  res.status(500).json(err)
})


})

//get the login and signup form
router.get('/login', (req,res) =>{
  if (req.session.loggedIn){
    res.redirect('/')
    return;
  }
res.render('login');
}
)

module.exports = router;
