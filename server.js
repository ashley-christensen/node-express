const express = require('express');
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const hostname = 'localhost';
const port = 3008;

const app = express();
app.use(morgan('dev'));//config morgan to log using dev version
app.use(express.json());//middleware to parse JSON body/data into usable data as props on req object

app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

app.use(express.static(__dirname + '/public'));//auto serves index.html if we send req to just hostname:port

app.use((req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/html');
 res.end(`<html><body><h1>This is an express server</h1></body></html>`);
});

app.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}`);
});