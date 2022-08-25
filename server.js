const express = require('express');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3008;

const app = express();
app.use(morgan('dev'));//config morgan to log using dev version
app.use(express.json());//middleware to parse JSON body/data into usable data as props on req object

//REST API endpoints
app.all('/campsites', (req, res, next) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');//send back plain text in response body
 next();//pass control of app routing to next relevant route method
});//catch all for all http verbs, set PROPS on res object as default for ALL methods on path. any req to this path triggers method

app.get('/campsites', (req, res) => {
 //res status code and headers already set in app.all()
 res.end('Will send all campsites to you');//send message body back to client
});//no next because no routing functions after this

app.post('/campsites', (req, res) => {//POSTY TYPICALLY CARRIES JSON INFO IN BODY OF MESSAGE
 //after app.all, goes to next rel routing method. if post, here, if get, above
 //express.json() middlware function takes props of json data received and sets up as props of req.bdoy JS object //later will send req.body with props of name/description so we can expect to access here
 res.end(`Will add the campsite ${req.body.name} with ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
 res.statusCode = 403;//403 === op not supported
 res.end('PUT operation not supported on /campsites');
}); //put will be rejected

app.delete('/campsites', (req, res) => {
 res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => {
 res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
 res.statusCode = 403;
 res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
 res.write(`Updating the campsite: ${req.params.campsiteId}\n`);//write to body, \n = new line body
 res.end(`Will update the campsite ${req.body.name}
     with description ${req.body.description}`);//another part of message body, req.body usable because it was parsed properly
});

app.delete('/campsites/:campsiteId', (req, res) => {
 res.end(`Deleting campsite: ${req.params.campsiteId}`);
});//Deleting specific, not all

app.use(express.static(__dirname + '/public'));//auto serves index.html if we send req to just hostname:port

app.use((req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/html');
 res.end(`<html><body><h1>This is an express server</h1></body></html>`);
});

app.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}`);
});