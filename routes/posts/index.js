var express = require('express');
var router = express.Router();

const { addNewPost } = require('./controller');

router.post('/', addNewPost);

module.exports = router;
