const client = require('cheerio-httpcli');
const db = require('./db');
const { connect } = require('./routes/activity');

class collect {
    async refreshstart() {
        var arr = [];

        function comparativeRefresh() {
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

        function careerRefresh() {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    let url = `https://udream.sejong.ac.kr/`;
                    /*
                    client.set('headers', {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        'Accept-Charset': 'utf-8'
                    });
                    */
                    res(url)
                }, 500)
            })
        }

        
        await comparativeRefresh().then((url) => {
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
                    if(1/*colleage === "소프트웨어융합대학 " || colleage === "전자정보통신공학대학"*/){
                        activate.push({
                            colleage: colleage,
                            numbering: idx,
                            title: title,
                            url: link
                        })
                    }
                })
                
                
                const connection = db.return_connection();

                connection.query("truncate activate_comparative",function(err,results,fields){
                    if(err){
                        console.error(err);
                        return res.status(400).json({
                            error: err
                        })
                    }
                })

                const SQL = "insert into activate_comparative values (?,?,?,?)";

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
        await careerRefresh().then((url) => {
            const param = {};
            client.fetch(url, param, function (err, $, res, body) {
                if (err) {
                    console.log(err);
                    return;
                }
                
                const activate = [];

                //console.log(body);
                console.log($.text());
                $("div").each(function (idx){

                    
                    console.log($(this).find(".program").text());
                    
                    const colleage = $(this).find(".winner").find(".institution").text();
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
        */
    }
}

module.exports = collect;