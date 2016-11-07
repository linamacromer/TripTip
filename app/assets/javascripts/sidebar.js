$(function() {
  var user_id = $('#user_id').val()
  $('.new-trip').submit(function(event){
    event.preventDefault()
    var latLng = map.getCenter().lat() + " " + map.getCenter().lng()
    var tripZ = map.getZoom()
    var id = $('#user_id').val()
    var data = {trip: {name: tripName, center: latLng, zoom: tripZ}}
    $.ajax({
      type: "POST",
      url: '/users/' + user_id + '/trips',
      data: data
    }).done(function(data){
      prependTripToList(data)
      $('#trip_name').val("")
    })
  })

  $('.trip-items').on('click', 'a', function(event){
    event.preventDefault()
    remove_temp_nav()
    var url = $(event.target).attr('href')
    get_tips_list(url, event)

    $.get( url, function(data) {
      zoom = data.zoom
      center = data.center.split(" ")
      latlng = new google.maps.LatLng(center[0], center[1])
      map.panTo(latlng)
      map.setZoom(zoom)
    });

  })

  $('#sidebar').on('click', '#user-home', function(){
    $('#user-box').toggleClass('hidden')
  })

  $('#sidebar').on('click', '#friend-list', function(){
    $('#friends').toggleClass('hidden')
  })

  $('#sidebar').on('click', '#trips-title', function(){
    $('#user-trips').toggleClass('hidden')
  })
});

function prependTripToList(data){
  var id = $('#user_id').val()
  var template = $('#trip-template')
  template.find('a').attr('href', "/users/" + id + "/trips/" + data.id).text(data.name)
  $(template).removeClass('hidden')
}

function get_tips_list(url,self){
    $.ajax({
      type: "GET",
      url: url + '/tips'
    })
    .done(function(data){
      add_to_nav(data)
    })
}

function add_to_nav(html){
  $('#nav').append(html)
}

function remove_temp_nav(){
  $('#temp-section').remove()
}

function add_list(data){

}
