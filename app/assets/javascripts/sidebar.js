$(function() {
  var user_id = $('#user_id').val()
  $('.new-trip').submit(function(event){
    event.preventDefault()
    var latLng = map.getCenter().lat() + " " + map.getCenter().lng()
    var tripZ = map.getZoom()
    var tripName = $('#trip_name').val()
    var private = $("#private").is(':checked')
    var data = {trip: {name: tripName, center: latLng, zoom: tripZ, private: private}}
    $.ajax({
      type: "POST",
      url: '/users/' + user_id + '/trips',
      data: data
    }).done(function(data){
      prependTripToList(data)
      $('#trip_name').val("")
      $('.new-trip').toggleClass('hidden')
      $('.add-trip-button').toggleClass('add-trip-opacity-animation')
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

  // $('#sidebar').on('click', '#all-trips', function(){
  //   $('#user-trips').toggleClass('hidden')
  //   $('#trips-title a .fa').toggleClass('fa-sort-asc')
  //   $('.t-underline').toggleClass('underline-animation')
  //   $('.add-trip-button').toggleClass('add-trip-opacity-animation')
  // })
    $('.add-trip-button').hide()

    $('#trips-header, #all-trips i').on('click', function(){
    $('#user-trips').toggleClass('hidden')
    $('#trips-title a .fa').toggleClass('fa-sort-asc')
    $('.t-underline').toggleClass('underline-animation')

    if($('#user-trips').hasClass('hidden')) {
      $('.add-trip-button').removeClass('add-trip-opacity-animation')
      $('.add-trip-button').hide()
    } else {
      $('.add-trip-button').show()
      $('.add-trip-button').addClass('add-trip-opacity-animation')
    }
  })

  $('.add-trip-button').on('click', function(){
    $('.new-trip').toggleClass('hidden')
    $('.add-trip-button').toggleClass('add-trip-opacity-animation')
  })

  $('#sidebar').on('click', '#friend-list', function(){
    $('#friends').toggleClass('hidden')
    $('#friend-list a .fa').toggleClass('fa-rotate-180')
    $('.f-underline').toggleClass('underline-animation')
  })

  $('#sidebar').on('click', '#user-home', function(){
    $('#user-box').toggleClass('hidden')
    $('#user-home a .fa').toggleClass('fa-rotate-180')
  })



});

function prependTripToList(data){
  var template = $('#trip-template')
  template.find('a').attr('href', "/users/" + user_id + "/trips/" + data.id).text(data.name)
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
