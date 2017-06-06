var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('please write a word after hw1 for example: "/hw1/short"');
});

router.get('/:string', function(req, res, next) {
  string = req.params.string;
  length = string.length;
  ret = {
    string: string,
    length: length
  }
  res.send(JSON.stringify(ret));
});

router.post('/', function(req, res, next) {
  string = req.body.string;
  length = string.length;
  ret = {
    string:string,
    length:length
  };
  res.send(JSON.stringify(ret));
});

module.exports = router;
