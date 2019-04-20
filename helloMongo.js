
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url,function(err,db){
	if(err) throw err;

	var dbo = db.db("mydb");
	//dbo.createCollection("customers",function(err,res){
		var customer = {
			name:"sandeep",
			mobile:9801609577

		};

		/*dbo.collection("customers").insertOne(
			customer,function(err,res){
				if(err) throw err;
				console.log("1 Document inserted")
			db.close();	
			}); */


			dbo.collection("customers").find({}).toArray(function(err, result) {
   				 if (err) throw err;
    				console.log(result);
    				db.close();
  });



		
	});

	//console.log("DataBase Created");