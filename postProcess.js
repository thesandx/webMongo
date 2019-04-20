exports.userDeatil= function(req,res){
	response = {
			first_name:req.query.first_name,
			last_name:req.query.last_name
		};

		console.log(response);
		res.end(JSON.stringify(response));
}