var express = require('express');
var utils = require('./custom_utils.js');

module.exports = function(database){
	var router = express.Router();
	
	router.post('/', function(req, res, next) {
		res.writeHead(200, {"Content-Type": "application/json"});
		database.query('SELECT name, phone FROM user WHERE phone IN (?)', 
				[req.body.phones], function(err, results, fields){
			if(err){
				//console.log(err);
				res.end(JSON.stringify({ status: utils.respondMSG.DB_ERROR }));
			}
			else res.end(JSON.stringify({ 
				status: utils.respondMSG.SUCCEED,
				data: {
					users : results
				}
			}));
		});
	});
	return router;
};