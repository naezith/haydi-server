var express = require('express');
var utils = require('./custom_utils.js');

module.exports = function(database){
	var router = express.Router();
	
	router.post('/', function(req, res, next) {
		res.writeHead(200, {"Content-Type": "application/json"});
		database.query('SELECT * FROM activity WHERE id IN (SELECT activity_id FROM act_guest WHERE user_id = ?)', 
				[req.body.user_id], function(err, results, fields){
			if(err){
				console.log(err);
				res.end(JSON.stringify({ status: utils.respondMSG.DB_ERROR }));
			}
			else{
				var acts = results;
				acts.map(function(act){ 
					database.query('SELECT * FROM user WHERE id IN(SELECT user_id FROM act_guest WHERE activity_id = ?)', [act.id], function(err, results, fields){
						if(err){
							console.log(err);
							res.end(JSON.stringify({ status: utils.respondMSG.DB_ERROR }));
						}
						else{
							act.guests = results;
							return act;
						}
					});
				})
			}
		});
	});
	return router;
};