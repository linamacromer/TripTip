$(function() {

  $(document).on('submit','#add-tip-form', submitTip)

  var user_id = $('#user_id').val()
  $('.new-trip').submit(function(event){
    event.preventDefault()
    var latLng = map.getCenter().lat() + " " + map.getCenter().lng()
    var tripZ = map.getZoom()
    var id = $('#user_id').val()
    var tripName = $('#trip_name').val()
    var private = $("#private").is(':checked')
    var data = {trip: {name: tripName, center: latLng, zoom: tripZ, private: private}}
    $.ajax({
      type: "POST",
      url: '/users/' + id + '/trips',
      data: data
    }).done(function(data){
      prependTripToList(data)
      $('#trip_name').val("")
      $('.new-trip').toggleClass('hidden')
      $('.add-trip-button').show()
      $('.add-trip-button').toggleClass('add-trip-opacity-animation')
    })
  })


  $('.trip-items').on('click', 'a.trip-map', function(event){
    event.preventDefault()
    remove_temp_nav()
    clearMarkers()
    var url = $(event.target).attr('href')

    $.get( url, function(data) {
      zoom = data.zoom
      center = data.center.split(" ")
      latlng = new google.maps.LatLng(center[0], center[1])
      map.panTo(latlng)
      map.setZoom(zoom)
      get_tips_list(url, event)
      get_tip_markers(url)
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

      if($('#user-trips').hasClass('hidden') || $('#trip_name').is(':visible')) {
        $('.add-trip-button').removeClass('add-trip-opacity-animation')
        $('.add-trip-button').hide()
        $('#trips-header').css('width', '90%')
      } else {
        $('.add-trip-button').show()
        $('.add-trip-button').addClass('add-trip-opacity-animation')
        $('#trips-header').css('width', '64.43%')
      }
    })

  $('.add-trip-button, .fa-plus-square').on('click', function(){
    if(!$('#user-trips').hasClass('hidden')) {
      $('.new-trip').toggleClass('hidden')
      $('.add-trip-button').toggleClass('add-trip-opacity-animation')
      $('.add-trip-button').hide()
      $('input#trip_name').focus()
    }
  })

  $('.add-friend-button').hide()

  $('#friends-header, #friend-list a i').on('click', function(){
    $('#friends').toggleClass('hidden')
    $('#add-friends-section').toggleClass('hidden')
    $('#pending').toggleClass('hidden')
    $('#friend-list a .fa').toggleClass('fa-rotate-180')
    $('.f-underline').toggleClass('underline-animation')

    if($('#add-friends-section').hasClass('hidden') || $('#search_name').is(':visible')) {
      $('.add-friend-button').removeClass('add-friend-opacity-animation')
      $('.add-friend-button').hide()
      $('#friends-header').css('width', '80%')
    } else {
      $('.add-friend-button').show()
      $('.add-friend-button').addClass('add-friend-opacity-animation')
      $('#friends-header').css('width', '64.43%')
    }
  })

  $('.add-friend-button').on('click', function(){
    if(!$('#add-friends-section').hasClass('hidden')) {
      $('#search').toggleClass('hidden')
      $('.add-friend-button').toggleClass('add-friend-opacity-animation')
      $('.add-friend-button').hide()
      $('input#search_name').focus()
    }
  })

  // if(!$('#user-trips').hasClass('hidden')) {
  //   $('*:not(#user-trips)').on('click', function() {
  //     $('#user-trips').toggleClass('hidden')
  //   })
  // }

  $('.trip-edits').on('click', ".trip-update", function(event) {
    event.preventDefault();
    var $pencil = $(this)
    var $tripContainer = this.parentElement.parentElement;
    var $tripLink = $($tripContainer).find('a.trip-map');
    var $tripURL = this.pathname
    var $tripName = $tripLink.text();
    var $form = $("<form id='trip-update-form' action=" + $tripURL + "></form>");
    $form.append("<input type='text' name='trip[name]' id='trip_name' value='" + $tripName + "'>");
    $form.append("<button type='submit' id='trip-update-button'>Update</button>");
    $($tripContainer).prepend($form);
    $tripLink.hide();
    $pencil.hide();
  })

  $('.trip-items').on('click', '#trip-update-button', function(event) {
    event.preventDefault();
    var $form = $(this).closest('form');
    var $data = $form.serialize();
    var $url = $form.attr('action');
    var $tripContainer = this.parentElement.parentElement;
    var $tripLink = $($tripContainer).find('a.trip-map');
    var $pencil = $($tripContainer).find('a.trip-update');
    $.ajax({
      type: "patch",
      url: $url,
      data: $data
    }).done(function(response) {
      $form.hide();
      $pencil.show();
      $tripLink.html(response.name)
      $tripLink.show();
    })
  })

  $('.trip-edits').on('click', ".trip-delete", function(event) {
    event.preventDefault();
    var $trip = this.parentElement.parentElement;
    var answer=confirm('Are you sure you want to delete this trip?');
      if(answer){
        $.ajax({
          type: "delete",
          url: this.pathname,
        }).done(function(response) {
          $trip.remove()
        })
      }
  })

});

function prependTripToList(data){
  var user_id = $('#user_id').val()
  var template = $('#trip-template').clone()
  var link = "/users/" + user_id + "/trips/" + data.id
  template.find('.trip-map').attr('href', link).text(data.name)
  template.find('.trip-update').attr('href', link)
  template.find('.trip-delete').attr('href', link)
  template.removeClass('hidden')
  $("#user-trips > li:nth-child(2)").after(template);
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

function get_tip_markers(url){
    $.ajax({
      dataType: "json",
      type: "GET",
      url: url + '/tips'
    })
    .done(function(data){
      loadMarkers(data)
    })
}

function add_to_nav(html){
  $('#nav').append(html)
}

function remove_temp_nav(){
  $('#temp-section').remove()
}
