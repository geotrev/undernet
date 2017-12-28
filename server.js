const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(port, error => {
  error ? console.log(error) : console.info(`--> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
