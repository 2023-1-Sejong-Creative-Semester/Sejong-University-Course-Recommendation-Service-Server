const SQL_info = require('./KEY/SQL_info.json')
const mysql = require('mysql');
var connection;

const conn = {
	host: SQL_info.host,
	port: SQL_info.port,
	user: SQL_info.user,
	password: SQL_info.password,
	database: SQL_info.database
};

function connect(){
    conn.typeCast = function (field, next) {
        if (field.type === 'JSON') {
          return JSON.parse(field.string())
        }
        return next()
    };

    console.log(conn);

    connection = mysql.createConnection(conn);  // DB Connect

    connection.connect(function(err){
        if(err){
            console.error(err);
            console.error("MySQL connection err");
            return ;
        }
        console.log("MySQL connected");

        /*
        connection.query("show tables;",function(err,results,field){
            console.log(results);
        })

        connection.query("select * from cource_tag;",function(err,results,field){
            console.log(results);
        })

        connection.query("select * from main;",function(err,results,field){
            console.log(results);
        })

        connection.query("select * from re_main;",function(err,results,field){
            console.log(results);
        })

        */
    });

    return connection;
}

function return_connection(){
    return connection;
}

module.exports = {
    connect,
    return_connection
}