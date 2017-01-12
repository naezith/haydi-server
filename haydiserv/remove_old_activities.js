var database = require('mysql').createConnection({
	host: 'localhost',
	user: 'root',
	password: 'unclesam1',
	database: 'haydi_db'
});

database.query('SELECT id FROM activity WHERE UNIX_TIMESTAMP(STR_TO_DATE(date,\'%d %m %Y\')) < UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY))', function(err, results, fields){
	if(results.length == 0) process.exit();
	var ids = results.map(function(obj) { return obj['id']; });
	
	
	database.query('DELETE FROM activity WHERE id IN (?)', [ids], function(err, results, fields){
		if(err) console.log("Problem occured while deleting old activities: ", err);
		else {
			console.log("Old activities are successfully deleted.");
			database.query('DELETE FROM act_guest WHERE activity_id IN (?)', [ids], function(err, results, fields){
				if(err) console.log("Problem occured while deleting old activity guests: ", err);
				else console.log("Old activity guests are successfully deleted.");
				process.exit();
			}); 
		}
	}); 
}); 