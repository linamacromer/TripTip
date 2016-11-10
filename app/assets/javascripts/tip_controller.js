function submitTip(event) {
  event.preventDefault()
  var url = $(event.target).attr('action')
  var data = $(event.target).serialize()
    
  $.ajax({
    dataType: "json",
    type: "POST",
    url: url,
    data: data
  }).done(function(data){
    search_infoWindow.close()
    $(event.target).find('input[name="commit"]').addClass('hidden')
    $(event.target).parent().append('<p>Added</p>')
    markerPair = addMarker(data)
    openMarker(markerPair.marker, markerPair.infowindow)
    $('#tip-list').prepend(renderTipNavPartial(data))
  }).fail(function(data){
    error_text = data.responseJSON.place_id[0]
    $(event.target).find('input[name="commit"]').addClass('hidden')
    $(event.target).append('<p class="error">' + error_text + '</p>')
  })
}

function loadMarkers(data){
  for (var i = data.length - 1; i >= 0; i--) {
    addMarker(data[i])
  }
}

function openMarker(marker, infowindow){
  event.preventDefault();
  closeAllInfoWindows();

  if (infowindow == undefined) {
    place_id = $(event.target).data('place_id')
    obj = findMarker(place_id)
    infoWindows[obj.index].open(map,obj.mark)
  } else {
    infowindow.open(map, marker);
  }

}

function findMarker(place_id){
  for (var i = markers.length - 1; i >= 0; i--) {
    if (markers[i].place_id == place_id) {
      return {mark: markers[i], index: i}
    }
  }
}

function updateTipModal(event) {
  event.preventDefault();
  var form = $(event.target)
  var url = form.attr('action')
  var data = $(this).serialize()

  $.ajax({
    type: "PATCH",
    url: url,
    data: data
  }).done(function(data){
    $('#modal-html').html(data)
    $('#modal-html').append('<span class="large-info-updated">Updated!</span>')
    $('.large-info-updated').fadeOut(3000)
  })
}

$(document).on('click', '.gm-style-iw', function(event) {
  var linkTarget = $(event.target).closest('.gm-style-iw').find('a');
  var url = linkTarget.attr('name')
  $.ajax({
    type: "GET",
    url: url
  }).done(function(data){
    $('#modal-html').html(data)
    linkTarget.modal();
  })
})