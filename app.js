const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const earlyHints = require('early-hints');
const publicPath = path.join(__dirname, 'public');

const hints = fs.readdirSync(publicPath)
  .filter((file) => path.basename(file) !== 'index.html')
  .map((file) => (`/${path.basename(file)}`)).slice(0, 100);

app.use(earlyHints(hints));
app.use((req, res, next) => {
  if (req.url === '/') {
  return setTimeout(() => { 
      express.static(publicPath)(req, res, next)
    }, 2000);
  }
  return setTimeout(() => { 
    express.static(publicPath)(req, res, next)
  }, 1000);
});
app.listen(3000);
