var map = L.map('map').setView([41.89, -87.68], 12);

var layer = new L.StamenTileLayer("toner-lite");
map.addLayer(layer);

var myStyle = {
  "color": '#660054',
  "weight": 5.5,
  "opacity": 0.5
};

function highlightFeature(e) {
  var props = e.target.feature.geometry.properties;

  var infoText = '<b>Start: </b>' + props.startStation +
                 '<br/><br/><b>End: </b>' + props.endStation +
                 '<br/><br/><b>Frequency: </b>' + props.totalTrips;

  info.update({ infoText: infoText });
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
  });
}

var info = L.control({ position: 'bottomleft' });

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = (props ? props.infoText : null);
};

info.addTo(map);

L.geoJson(data, {
  style: myStyle,
  onEachFeature: onEachFeature
}).addTo(map);
