var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/new_new");
//var server = require("http");
//var io = require('socket.io')(server);
var dataToStore ;
//io.on('connect',function(server_socket){
//	server_socket.on('message',function(data){
//		dataToStore = data;
//});
//});




var mySchema = new mongoose.Schema({"name":String});

var myModel = mongoose.model('firstcollection',mySchema);

/* myModel.create(dataToStore,function(err,data){
	if(err){
		console.log("cannot save into mongoose");
}else {console.log(data);}
}
); */

app.use(express.static('public'));
app.use(express.static('portofolio'));

app.post('/', function(req, res){
	dataToStore = req.body["myArray"];
	console.log(dataToStore);
	myModel.create(dataToStore,function(err,data){
		if(err){
			console.log("cannot save into mongoose");
			//res.contentType('json');
			//res.send({ "error": JSON.stringify({response:'err'}) });
		}else {console.log(data);
			//res.contentType('json');
			//res.send({ "success": JSON.stringify({response:'suc'}) });
		}
	}
	);
	
	res.end();
});

app.get('/epic/launch.html', function(req,res){
	res.sendFile(__dirname + "/epic/launch.html");
});

app.get('/epic/index.html', function(req,res){
	res.sendFile(__dirname + "/epic/index.html");
});

app.get('/', function(req,res){
	res.sendFile(__dirname + "/portofolio/learning.html");
});

app.get('/launch.html',function(req,res){
	res.sendFile(__dirname + "/launch.html");
});

app.get('/index.html',function(req,res){
        res.sendFile(__dirname + "/index.html");
});

app.get('/newnew.html', function(req,res){
	res.sendFile(__dirname + "/newnew.html");
});

app.get('/logo.png',function(req,res){
        res.sendFile(__dirname + "/logo.png");

});

app.get('/sof-auth/launch.html', function(req,res){
	res.sendFile(__dirname + "/sof-auth/launch.html");
});

app.get('/sof-auth/index.html', function(req,res){
	res.sendFile(__dirname + "/sof-auth/index.html");
});

app.get('/sof-auth/logo.png', function(req,res){
	res.sendFile(__dirname + "/sof-auth/logo.png");
});

app.get('/sof-outSession/launch.html', function(req,res){
	res.sendFile(__dirname + "/sof-outSession/launch.html");
});

app.get('/sof-outSession/index.html', function(req,res){
	res.sendFile(__dirname + "/sof-outSession/index.html");
});

app.get('/sof-outSession/logo.png', function(req,res){
	res.sendFile(__dirname + "/sof-outSession/logo.png");
});

app.listen(8000,function(){
	console.log("success!");
});
