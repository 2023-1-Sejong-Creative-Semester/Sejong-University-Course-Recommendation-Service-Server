const client = require('cheerio-httpcli');
const db = require('./db');
const { connect } = require('./routes/activate');

class collect {
    async refreshstart() {
        var arr = [];

        function activateRefresh() {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    let url = `https://do.sejong.ac.kr/ko/program/all/list/all/1`;
                    client.set('headers', {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        'Accept-Charset': 'utf-8'
                    });
                    res(url)
                }, 500)
            })
        }

        activateRefresh().then((url) => {
            const param = {};
            client.fetch(url, param, function (err, $, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                
                const activate = [];

                $("a").each(function (idx){
                    const colleage = $(this).find(".content").find(".institution").text();
                    const title = $(this).find(".detail").find(".title").text();
                    const link = "https://do.sejong.ac.kr" + $(this).attr("href");
                    if(colleage === "소프트웨어융합대학 " || colleage === "전자정보통신공학대학"){
                        activate.push({
                            colleage: colleage,
                            numbering: idx,
                            title: title,
                            url: link
                        })
                    }
                })
                
                
                const connection = db.return_connection();

                connection.query("truncate activate",function(err,results,fields){
                    if(err){
                        console.error(err);
                        return res.status(400).json({
                            error: err
                        })
                    }
                })

                const SQL = "insert into activate values (?,?,?,?)";

                console.log(activate);
                activate.map(element=>{
                    connection.query(SQL,[element.numbering,element.colleage,element.title,element.url],function(err,results,fields){
                        if(err){
                            console.error(err);
                            return res.status(400).json({
                                error: err
                            })
                        }
                    })
                })
                
            });
        });

        /*
        //JSON 대신 DB
        const connection = db.return_connection();
        let SQL = 'select JSON_EXTRACT( data, \'$.key\' ) as "key", JSON_EXTRACT( data, \'$.index\' ) as "index" from tag;';
        
        await connection.query(SQL,function(err,results,fields){
            results.map(data=>{
                tagRefresh(data.key).then((url) => {
                    const param = {};
                    client.fetch(url, param, function (err, $, res) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        
                        let key = "tr:nth-child(1)"; 

                        //338인 경우 child 4
                        if(JSON.parse(data.key)=="338"){
                            key = "tr:nth-child(4)";
                        }
                        const updateSQL = 'update tag set data = JSON_SET(data,\'$.flag\', ?,\'$.index\', ?,\'$.subject\', ?,\'$.link\', ?) where JSON_EXTRACT( data, \'$.key\' ) = ?;';

                        let flag = "0";
                        if(($(key).find(".index").text() !== JSON.parse(data.index))===true){
                            flag = "1";
                        }
                        const index = $(key).find(".index").text();
                        const subject = $(key).find("td.subject > a").text().replaceAll('\t', '').replaceAll('\n', '');
                        
                        const link = `http://board.sejong.ac.kr/${$(key).find("td.subject > a").attr("href")}`;
                        connection.query(updateSQL,[flag, index, subject, link, JSON.parse(data.key)], function(err,results,fields){
                            if(err){
                                console.log(err);
                                return ;
                            }
                            
                        })
                                   
                    });
                });
            })
        });
        */
    }
}
module.exports = collect;