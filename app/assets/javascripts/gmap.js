var map;
var markers = [];
var infoWindows = [];

var search_marker;
var search_infoWindow;

var service;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6065883, lng: -122.3479708},
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    zoom: 12,
    clickableIcons: false,
    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#cacaca"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#90c383"},{"visibility":"on"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#a9a9a9"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#a9a9a9"},{"visibility":"on"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#a9a9a9"}]},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#c34131"},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b3ebb0"}]},{"featureType":"poi.place_of_worship","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#a9a9a9"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#e1e262"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"color":"#a9a9a9"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f1f1f1"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#8f8f8f"},{"visibility":"on"},{"weight":"1"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f3f3f3"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#b7b7b7"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#a59686"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#a9a9a9"},{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#a9a9a9"}]},{"featureType":"transit.station.rail","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#a9a9a9"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dabd0"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"}]}]
  });
  service = new google.maps.places.PlacesService(map);

  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  search_infoWindow = new google.maps.InfoWindow();
  search_marker = new google.maps.Marker({
    map: map,
    icon: "/assets/TipPin.png"

  });
  search_marker.addListener('click', function() {
    search_infoWindow.open(map, search_marker);
  });

  autocomplete.addListener('place_changed', function() {
    search_infoWindow.close();
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
    search_marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    search_marker.setVisible(true);

    info = buildInfoWindow(place);
    closeAllInfoWindows()
    search_infoWindow.setContent(info);
    search_infoWindow.open(map, search_marker);
    search_marker.setVisible(true)
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

function  buildSavedInfoWindow(tip) {
    string = "<h1>" + tip.name + "</h1>"
    return string
}

function setForm(form, place){
    lat = place.geometry.location.lat()
    lng = place.geometry.location.lng()
    $(form).find('input[name="tip[name]"]').val(place.name)
    $(form).find('input[name="tip[place_id]"]').val(place.place_id)
    $(form).find('input[name="tip[lat]"]').val(lat)
    $(form).find('input[name="tip[lng]"]').val(lng)
    $(form).find('input[name="tip[address]"]').val(place.formatted_address)
    $(form).find('input[name="tip[g_rating]"]').val(place.rating)
    $(form).find('#add-tip-form').removeClass('hidden')
    return $(form).html()
}

function addMarker(tip) {
    var myLatLng = {lat: parseFloat(tip.lat), lng: parseFloat(tip.lng)}
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        title: tip.name,
        map: map,
        icon: "/assets/TipPin.png",
        place_id: tip.place_id,
        position: myLatLng,
        address: tip.address
    });

    infowindow.setContent(renderTipPartial(tip));
    marker.addListener('click', function() {
        openMarker(marker, infowindow)
    });
    markers.push(marker);
    infoWindows.push(infowindow);
    return {marker: marker, infowindow: infowindow}
}
// Sets the map on all markers in the array.

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function openAllWindows(){
  for (var i = 0; i < markers.length; i++) {
    infoWindows[i].open(map, markers[i])
  }
}
// Removes the markers from the map, but keeps them inthe array.
function clearMarkers() {
  setMapOnAll(null);
  if (search_marker != undefined) {
    search_infoWindow.close()
    search_marker.setVisible(false)
  }
}
// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}
// Deletes all markers in the array by removingreferences to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
  infoWindows = [];
}

function closeAllInfoWindows() {
  if (search_infoWindow != undefined) {
    search_infoWindow.close()
  }

  for (var i=0;i<infoWindows.length;i++) {
     infoWindows[i].close();
  }
}

