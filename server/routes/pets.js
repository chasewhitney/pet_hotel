var express = require('express');
var router = express.Router();

var poolModule = require('../modules/pool.js');
var pool = poolModule;

//CREATE aka post for pet owner name inputs
router.post('/owner', function(req, res){
  var owner = req.body;
  console.log('in post route', req.body);
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to the database', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      var queryText= 'INSERT INTO owners ("first_name", "last_name") VALUES ($1, $2);';
      db.query(queryText,[owner.first_name, owner.last_name], function(errMakingQuery, result){
        done();
        if(errMakingQuery) {
          console.log('There was an error making the INSERT query', errMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });//end of pool
});//end of post

//post for pet name, color, breed inputs
router.post('/', function(req, res){
  var pets= req.body;
  console.log('in post route', req.body);
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to the database', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      var queryText='INSERT INTO pets ("name", "color", "breed", "owner_id") VALUES($1, $2, $3, $4);';
      db.query(queryText, [pets.name, pets.color, pets.breed, pets.owner_id], function(errMakingQuery, result){
        done();
        if(errMakingQuery) {
          console.log('There was an error making the INSERT query', errMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });//end of pool
});//end of post

//get for the pet information --- populates table on DOM
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
}); //end of get

//DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'DELETE FROM pets WHERE id = $1;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
});

module.exports = router;
