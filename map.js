var map = L.map('map').setView([41.89, -87.68], 12);

var layer = new L.StamenTileLayer("toner-lite");
map.addLayer(layer);

var myStyle = {
  "color": '#660054',
  "weight": 5.5,
  "opacity": 0.5
};

L.geoJson(data, { style: myStyle }).addTo(map);
