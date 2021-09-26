// server.js
const express = require('express');
const path = require('path');
require('dotenv').config()
// Import route
const uploadRouter = require('./src/routes/upload') // NEW
// Create App
const app = express();
const port = process.env.PORT || 3001;
// Adds a parsed json body object to req
app.use(express.json({ limit: '10000kb' }));
// Set route middleware
app.use('/api/upload', uploadRouter)               // NEW
// Needed for express to find static assets
//app.use(express.static(path.resolve('client', 'build')));
// Needed so express can return an actual webpage
//app.get('*', (req, res) => {
//    res.sendFile(path.resolve('client', 'build', 'index.html'));
//});
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));