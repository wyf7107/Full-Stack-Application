
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yifanwang');
const db = mongoose.connection;
db.once('open', function () {
  console.log('Connection successful.')
});

const Schema = mongoose.Schema;
const stringSchema = new Schema({
  string:String,
  length:Number
});
const Strings = mongoose.model('Strings',stringSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  Strings.find({},function(err,results){
    res.json(results);
  })
});

router.get('/:string', function(req, res, next) {
  Strings.find({string:req.params.string},function(err,results){
    if(results.length){res.send({string:results[0].string,length:results[0].length})}
    else{
      string = req.params.string;
      length = string.length;
      const astring = new Strings({string:string,length:length})
      astring.save(function(err) {
           if (err) {res.send(err)}
           else {res.send ({string:string,length:length})}
         })
    }
  })
})


router.post('/', function(req, res, next) {
  var name = req.body.string;
  Strings.find({string:name},function(err,results){
    if(results.length){res.send({string:results[0].string,length:results[0].length})}
    else{
      length = name.length;
      const astring = new Strings({string:name,length:length})
      astring.save(function(err) {
           if (err) {res.send(err)}
           else {res.send ({string:name,length:length})}
         })
    }
  })
});


router.delete('/:string',function(req,res,next){
  Strings.find({string:req.params.string},function(err,results){
    if(!results.length){res.send("{String Not Found}")}
    else{
      Strings.findOneAndRemove({string:req.params.string},function(err) {
           if (err) {res.send(err)}
           else {res.send ("{Removal Success}")}
         })
    }
  })
})








module.exports = router;
