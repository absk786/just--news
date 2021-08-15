const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  if (req.session) {//We also wrapped the entire request in an if statement to prevent users from submitting empty strings.
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    //use the id from the session
    user_id:req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
});

//Wrapping the Sequelize queries in if (req.session) statements ensures that only logged-in users interact with the database.


router.delete('/:id', (req, res) => {

});

module.exports = router;
