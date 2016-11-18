var express = require('express');
var utils = require('./custom_utils.js');

module.exports = function(database){
	var router = express.Router();
	
	router.get('/', function(req, res, next) {
		res.writeHead(200, {"Content-Type": "application/json"});
		var json = JSON.stringify({ 
			data: {
				category : "Chitchat",
				location : "Boss' House",
				date : "15.12.2016",
				time : "21:30",
				guests : [
					{name : "Tolga", phone: "05403331144"},
					{name : "Samir", phone: "06659991133"},
					{name : "Ercan", phone: "01115557711"},
					{name : "Mustafa", phone: "04443331165"}
				]
			}
			/*status: utils.respondMSG.SUCCEED, 
			answer: 'Aleyküm Selam',*/
		});
		res.end(json);
	});
	return router;
};