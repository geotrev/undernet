const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./build'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});


app.listen(PORT, () => `App running at localhost:${PORT}...`);
