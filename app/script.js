let markers = [];
let map = null;

window.initMap = function () {
  let usa = { lat: 42.877742, lng: -97.380979 };
  map = new google.maps.Map(document.getElementById('map'), {
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
  console.log(ips)
  $.post('/api/geolocate/', { ips: ips }, data => {
    console.log(data)
    data.forEach(ip => {
      let info = new google.maps.InfoWindow({
        content:
          '<div class="map-info-box"><p>' +
          ip.city +
          ', ' +
          ip.regionName +
          ', ' +
          ip.zip +
          '</p><p>' +
          ip +
          '</p></div>',
      });
      let marker = new google.maps.Marker({
        position: { lat: ip.lat, lng: ip.lon },
        map: map,
      });
      marker.addListener('click', function () {
        info.open(map, marker);
      });
      markers.push(marker);
    });
  });
}

$("#popButton").click(populate);
