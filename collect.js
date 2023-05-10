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
                    let url = `https://udream.sejong.ac.kr/Main/default.aspx`;
                    
                    client.set('headers', {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        'Accept-Charset': 'utf-8'
                    });
                    
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
                    if(title !== ''){
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
        

        
        await careerRefresh().then((url) => {
            const param = {};
            client.fetch(url, param, function (err, $, res, body) {
                if (err) {
                    console.log(err);
                    return;
                }
                
                const activate_curriculum = {};

                //console.log(body);
                //console.log($.html());

                
                //진로 프로그램
                const career = [];
                const employment = [];
                const regional  = [];

                $("section.p-tb-70 ul#Prodiv1 li").each(function (idx){

                    //console.log();
                    if($(this).find("div.p-inner-li-hover > div.label span").text()=="진행중"){
                        const link = "https://udream.sejong.ac.kr" + $(this).find("a").attr("href");
                        const image = "https://udream.sejong.ac.kr" + $(this).find("div.p-inner-img").attr("style").split("'")[1];
                        const subject = $(this).find("div.p-inner-txt h4").text();
                        const deadline = $(this).find("span.text-666").text();
                        career.push({
                            numbering: idx,
                            url: link,
                            image: image,
                            title: subject,
                            deadline: deadline
                        })
                    }
                })
                activate_curriculum.career = career;

                //취업 프로그램
                $("section.p-tb-70 ul#Prodiv2 li").each(function (idx){

                    if($(this).find("div.p-inner-li-hover > div.label span").text()=="진행중"){
                        const link = "https://udream.sejong.ac.kr" + $(this).find("a").attr("href");
                        const image = "https://udream.sejong.ac.kr" + $(this).find("div.p-inner-img").attr("style").split("'")[1];
                        const subject = $(this).find("div.p-inner-txt h4").text();
                        const deadline = $(this).find("span.text-666").text();
                        employment.push({
                            numbering: idx+10,
                            url: link,
                            image: image,
                            title: subject,
                            deadline: deadline
                        })
                    }
                })
                activate_curriculum.employment = employment;
                
                //지역/특화 프로그램
                $("section.p-tb-70 ul#Prodiv34 li").each(function (idx){

                    if($(this).find("div.p-inner-li-hover > div.label span").text()=="진행중"){
                        const link = "https://udream.sejong.ac.kr" + $(this).find("a").attr("href");
                        const image = "https://udream.sejong.ac.kr" + $(this).find("div.p-inner-img").attr("style").split("'")[1];
                        const subject = $(this).find("div.p-inner-txt h4").text();
                        const deadline = $(this).find("span.text-666").text();
                        regional.push({
                            numbering: idx+20,
                            url: link,
                            image: image,
                            title: subject,
                            deadline: deadline
                        })

                    }
                })
                activate_curriculum.regional = regional;


                //console.log(activate_curriculum);

                const connection = db.return_connection();

                //sdfdsf
                
                connection.query("truncate activate_curriculum",function(err,results,fields){
                    if(err){
                        console.error(err);
                        return res.status(400).json({
                            error: err
                        })
                    }
                })

                const SQL = "insert into activate_curriculum values (?,?,?,?,?,?)";

                activate_curriculum.career.map(element=>{
                    connection.query(SQL,["career", element.numbering, element.url, element.deadline ,element.title, element.image],function(err,results,fields){
                        if(err){
                            console.error(err);
                            return res.status(400).json({
                                error: err
                            })
                        }
                    })
                });

                activate_curriculum.employment.map(element=>{
                    connection.query(SQL,["employment", element.numbering, element.url, element.deadline ,element.title, element.image],function(err,results,fields){
                        if(err){
                            console.error(err);
                            return res.status(400).json({
                                error: err
                            })
                        }
                    })
                })

                activate_curriculum.regional.map(element=>{
                    connection.query(SQL,["regional", element.numbering, element.url, element.deadline ,element.title, element.image],function(err,results,fields){
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
        
    }
}

module.exports = collect;