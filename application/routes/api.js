/**
 * Created by ruiyun on 11/4/14.
 */

var express = require('express');
var router = express.Router();
var db = require('../utils/db.js');

// GET
router.get('/map', function(req, res) {
    db.query('SELECT reporter_country as country, count(*) as c FROM faers.fda_case group by reporter_country',
        function(rows) {
            var mapData = {};

            for(var i=0; i<rows.length; i++) {
                mapData[rows[i]['country']] = rows[i]['c'];
            }

            res.json(mapData);
        });
});

module.exports = router;