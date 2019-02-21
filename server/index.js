const express = require('express');
const cors = require('cors');
const path = require('path');
const proxy = require('http-proxy-middleware');
const port = process.env.PORT || 3005;

let app = express()

app.use(express.static(path.join(__dirname, '../')));


app.use(
  '/api/movies/details/jurassic-park', proxy({
    target: 'http://127.0.0.1:3002',
    changeOrigin: true
  })
);


app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});

