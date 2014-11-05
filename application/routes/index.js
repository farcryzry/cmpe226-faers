var express = require('express');
var router = express.Router();
var db = require('../utils/db.js');

router.get('/', function(req, res) {
  res.render('index', { title: 'FAERS' });
});

router.get('/geo', function(req, res) {
  res.render('geo', { title: 'FAERS' });
});

router.get('/data', function(req, res) {
  db.query('select * from fda_case', function(rows) {
    res.render('data', { title: 'Data Tables', rows: rows });
    for(var i=0; i<rows.length; i++) {
      if(i < 10) {
        console.log(rows[i]);
      }
    }
  });
});

module.exports = router;
