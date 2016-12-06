var express = require('express');
var utils = require('./custom_utils.js');

module.exports = function(database){
	var router = express.Router();
	
	router.post('/', function(req, res, next) {
		database.query('UPDATE act_guest SET status = ? WHERE user_id = ? AND activity_id = ? LIMIT 1', 
				[req.body.status, req.body.user_id, req.body.activity_id], function(err, results, fields){
			if(err){
				//console.log(err);
				res.json({ status: utils.respondMSG.DB_ERROR });
			}
			else {
				res.json({ status: utils.respondMSG.SUCCEED });
			}
		});
	});
	return router;
};