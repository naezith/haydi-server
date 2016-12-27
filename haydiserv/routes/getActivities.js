var express = require('express');
var async = require('async');
var utils = require('./custom_utils.js');

module.exports = function(database){
	var router = express.Router();
	
	router.post('/', function(req, res, next) {
		function getGuests(act){
			return function(callback){
				database.query('SELECT *, (SELECT status FROM act_guest WHERE activity_id = ? AND user.id = user_id) AS status ' +
												'FROM user WHERE id IN(SELECT user_id FROM act_guest WHERE activity_id = ?)', 
												[act.id, act.id], function(err, results, fields){ 
					if(err) return callback(null, false);
					
					act.guests = results;
					
					callback(null, true); 
				});
			};
		}
		
		database.query('SELECT * FROM activity WHERE id IN (SELECT activity_id FROM act_guest WHERE user_id = ? AND status < 2)', 
				[req.body.user_id], function(err, results, fields){
			if(err){
				console.log(err);
				res.json({ status: utils.respondMSG.DB_ERROR });
			}
			else{
				var acts = results;
				var queries = [];
				
				for(var i = 0; i < acts.length; ++i) queries.push(getGuests(acts[i]));
				
				async.parallel(queries, function(err, results, fields){
					res.json({ 
						status: utils.respondMSG.SUCCEED,
						data: {
							activities : acts
						}
					});
				});
			}
		});
	});
	return router;
};