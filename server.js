// This is here for Heroku support. :)
// -> Don't use Express for development
//    unless you're just testing that it works...
//    in which case, test using `node server.js`

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(PORT, error => {
  error ? console.log(error) : console.info(`--> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
