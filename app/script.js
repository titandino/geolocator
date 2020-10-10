window.initMap = function () {
  let usa = { lat: 42.877742, lng: -97.380979 };
  window.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: usa,
  });
};

function populate() {
  let ips = document.getElementById('ips').value.split(/[\r\n]+/);

  markers.forEach(function (marker) {
    marker.setMap(null);
  });
  markers = [];
  $.post('/api/geolocate/', { ips: ips }, data => {
    console.log(data)
    data.forEach(location => {
      console.log(location)
      let info = new google.maps.InfoWindow({
        content:
          '<div class="map-info-box"><p>' +
          location.city +
          ', ' +
          location.regionName +
          ', ' +
          location.zip +
          '</p><p>' +
          location +
          '</p></div>',
      });
      let marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lon },
        map: window.map,
      });
      marker.addListener('click', function () {
        info.open(window.map, marker);
      });
      markers.push(marker);
    });
  });
}

$("#popButton").click(populate);
