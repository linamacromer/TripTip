$(function() {
  $('.new-trip').submit(function(event){
    event.preventDefault()
    var latLng = map.getCenter().lat() + " " + map.getCenter().lng()
    var tripZ = map.getZoom()
    var id = $('#user_id').val()
    var tripName = $('#trip_name').val()
    var data = {trip: {name: tripName, center: latLng, zoom: tripZ}}
    $.ajax({
      type: "POST",
      url: '/users/' + id + '/trips',
      data: data
    }).done(function(data){
      prependTripToList(data)
    })
  })

  $('.trip-items').on('click', 'a', function(event){
    event.preventDefault()
    var url = $(event.target).attr('href')
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
  var clone = $('#trip-template').clone()
  clone.find('a').attr('href', "/users/" + id + "/trips/" + data.id).text(data.name)
  $('#user-trips').append(clone)
  $('.trip-items').last().removeClass('hidden')
}
