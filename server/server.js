var express = require("express");
var app = express();
1
app.use(express.static(__dirname + '/../build'));

app.listen(8000, function(){
	console.log('server listening on port 8000!'); 
}); 
