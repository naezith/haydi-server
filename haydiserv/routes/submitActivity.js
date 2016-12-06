var express = require('express');
var utils = require('./custom_utils.js');

module.exports = function(database){
	var router = express.Router();
	
	router.post('/', function(req, res, next) {
		database.query('INSERT INTO activity (author_id, name, date, time, location) VALUES (?, ?, ?, ?, ?)', 
				[req.body.author_id, req.body.name, req.body.date, req.body.time, req.body.location], function(err, results, fields){
			if(err){
				//console.log(err);
				res.json({ status: utils.respondMSG.DB_ERROR });
			}
			else {
				var act_id = results.insertId;
				database.query('INSERT INTO act_guest (user_id, activity_id, status) VALUES ?', 
						[req.body.guests.map(function(g){ return [g, act_id, 0]; })], function(err, results, fields){
					if(err){
						//console.log(err);
						res.json({ status: utils.respondMSG.DB_ERROR });
					}
					else {
						res.json({ 
							status: utils.respondMSG.SUCCEED,
							data: {
								activity_id : act_id
							}
						});
					}
				});
			}
		});
	});
	return router;
};