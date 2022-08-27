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
 .post((req, res) => {//POST CARRIES JSON INFO IN BODY OF MESSAGE
  res.end(`Will add the campsite ${req.body.name} with ${req.body.description}`);
 })
 .put((req, res) => {
  res.statusCode = 403;//403 === op not supported 
  res.end('PUT operation not supported on /campsites');
 })
 .delete((req, res) => {
  res.end('Deleting all campsites');
 });


campsiteRouter.route('/:campsiteId')
 .all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
 })
 .get((req, res) => {
  res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
 })
 .post((req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
 })
 .put((req, res) => {
  res.write(`Updating the campsite: ${req.params.campsiteId}\n`);//write to body, \n = new line body
  res.end(`Will update the campsite ${req.body.name}
     with description ${req.body.description}`);//another part of message body, req.body usable because it was parsed properly
 })
 .delete((req, res) => {
  res.end(`Deleting campsite: ${req.params.campsiteId}`);
 });//Deleting specific, not all


module.exports = campsiteRouter;