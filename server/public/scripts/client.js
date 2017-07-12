$(document).ready(function() {
  console.log('js loaded');
  addClickHandlers();
  refreshPets();
}); // end of document.ready

// route is /pets

function addClickHandlers() {

}

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

// this function fills in page
function appendToDom(pets) {
  console.log('APD called');
  // clear current div
  // big for loop that loops through data and appends to correct positions in DOM
  for(var i = 0; i < pets.length; i+= 1) {
    var pet = pets[i];
    var $tr = $('<tr data-petid="' + pet.id + '"></tr>');
    // $tr.data('pet', pet);

    $tr.append('<td>' + pet.first_name + ' ' + pet.last_name + '</td>');
    $tr.append('<td>' + pet.name + '</td>');
    $tr.append('<td>' + pet.breed + '</td>');
    $tr.append('<td>' + pet.breed + '</td>');
    $tr.append('<td>' + pet.color + '</td>');
    // remember to create click listener for Go that selects petid
    $tr.append('<td><button data-petid="' + pet.id + '">Go</button></td>');
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
