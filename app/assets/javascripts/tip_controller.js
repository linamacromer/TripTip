function submitTip(event) {
  event.preventDefault()
  var url = $(event.target).attr('action')
  var data = $(event.target).serialize()
    
  $.ajax({
    type: "POST",
    url: url,
    data: data
  }).done(function(data){
    $(event.target).find('input[name="commit"]').addClass('hidden')
    $(event.target).parent().append('<p>Added</p>')
    $('#tip-list').prepend(data)
  }).fail(function(data){
    error_text = data.responseJSON.place_id[0]
    $(event.target).find('input[name="commit"]').addClass('hidden')
    $(event.target).append('<p class="error">' + error_text + '</p>')
  })
}

function loadMarkers(data){
  for (var i = data.length - 1; i >= 0; i--) {
    addMarker(data[i].lat, data[i].lng)
  }
}


