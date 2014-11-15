var express = require('express');
var router = express.Router();
var db = require('../utils/db.js');

router.get('/', function (req, res) {
    var sql = 'select * from fda_case limit 100 ';
    db.query(sql, function (rows) {
        res.render('index', {url: req.url, menu: menu, title: 'FAERS',
            cases: rows});
        for (var i = 0; i < rows.length; i++) {
            if (i < 2) {
                console.log(rows[i]);
            }
        }
    });
});

router.get('/geo', function (req, res) {
    res.render('geo', {url: req.url, menu: menu, title: 'FAERS'});
});

router.get('/data', function (req, res) {
    var sql = 'select * from fda_case' + ' limit 100 ';
        db.query(sql, function (rows) {
        res.render('data', {url: req.url, menu: menu, title: 'Data Tables', rows: rows});
        for (var i = 0; i < rows.length; i++) {
            if (i < 10) {
                console.log(rows[i]);
            }
        }
    });
});


router.get('/charts', function (req, res) {
    res.render('charts', {url: req.url, menu: menu, title: 'FAERS'});
});

var menu = [
    {url: "/geo", name: "Geographical Distribution"},
    {url: "/charts", name: "Charts"},
    {url: "/data", name: "Data"}
];

module.exports = router;
