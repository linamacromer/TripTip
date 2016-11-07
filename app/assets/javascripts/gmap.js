var map;

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
      map.setZoom(15);
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

    info = buildInfoWindow(place);
    
    infowindow.setContent(info);
    infowindow.open(map, marker);
  });
}

function  buildInfoWindow(place) {
    form = $('#add-tip-form').wrap('<p/>').parent();
    name = place.name
    address = place.formatted_address
    place_id = place.place_id
    info = '<div><strong>' + name + '</strong><br>' + address +
        '<br>' 


    if (form === undefined){
        return info + 'Select a trip to add location'
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

[value='Hot Fuzz']

