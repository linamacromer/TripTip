var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6065883, lng: -122.3479708},
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    zoom: 12
  });
 google.maps.event.addListener(map, 'click', function (event) {
        displayCoordinates(event.latLng);
    });
  function displayCoordinates(pnt) {
    var lat = pnt.lat();
    lat = lat.toFixed(4);
    var lng = pnt.lng();
    lng = lng.toFixed(4);
    console.log("Latitude: " + lat + "  Longitude: " + lng);
}
    //Uncomment below to freeze map
    //map.setOptions({draggable: false});
}
