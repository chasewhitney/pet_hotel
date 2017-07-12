$(document).ready(function() {
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
  // clear current div

  // big for loop that loops through data and appends to correct positions in DOM
  for(var i = 0; i < pets.length; i+= 1) {
    var pet = pets[i];
    var $tr = $('<tr data-petid="' + pet.id + '"></tr>');
    // $tr.data('pet', pet);
    $tr.append('<td>' + pet.owner.first_name + ' ' + pet.owner.last_name + '</td>');
    $tr.append('<td>' + pet.name + '</td>');
    $tr.append('<td>' + pet.breed + '</td>');
    $tr.append('<td>' + pet.breed + '</td>');
    $tr.append('<td>' + pet.color + '</td>');
    // remember to create click listener for Go that selects petid
    $tr.append('<button>Go' + pet.color + '</td>');
    // if pet is already complete just add Delete button
    if(pet.status == "complete") {
      $tr.append('<td><button class= "deleteBtn" data-petid="'+ pet.id +'">Delete</button></td>');
      $('#petTable').append($tr);
    }
    // otherwise add Done and Delete button
    else {
      $tr.append('<td><button class="mark ' + pet.status + '">Done</button>' +
      '<button class= "deleteBtn" data-petid="'+ pet.id +'">Delete</button></td>');
      //  incomplete pets go to top of table
      $('#petList').prepend($tr);


}
