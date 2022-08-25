//will handle /camspites & /camspites/:campsiteId

const express = require('express');
const campsiteRouter = express.Router();//instance of express.Router()

campsiteRouter.route('/')
 .all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');//send back plain text in response body
  next();//pass control of app routing to next relevant route method
 })
 .get((req, res) => {
  //res status code and headers already set in app.all()
  res.end('Will send all campsites to you');//send message body back to client
 })
 .post((req, res) => {//POSTY TYPICALLY CARRIES JSON INFO IN BODY OF MESSAGE
  res.end(`Will add the campsite ${req.body.name} with ${req.body.description}`);
 })
 .put((req, res) => {
  res.statusCode = 403;//403 === op not supported
  res.end('PUT operation not supported on /campsites');
 })
 .delete((req, res) => {
  res.end('Deleting all campsites');
 });

module.exports = campsiteRouter;