var express = require('express');
var router = express.Router();
const {join} = require('path')
// Authentication module.
var auth = require('http-auth');
var basic = auth.basic({
    realm: "User Area",
    file: join(__dirname, '..', '.htpasswd')
});

/* GET home page. */
router.all('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Use htpasswd auth for protected path */
router.all('/app/*', auth.connect(basic));

router.get('/app/index', function(req, res, next) {
  res.render('app/index', { title: 'Express' });
});

module.exports = router;
