const express = require('express');
const app = express();
const db = require('./db');
const port = 3001;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//const jobRouter = require('./routes/job');
//const subjectRouter = require('./routes/subject');

const roadmapRouter = require('./routes/roadmap');
const trendRouter = require('./routes/trend');
const introRouter = require('./routes/introduce');
const classifyRouter = require('./routes/classify');
const activateRouter = require('./routes/activate');

//app.use('',subjectRouter);

app.use('/roadmap',roadmapRouter);
app.use('/trend',trendRouter);
app.use('/introduce',introRouter);
app.use('/classify',classifyRouter);
app.use('/activate',activateRouter);

db.connect();

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
