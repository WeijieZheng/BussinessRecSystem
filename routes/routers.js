var express = require('express');
var router = express.Router();

/* GET home page. */
var app = require('../controller/app');
router.get('/', function (req, res) {app.loadIndexPage(req, res)});

module.exports = router;