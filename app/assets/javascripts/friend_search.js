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
    //$('#add-friends-section')
  })

  $('#query-results').on('click', 'a.unsent', function(){
    event.preventDefault()
    var name = $(event.target).text()
    $(event.target).text(name + ' - request sent')
    $(event.target).removeClass('unsent')
    $(event.target).addClass('sent')
      // href = $(event.target).attr('href')
      // $(event.target).append('<p id="yes">Add friend?</p>')
  })

  $('#query-results').on('click', 'a.sent', function(){
    event.preventDefault()
    alert('Request already sent')
  })

})
