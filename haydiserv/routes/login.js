var express = require('express');
var utils = require('./custom_utils.js');

module.exports = function(database){
	var router = express.Router();
	
	router.post('/', function(req, res, next) {
		database.query('INSERT INTO user (name, phone) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)', 
				[req.body.name, req.body.phone], function(err, results, fields){
			if(err){
				//console.log(err);
				res.json({ status: utils.respondMSG.DB_ERROR });
			}
			else{
				database.query('SELECT id FROM user WHERE phone = ?', 
						[req.body.phone], function(err, results, fields){
					if(err){
						//console.log(err);
						res.json({ status: utils.respondMSG.DB_ERROR });
					}
					else res.json({ 
						status: utils.respondMSG.SUCCEED,
						data: {
							id : results[0].id
						}
					});
				});
			}
		});
	});
	return router;
};