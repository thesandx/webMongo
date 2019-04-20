var express = require('express');
var app = express();
var helloVenus = require("./helloVenus.js");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

//section 3.18 handelling POST request
//first write npm install body-parser
var bodyParser = require("body-parser");

const postProcess = require("./postProcess.js");



//1.to send html file
app.get('/index',function(req,res){
	res.sendFile(__dirname+"/"+"index.html");
})

app.get('/hello.html',function(req,res){
	res.sendFile(__dirname+"/"+"hello.html");
})

app.get("/home",function(req,res){
	res.sendFile(__dirname+"/"+"home.html");
})



//2.to handle post request
//a.import body parser
//b.
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/process_post",function(req,res){
	MongoClient.connect(url,function(err,db){
	if(err) throw err;

	var dbo = db.db("mydb");

	response = {
			first_name:req.body.first_name,
			last_name:req.body.last_name
		};

		dbo.collection("customers").insertOne(
			response,function(err,res){
				if(err) throw err;
				console.log("1 Document inserted")
			db.close();	
			});






		console.log(response);
		res.status(200).json(response);
	});
});


app.get("/showUser",function(req,res){

	MongoClient.connect(url,function(err,db){
	if(err) throw err;

	var dbo = db.db("mydb");


	dbo.collection("customers").find({}).toArray(function(err, result) {
   				 if (err) throw err;


    				console.log(result);
    				res.status(200).json(result);
    				db.close();
  });


});
});



	//first make a json object from 
	//req me jao,then body->first name given in html form>

app.use("/hello",helloVenus.hello);
app.use(function(req,res){
	res.sendFile(__dirname+"/"+"404Error.html");
	//res.send("404-pagenot found");
})



var server = app.listen(8081,function(){
	var host  = server.address().address
	var port = server.address().port

	console.log("app is running at http://%s:%s",host,port)
	
})
