var map = L.map('map').setView([41.89, -87.61], 12);

var layer = new L.StamenTileLayer("toner-lite");
map.addLayer(layer);

var myStyle = {
  "color": '#660054',
  "weight": 5.5,
  "opacity": 0.5
};

function highlightFeature(e) {
  var props = e.target.feature.geometry.properties;

  var infoText = '<b>Start: </b>&nbsp;' + props.startStation +
                 '<br/><br/><b>End: </b>&nbsp;' + props.endStation +
                 '<br/><br/><b>Frequency: </b>&nbsp;' + props.totalTrips +
                 '<br/><br/><b>Frequency (opposite way): </b>&nbsp;' + props.oppositeTrips;


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
  this._div.innerHTML = (props ? props.infoText : 'Hover over any trip.');
};

info.addTo(map);


mapTitle = L.control({ position: 'topright' });

mapTitle.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this._div.innerHTML = '<b id="title">DivvyBrags Map: Alex Soble</b>';
  return this._div;
};

mapTitle.addTo(map);

var tripsData = L.geoJson(data, {
  style: myStyle,
  onEachFeature: onEachFeature
});

var sliderControl = L.control.sliderControl({
  position: "bottomright", layer: tripsData
});

//Make sure to add the slider to the map ;-)
map.addControl(sliderControl);

//And initialize the slider
sliderControl.startSlider();

tripsData.addTo(map);
