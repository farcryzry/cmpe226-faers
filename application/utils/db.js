/**
 * Created by ruiyun on 11/2/14.
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ''
});

var dbName = 'faers';

exports.query = function(sql, callback) {
    connection.query('USE ' + dbName);

    connection.query(sql, function(err, rows){
        if(err !== null) {
            console.log(err);
            return;
        }

        if(typeof callback == 'function') {
            callback(rows);
        }
    });
}