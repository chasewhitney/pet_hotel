$(document).ready(function() {
  console.log('js loaded');
  addClickHandlers();
  refreshPets();
}); // end of document.ready

// route is /pets

function addClickHandlers() {
 // listen for add owner button and call addPet(petToAdd);
 $('#register').on('click', function() {
  // var petId = $(this).parent().parent().data('taskid');
  var newOwner = {};
  newOwner.first_name = $('#firstName').val();
  newOwner.last_name = $('#lastName').val();
  addOwner(newOwner);
  console.log('Register button clicked, newOwner:', newOwner);
  $('#ownerRegistration').val('');
  });
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
} // end of addPet

// for addOwner remember to seperate first and last name before sending to server


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

// this function fills in table
function appendToDom(pets) {
  console.log('APD called');
  // clear current div
  // big for loop that loops through data and appends to correct positions in DOM
  for(var i = 0; i < pets.length; i+= 1) {
    var pet = pets[i];
    var $tr = $('<tr data-petid="' + pet.id + '"></tr>');
    // for each pet row append Owner, Pet Name, Breed, Color, and three buttons -- Update, Delete, Check In/Out
    $tr.append('<td>' + pet.first_name + ' ' + pet.last_name + '</td>');
    $tr.append('<td><div contenteditable>' + pet.name + '</div></td>');
    $tr.append('<td><div contenteditable>' + pet.breed + '</div></td>');
    $tr.append('<td><div contenteditable>' + pet.color + '</div></td>');
    // remember to create click listener for Go that selects petid
    $tr.append('<td><button class="updateBtn" data-petid="' + pet.id + '">Go</button></td>');
    $tr.append('<td><button class= "deleteBtn" data-petid="'+ pet.id +'">Delete</button></td>');
    if(pet.check_in_date === null) {
      $tr.append('<td><button class= "checkBtn" data-petid="'+ pet.id +'">Check In</button></td>');
    }
    else {
      $tr.append('<td><button class= "checkBtn" data-petid="'+ pet.id +'">Check Out</button></td>');
    }
    $('#petTable').append($tr);
    console.log($tr);
  }
}
