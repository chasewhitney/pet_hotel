$(document).ready(function() {
  console.log('js loaded');
  addClickHandlers();
  refreshPets();
}); // end of document.ready

// route is /pets

function addClickHandlers() {
 // listen for add owner button and call addOwner(petToAdd);
 $('#register').on('click', function() {
  // var petId = $(this).parent().parent().data('taskid');
  var newOwner = {};
  newOwner.first_name = $('#firstName').val();
  newOwner.last_name = $('#lastName').val();
  addOwner(newOwner);
  console.log('Register button clicked, newOwner:', newOwner);
  $('#ownerRegistration').val('');
  });

  // listen for add pet button and call addPet(petToAdd);
  $('#addPet').on('click', function() {
   // var petId = $(this).parent().parent().data('taskid');
   var newOwner = {};
   newOwner.owner = $('ownerName').val();
   newOwner.name = $('#petName').val();
   newOwner.breed = $('#petBreed').val();
   newOwner.color = $('#petColor').val();
   addOwner(newOwner);
   console.log('Register button clicked, newPet:', newOwner);
   $('#pets').val('');
   });

   //edit
   $('#petTable').on('click', '.updateBtn', function(){

     editPet(deleteId);
   });


   //delete
   $('#petTable').on('click', '.deleteBtn', function(){
     var deleteId = $(this).data('petid');
     console.log('delete id:', deleteId);
     deletePet(deleteId);
   });
   //check-in

   //check-out

}

// CREATE a.k.a. POST a.k.a. INSERT
function addOwner(ownerToAdd) {
  $.ajax({
    type: 'POST',
    url: '/pets/owner',
    data: ownerToAdd,
    success: function(response) {
      console.log('Response from server.');
    }
  });
} // end of addOwner

// CREATE a.k.a. POST a.k.a. INSERT
function addPet(petToAdd) {
  $.ajax({
    type: 'POST',
    url: '/pets',
    data: petToAdd,
    success: function(response) {
      console.log('Response from server.');
    }
  });
} // end of addPet

// READ a.k.a. GET a.k.a. SELECT
function refreshPets() {
  $.ajax({
    type: 'GET',
    url: '/pets',
    success: function(response) {
      console.log("GET response", response.pets);
      appendToDom(response.pets);
    },
  });
} // end of refreshPets

// list functionality


// this function fills in table
function appendToDom(pets) {
  console.log('APD called, pets:', pets);
  // clear current div
  // big for loop that loops through data and appends to correct positions in DOM
  for(var i = 0; i < pets.length; i+= 1) {
    var pet = pets[i];
    var $tr = $('<tr data-petid="' + pet.pet_id + '" data-ownerid ="' + pet.owner_id + '" ></tr>');
    // for each pet row append Owner, Pet Name, Breed, Color, and three buttons -- Update, Delete, Check In/Out
    $tr.append('<td>' + pet.first_name + ' ' + pet.last_name + '</td>');
    $tr.append('<td><div contenteditable>' + pet.name + '</div></td>');
    $tr.append('<td><div contenteditable>' + pet.breed + '</div></td>');
    $tr.append('<td><div contenteditable>' + pet.color + '</div></td>');
    // remember to create click listener for Go that selects petid
    $tr.append('<td><button class="updateBtn" data-petid="' + pet.pet_id + '">Go</button></td>');
    $tr.append('<td><button class="deleteBtn" data-petid="'+ pet.pet_id +'">Delete</button></td>');
    if(pet.check_in_date === null) {
      $tr.append('<td><button class= "checkBtn" data-petid="'+ pet.pet_id +'">Check In</button></td>');
    }
    else {
      $tr.append('<td><button class= "checkBtn" data-petid="'+ pet.pet_id +'">Check Out</button></td>');
    }
    $('#petTable').append($tr);
    $('select').append('<option>' + pet.first_name + ' ' + pet.last_name + '</option>');
    console.log($tr);
  }
}

//edit
// UPDATE a.k.a. PUT
function editPet(petId) {
  $.ajax({
    type: 'PUT',
    url: '/pets/' + petId,
    data: petId,
    success: function(response) {
      console.log("Put response", response);
      refreshPets();
    }
  });
}

// DELETE
function deletePet(petId) {
  // When using URL params, your url would be...
  // '/tasks/' + bookId
  // YOUR AJAX CODE HERE
  $.ajax({
    type: 'DELETE',
    url: '/pets/' + petId,
    success: function(response) {
      console.log("Delete response", response);
      refreshPets();
    }
  });
}

//check-in

//check-out
