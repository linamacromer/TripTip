$(function() {

  $('#search_name').keyup(function(){
  query = $('#search_name').val()
    url = "/users/search/" + query
    $.get( url, function(data) {
      $('#query-results').empty()
      for (i = 0; i < data.length; i++) {
        $('#query-results').append("<p id='searched-friend'><a class='unsent' href='/users/" + data[i].id + "'>" + data[i].name + "</a></p>")
      }
    });
  })

  $('#query-results').on('click', 'a.unsent', function(){
    event.preventDefault()
    var name = $(event.target).text()
    var self = $(event.target)
    var id = $('#user_id').val()
    var url = '/users/' + id + '/friends'

    $.post( url, {name: name})
      .done(function() {
        updateRequestText(self, name)
      });
  })

  $('#query-results').on('click', 'a.sent', function(){
    event.preventDefault()
  })

  $('#sidebar').on('click', '#friend-list', function(){
    $('#pending').empty()
    var id = $('#user_id').val()
    var url = "/users/" + id + "/friends/pending"
    $.get( url, function(requests) {
      if (requests.length > 0){
        $('#pending').append('<li><h4>Pending friend requests:</h4></li>')
      }
      for (var i = 0; i < requests.length; i++) {
        $('#pending').append('<li><p><a class="confirmation" href="/users/' + id + '/friends/' + requests[i].id + '">' + requests[i].name + '</a></p></li>')
      }
    })
  })

  $('#sidebar').on('click', '.confirmation', function(){
    event.preventDefault()
    var name = $(event.target).text()
    var self = $(event.target)
    url = $(event.target).attr('href')
    $.ajax({
      method: "PUT",
      url: url
    })
    .done(function(data){
      updateConfirmationText(self, name)
      addUserToFriends(data)
      setTimeout(function(){
      removePending()
      }, 2900)
    })
  })

  $('#sidebar').on('click', '.confirmed', function(){
    event.preventDefault()
  })


})

function updateRequestText(self, name){
  self.fadeOut(450)
  setTimeout(function(){
      self.text(name + ' - request sent')
  }, 450)
  self.fadeIn(450)
  self.removeClass('unsent')
  self.addClass('sent')
}

function updateConfirmationText(self, name){
  self.removeClass('confirmation')
  self.addClass('confirmed')
  self.fadeOut(250)
  setTimeout(function(){
      self.text(name + ' - friend added')
  }, 250)
  self.fadeIn(250).fadeOut(2000)
  setTimeout(function(){
    self.parent().parent().remove()
  }, 2500)
}

function addUserToFriends(data){
  var friend = data.friend
  var trips = data.trips
  $('#friends li:first').after('<li id="friend-name" class="new-friend"><a href="/users/' + friend.id + '/trips">' + friend.name + '</a></li>')
  if (trips.length > 0){
    $('.new-friend').after('<ul class="friend-trips new-trip">')
    for (var i = 0; i < trips.length; i++) {
      $('.new-trip').append('<li class="trip-items"><a class="sub-li" data="' + trips[i].id + '" href="/users/' + trips[i].user_id + '/trips/'+trips[i].id + '">' + trips[i].name + '</a></li>')
    }
    $('.new-trip').removeClass('new-trip')
    $('.new-friend li:last').after('</ul>')
    $('.new-friend').removeClass('new-friend')
  }
}

function removePending(){
  if ($('#pending').children().length == 1) {
    $('#pending').remove()
  }
}

