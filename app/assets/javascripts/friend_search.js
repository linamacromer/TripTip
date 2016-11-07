$(function() {

  $('#search_name').keyup(function(){
  query = $('#search_name').val()
    url = "/users/search/" + query
    $.get( url, function(data) {
      $('#query-results').empty()
      for (i = 0; i < data.length; i++) {
        $('#query-results').append("<p id='searched-friend'><a href='/users/" + data[i].id + "'>" + data[i].name + "</a></p>")
      }
    });
    //$('#add-friends-section')
  })

  $('#query-results').on('click', 'a', function(){
    event.preventDefault()
    alert('Add friend?')
      // href = $(event.target).attr('href')
      // $(event.target).append('<p id="yes">Add friend?</p>')
  })

})
