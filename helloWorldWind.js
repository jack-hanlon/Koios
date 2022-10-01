var wwd = new WorldWind.WorldWindow("canvasOne");

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());

wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

createPlacemarkPin()

function createPlacemarkPin() {
  var placemarkLayer = new WorldWind.RenderableLayer("Placemark");
  wwd.addLayer(placemarkLayer);

  var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

  placemarkAttributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.3,
      WorldWind.OFFSET_FRACTION, 0.0);

  placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
  placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
              WorldWind.OFFSET_FRACTION, 0.5,
              WorldWind.OFFSET_FRACTION, 1.0);

  //Uses the red pin as a placemark
  placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

  var position = new WorldWind.Position(55.0, -106.0, 100.0);
  //Docs for Placemark function: https://nasaworldwind.github.io/WebWorldWind/Placemark.html
  var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

  placemark.label = "Placemark\n" +
      "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
      "Lon " + placemark.position.longitude.toPrecision(5).toString();
  placemark.alwaysOnTop = true;

  placemarkLayer.addRenderable(placemark);
}

function create3DShapes() {
  var polygonLayer = new WorldWind.RenderableLayer();
  wwd.addLayer(polygonLayer);

  var polygonAttributes = new WorldWind.ShapeAttributes(null);
  polygonAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.75);
  polygonAttributes.outlineColor = WorldWind.Color.BLUE;
  polygonAttributes.drawOutline = true;
  polygonAttributes.applyLighting = true;

  //Create polygon boundaries
  var boundaries = [];
  //Postion takes(lat, long, km above earth)
  boundaries.push(new WorldWind.Position(20.0, -75.0, 700000.0));
  boundaries.push(new WorldWind.Position(25.0, -85.0, 700000.0));
  boundaries.push(new WorldWind.Position(20.0, -95.0, 700000.0));

  var polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
  polygon.extrude = true;
  polygonLayer.addRenderable(polygon);
}