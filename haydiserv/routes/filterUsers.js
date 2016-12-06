var express = require('express');
var utils = require('./custom_utils.js');

module.exports = function(database){
	var router = express.Router();
	
	router.post('/', function(req, res, next) {
		database.query('SELECT id, name, phone FROM user WHERE phone IN (?)', 
				[req.body.phones], function(err, results, fields){
			if(err){
				//console.log(err);
				res.json({ status: utils.respondMSG.DB_ERROR });
			}
			else res.json({ 
				status: utils.respondMSG.SUCCEED,
				data: {
					users : results
				}
			});
		});
	});
	return router;
};