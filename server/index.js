const express = require('express');
const cors = require('cors');
const path = require('path');
const proxy = require('http-proxy-middleware');
const port = process.env.PORT || 8081;

let app = express()

app.use(express.static(path.join(__dirname, '../')));


app.use(function(req, res, next) { 

  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');  
  //intercepts OPTIONS method 
  if ('OPTIONS' === req.method){ 
    res.sendStatus(200); 
  } 
  else { 
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
    target: 'http://betcriticproxy.us-east-2.elasticbeanstalk.com/',
    changeOrigin: true
  })
);

app.use(
  '/api/movies/banner', cors(), proxy({
    target: 'http://betacriticbanner4-env.ammdczbp2e.us-east-1.elasticbeanstalk.com/',
    changeOrigin: true
  })
);

app.use(
  '/api/movies/*/reviews', cors(), proxy({
    target: 'http://tylerproxy-env.mugbndtn32.us-east-2.elasticbeanstalk.com/',
    changeOrigin: true
  })
);


app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});

