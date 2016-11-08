var map;
var markers = [];
var service;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6065883, lng: -122.3479708},
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    zoom: 12,
    clickableIcons: false
  });
  service = new google.maps.places.PlacesService(map);

  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      map.setZoom(12);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(12);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    marker.setVisible(true);
    markers.push(marker);

    info = buildInfoWindow(place);
    
    infowindow.setContent(info);
    infowindow.open(map, marker);
  });
}

function  buildInfoWindow(place) {
    $form = $('#add-tip-form').clone();
    form = $form.wrap('<p/>').parent()
    name = place.name
    address = place.formatted_address
    place_id = place.place_id
    info = '<div><strong>' + name + '</strong><br>' + address +
        '<br>' 


    if (form.length === 0){
        return info + '<em>Select a trip to add location</em>'
    } else {
        return info + setForm(form,place)
    }
    
}

function setForm(form, place){
    $(form).find('input[name="tip[name]"]').val(place.name)
    $(form).find('input[name="tip[place_id]"]').val(place.place_id)
    $(form).find('#add-tip-form').removeClass('hidden')
    return $(form).html()

}

function addMarker(lat, lng) {
    var myLatLng = {lat: lat, lng: lng}
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng
    });

    markers.push(marker);
}
// Sets the map on all markers in the array.

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
// Removes the markers from the map, but keeps them inthe array.
function clearMarkers() {
  setMapOnAll(null);
}
// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}
// Deletes all markers in the array by removingreferences to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

