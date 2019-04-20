function hello(req,res){
	res.send("Venus says hello "+req.body.name);
	console.log("venus says hello "+req.body.name);

}


module.exports = {
	hello:hello
}