var express = require('express');
var router = express.Router();
const {join} = require('path')
// Authentication module.
var auth = require('http-auth');
var basic = auth.basic({
    realm: "User Area",
    file: join(__dirname, '..', '.htpasswd')
});
const podcast = require(join(__dirname, 'podcast', 'index'))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home - TVT' });
});
/* GET home page. */
router.get('/podcast', (req, res) => res.render('podcast'));
router.get('/podcastData', podcast);

/* Use htpasswd auth for protected path */
router.all('/app/*', auth.connect(basic));

router.get('/app/index', function(req, res, next) {
  res.render('app/index', { title: 'Express' });
});

module.exports = router;
