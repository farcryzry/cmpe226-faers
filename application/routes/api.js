/**
 * Created by ruiyun on 11/4/14.
 */

var express = require('express');
var router = express.Router();
var db = require('../utils/db.js');
var _= require('underscore');

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

router.get('/caseByType', function(req, res) {
    var sql = 'SELECT month(fda_date) as m, rept_cod, count(*) as c FROM faers.fda_case where month(fda_date) > 9 group by month(fda_date), rept_cod  order by month(fda_date), rept_cod ;';
    db.query(sql, function(rows) {
        var data = {categories: [], series: []};

        _.each(rows, function(e){if(data.categories.indexOf(e.m) < 0) data.categories.push(e.m)});

        var types = [];
        _.each(rows, function(e){if(types.indexOf(e.rept_cod) < 0) types.push(e.rept_cod)});

        _.each(types, function(t) {
            data.series.push({
                name: t,
                data: _.map(_.filter(rows, function(e) {return e.rept_cod === t}), function(e){return e.c})
            });
        });

        res.json(data);
    });
});

router.get('/caseByCountry', function(req, res) {
    var sql = "SELECT month(fda_date) m, sum(case when reporter_country='US' then 1 else 0 end) as DOMESTIC_COUNT, " +
            "sum(case when reporter_country!='US' AND reporter_country!='COUNTRY NO' then 1 else 0 end) as FOREIGN_COUNT, " +
            "sum(case when reporter_country='COUNTRY NO' then 1 else 0 end) as UNKNOWN_COUNT " +
            "FROM faers.fda_case where month(fda_date) > 9 group by month(fda_date) order by month(fda_date);";

    db.query(sql, function(rows) {
        var data = {categories: [], series: [{name: 'US', data: []}, {name: 'Other Country', data: []}, {name: 'Unknown', data: []}]};

        _.each(rows, function(e){
            data.categories.push(e.m);
            data.series[0].data.push(e.DOMESTIC_COUNT);
            data.series[1].data.push(e.FOREIGN_COUNT);
            data.series[2].data.push(e.UNKNOWN_COUNT);
        });

        res.json(data);
    });
});

router.get('/caseByReporterType', function(req, res) {
    var sql = "select month(fda_date) m, occp_code, count(*) c from faers.fda_case where month(fda_date) > 9 and occp_code in ('CN', 'LW', 'MD', 'OT', 'PH', 'RN')" +
            "group by month(fda_date), occp_code order by month(fda_date), occp_code ;";

    db.query(sql, function(rows) {
        var data = {categories: [], series: []};

        _.each(rows, function(e){if(data.categories.indexOf(e.m) < 0) data.categories.push(e.m)});

        var types = [];
        _.each(rows, function(e){if(types.indexOf(e.occp_code) < 0) types.push(e.occp_code)});

        _.each(types, function(t) {
            data.series.push({
                name: t,
                data: _.map(_.filter(rows, function(e) {return e.occp_code === t}), function(e){return e.c})
            });
        });

        res.json(data);
    });
});

router.get('/outcome', function(req, res) {
    var sql = "SELECT month(c.fda_date) m, o.outc_cod, count(*) c FROM faers.outcome o " +
        "inner join faers.fda_case c on o.caseid = c.id where month(c.fda_date) > 9 " +
        "group by month(c.fda_date), o.outc_cod " +
        "order by month(c.fda_date), o.outc_cod";

    db.query(sql, function(rows) {
        var data = {categories: [], series: []};

        _.each(rows, function(e){if(data.categories.indexOf(e.m) < 0) data.categories.push(e.m)});

        var types = [];
        _.each(rows, function(e){if(types.indexOf(e.outc_cod) < 0) types.push(e.outc_cod)});

        _.each(types, function(t) {
            data.series.push({
                name: t,
                data: _.map(_.filter(rows, function(e) {return e.outc_cod === t}), function(e){return e.c})
            });
        });

        res.json(data);
    });
});

router.get('/outcome', function(req, res) {
    var sql = "SELECT month(c.fda_date) m, o.outc_cod, count(*) c FROM faers.outcome o " +
        "inner join faers.fda_case c on o.caseid = c.id where month(c.fda_date) > 9 " +
        "group by month(c.fda_date), o.outc_cod " +
        "order by month(c.fda_date), o.outc_cod";

    db.query(sql, function(rows) {
        var data = {categories: [], series: []};

        _.each(rows, function(e){if(data.categories.indexOf(e.m) < 0) data.categories.push(e.m)});

        var types = [];
        _.each(rows, function(e){if(types.indexOf(e.outc_cod) < 0) types.push(e.outc_cod)});

        _.each(types, function(t) {
            data.series.push({
                name: t,
                data: _.map(_.filter(rows, function(e) {return e.outc_cod === t}), function(e){return e.c})
            });
        });

        res.json(data);
    });
});

router.get('/total', function(req, res){
    var sql = "select (select count(*) from faers.fda_case) as case_count, " +
        "(select COUNT(DISTINCT drugname) from faers.drug) as drug_types," +
        "(select count(*) from faers.fda_case where gndr_cod = 'M') as male," +
        "(select count(*) from faers.fda_case where gndr_cod = 'F') as female";

    db.query(sql, function(rows) {
        res.json(rows[0]);
    });
});

router.get('/table/:name', function(req, res){
    var sql = "select * from " + req.param('name') + " limit 100";

    db.query(sql, function(rows) {
        res.json(rows);
    });
});



module.exports = router;