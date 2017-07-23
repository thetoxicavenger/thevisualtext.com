var express = require('express');
var router = express.Router();
const {join} = require('path')
const podcast = require(join(__dirname, 'podcast', 'index'))
const posts = require(join(__dirname, 'blog', 'posts'))
const post = require(join(__dirname, 'blog', 'post'))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Visual Text' })
});

router.get('/podcast', (req, res) => res.render('podcast'))
router.get('/podcastData', podcast)

router.get('/blog/posts', posts)
router.get('/blog/post/:slug', post)

module.exports = router;
