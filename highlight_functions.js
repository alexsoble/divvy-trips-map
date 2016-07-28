function highlightFeature(e) {
  var props = e.target.feature.geometry.properties;

  var infoText = '<b>Start: </b>&nbsp;' + props.startStation +
                 '<br/><br/><b>End: </b>&nbsp;' + props.endStation +
                 '<br/><br/><b>Frequency: </b>&nbsp;' + props.totalTrips +
                 '<br/><br/><b>Frequency (opposite way): </b>&nbsp;' + props.oppositeTrips;


  info.update({ infoText: infoText });

  var layer = e.target;

  layer.setStyle({
    color: '#03f',
    opacity: 0.6
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  geoJson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
}
