const express = require('express');
const app = express();
const db = require('./db');
const port = 3001;


const jobRouter = require('./routes/job');
const roadmapRouter = require('./routes/roadmap');
const subjectRouter = require('./routes/subject');
const trendRouter = require('./routes/trend');

app.use('',jobRouter);
app.use('',roadmapRouter);
app.use('',subjectRouter);
app.use('/trend',trendRouter);

db.connect();

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
