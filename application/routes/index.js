
/*
 * GET home page.
 */

var db = require('../utils/db.js');

exports.index = function(req, res){
  res.render('index', { title: 'FAERS' })
};

exports.geo = function(req, res){
  res.render('geo', { title: 'Geo Distribution' })
};

exports.data = function(req, res){
  db.query('select * from fda_case', function(rows) {
    res.render('data', { title: 'Data Tables', rows: rows });
    for(var i=0; i<rows.length; i++) {
      if(i < 10) {
        console.log(rows[i]);
      }
    }
  });
};