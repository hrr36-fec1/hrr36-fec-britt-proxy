const express = require('express');
const cors = require('cors');
const path = require('path');
const proxy = require('http-proxy-middleware');
const port = process.env.PORT || 3005;

let app = express()

app.use(express.static(path.join(__dirname, '../')));


app.use(function(req, res, next) { 

  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');  
  //intercepts OPTIONS method 
  if ('OPTIONS' === req.method){ 
    res.sendStatus(200); 
  } else{ 
    next(); 
  } 
}); 



app.use(
  '/api/movies/details/jurassic-park', cors(), proxy({
    target: 'http://127.0.0.1:3002',
    changeOrigin: true
  })
);

app.use(
  '/api/movies/*/trailers', cors(), proxy({
    target: 'http://127.0.0.1:3333',
    changeOrigin: true
  })
);

app.use(
  '/api/movies/banner', cors(), proxy({
    target: 'http://127.0.0.1:8080',
    changeOrigin: true
  })
);

app.use(
  '/api/movies/*/reviews', cors(), proxy({
    target: 'http://127.0.0.1:4444',
    changeOrigin: true
  })
);


app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});

