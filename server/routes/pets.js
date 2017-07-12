var express = require('express');
var router = express.Router();

var poolModule = require('../modules/pool.js');
var pool = poolModule;

router.get('/', function(req,res){
  console.log('in get pets route');
    pool.connect(function(errConnectingToDatabase, db, done){
      if(errConnectingToDatabase) {
        console.log('There was an error connecting to the database', errConnectingToDatabase);
        res.sendStatus(500);
      } else {
        queryText = 'SELECT owner_id, pet_id, first_name, last_name, name, breed, color, check_in_date, check_out_date from owners JOIN pets on pets.owner_id = owners.id JOIN visits on pets.id = visits.pet_id;';
        db.query(queryText, function(errMakingQuery, result){
          done();
          if(errMakingQuery) {
            console.log('There was an error making the SELECT query', errMakingQuery);
            res.sendStatus(500);
          } else {
            res.send({pets: result.rows});
          }
        });
      }
    });
});

module.exports = router;
