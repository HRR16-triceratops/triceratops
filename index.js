var app = require('./server/app.js');

var port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log(`server is now listening on port ${port}`);
});
