$(function() {

  $(document).on('submit','#add-tip-form', submitTip)
  $(document).on('click','.tip-item a', openMarker)
  $(document).on('click','#info-box-title a', openTipShow)
  $(document).on('submit', ".large-modal", updateTipModal)

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


  $('#sidebar').on('click', 'a.trip-map', function(event){
    event.preventDefault()
    remove_tip_nav()
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

      if ($('#friends').is(':visible')){
        $('#friends').addClass('hidden')
        $('#friend-list a .fa').toggleClass('fa-rotate-180')
        $('.f-underline').toggleClass('underline-animation')
        $('.add-friend-button').removeClass('add-friend-opacity-animation')
        $('.add-friend-button').hide()
        $('#friends-header').css('width', '80%')
        $('#pending').toggleClass('hidden')
        $('#add-friends-section').toggleClass('hidden')
      }
      clearMarkers()
      $('#tip-section').remove()
    })

  $('#sidebar').on('click', '.trip-map', function(){
    if ($(event.target).hasClass('sub-li')){
      $(event.target).parent().parent().addClass('hidden')
    }
    if ($('#friends').is(':visible')){
        $('#friends').addClass('hidden')
        $('#friend-list a .fa').toggleClass('fa-rotate-180')
        $('.f-underline').toggleClass('underline-animation')
        $('.add-friend-button').removeClass('add-friend-opacity-animation')
        $('.add-friend-button').hide()
        $('#friends-header').css('width', '80%')
        $('#pending').toggleClass('hidden')
        $('#add-friends-section').toggleClass('hidden')
    }
    if ($('#user-trips').is(':visible')){
      $('#user-trips').addClass('hidden')
      $('#trips-title a .fa').toggleClass('fa-rotate-180')
      $('.t-underline').toggleClass('underline-animation')
      $('.add-trip-button').removeClass('add-trip-opacity-animation')
      $('.add-trip-button').hide()
      $('#trips-header').css('width', '90%')
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

    if ($('#user-trips').is(':visible')){
      $('#user-trips').addClass('hidden')
      $('#trips-title a .fa').toggleClass('fa-rotate-180')
      $('.t-underline').toggleClass('underline-animation')
      $('.add-trip-button').removeClass('add-trip-opacity-animation')
      $('.add-trip-button').hide()
      $('#trips-header').css('width', '90%')
    }
    $('#tip-section').remove()
    clearMarkers()
  })

  $('.add-friend-button').on('click', function(){
    if(!$('#add-friends-section').hasClass('hidden')) {
      $('#search').toggleClass('hidden')
      $('.add-friend-button').toggleClass('add-friend-opacity-animation')
      $('.add-friend-button').hide()
      $('input#search_name').focus()
    }
  })

  $(document).on('click', '#pending-request-header', function() {
    if($('.pending-request').is(':visible')) {
      $('.pending-request').hide()
    } else {
      $('.pending-request').show()
    }
  })

  $(document).on('click', '.confirmation, .declination', function() {
    // var id = $('#user_id').val()
    // var url = "/users/" + id + "/friends/pending"
    //
    // $.get( url, function(requests) {
    //     $('#request-count').text(requests.length)
    // })
  })

  $('#sidebar').on('click', ".trip-update", function(event) {
    event.preventDefault();
    var $pencil = $(this)
    var $tripContainer = this.parentElement.parentElement;
    var $tripLink = $($tripContainer).find('a.trip-map');
    var $tripURL = this.pathname
    var $tripName = $tripLink.text();
    debugger
    var $form = $("<form id='trip-update-form' action=" + $tripURL + "></form>");
    $form.append("<input type='text' name='trip[name]' id='trip_name' value='" + $tripName + "'>");
    $form.append("<button type='submit' id='trip-update-button'>Update</button>");
    $($tripContainer).prepend($form);
    $tripLink.hide();
    $pencil.hide();
  })

  $('#sidebar').on('click', '#trip-update-button', function(event) {
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

  $('#sidebar').on('click', ".trip-delete", function(event) {
    event.preventDefault();
    var $trip = this.parentElement.parentElement;
    var url = this.pathname;
    $.confirm({
      title: 'Delete?',
      content: 'Are you sure you want to delete this trip?',
      buttons: {
        ok: {
          text: 'YES',
          btnClass: 'btn-primary',
          keys: ['enter'],
          action: function(){
            sendUpdate(url, $trip);
          }
        },
        cancel: function(){}
      }
    })
  })

  $('#sidebar').on('click', '#friend-name', function(event){
    event.preventDefault()
    $(event.target).next().toggleClass('hidden')
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

function remove_tip_nav(){
  $('#tip-section').remove()
}

function sendUpdate(url, trip) {
  $.ajax({
    type: "delete",
    url: url,
  }).done(function(response) {
    trip.remove()
  })
}