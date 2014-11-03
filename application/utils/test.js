/**
 * Created by ruiyun on 11/2/14.
 */


var db = require('../utils/db.js');

db.query('select * from fda_case', function(rows) {
    for(var i=0; i<rows.length; i++) {
        if(i < 100) {
            console.log(rows[i]);
        }
    }
});