var map;

function initMap() {
	// var stations = [
	// 	{lat: 42.352271, lng: -71.05524200000001},
	// 	{lat: 42.330154, lng: -71.057655}, 
	// 	{lat: 42.3884, lng: -71.11914899999999}
	// ];

	var stations = {
		southStation: {lat: 42.352271, lng: -71.05524200000001},
		andrew: {lat: 42.330154, lng: -71.057655}, 
		porterSquare: {lat: 42.3884, lng: -71.11914899999999},
		var harvardSquare = {lat: 42.373362, lng: -71.118956}
	};

/*

	var harvardSquare = {lat: 42.373362, lng: -71.118956};
	var jfkUMass = {lat: 42.320685, lng: -71.052391};
	var savinHill = {lat: 42.31129, lng: -71.053331};
	var parkStreet = {lat: 42.35639457, lng: -71.0624242};
	var broadway = {lat: 42.342622, lng: -71.056967};
	var northQuincy = {lat: 42.275275, lng: -71.029583};
	var shawmut = {lat: 42.29312583, lng: -71.06573796000001};
	var davis = {lat: 42.39674, lng: -71.121815};
	var alewife = {lat: 42.395428, lng: -71.142483};
	var kendallMIT = {lat: 42.36249079, lng: -71.08617653};
	var charlesMGH = {lat: 42.361166, lng: -71.070628};
	var downtownCrossing = {lat: 42.355518, lng: -71.060225};
	var quincyCenter = {lat: 42.251809, lng: -71.005409};
	var quincyAdams = {lat: 42.233391, lng: -71.007153};
	var ashmont = {lat: 42.284652, lng: -71.06448899999999};
	var wollaston = {lat: 42.2665139, lng: -71.0203369};
	var fieldsCorner = {lat: 42.300093, lng: -71.061667};
	var centralSquare = {lat: 42.365486, lng: -71.103802};
	var braintree = {lat: 42.2078543, lng: -71.0011385};
	*/

	map = new google.maps.Map(document.getElementById('map'), {
		  center: stations["southStation"],
		  zoom: 11
	});

	var custom = 'static/images/pin.png';


	var southStationPin = new google.maps.Marker({position: stations["southStation"], map: map});
/*
	var andrewPin = new google.maps.Marker({position: andrew, map: map});
	var porterSquarePin = new google.maps.Marker({position: porterSquare, map: map});
	var harvardSquarePin = new google.maps.Marker({position: harvardSquare, map: map});
	var jfkUMassPin = new google.maps.Marker({position: jfkUMass, map: map});
	var savinHillPin = new google.maps.Marker({position: savinHill, map: map});
	var parkStreetPin = new google.maps.Marker({position: parkStreet, map: map});
	var broadwayPin = new google.maps.Marker({position: broadway, map: map});
	var northQuincyPin = new google.maps.Marker({position: northQuincy, map: map});
	var shawmutPin = new google.maps.Marker({position: shawmut, map: map});
	var davisPin = new google.maps.Marker({position: davis, map: map});
	var alewifePin = new google.maps.Marker({position: alewife, map: map});
	var kendallMITPin = new google.maps.Marker({position: kendallMIT, map: map});
	var charlesMGHPin = new google.maps.Marker({position: charlesMGH, map: map});
	var downtownCrossingPin = new google.maps.Marker({position: downtownCrossing, map: map});
	var quincyCenterPin = new google.maps.Marker({position: quincyCenter, map: map});
	var quincyAdamsPin = new google.maps.Marker({position: quincyAdams, map: map});
	var ashmontPin = new google.maps.Marker({position: ashmont, map: map});
	var wollastonPin = new google.maps.Marker({position: wollaston, map: map});
	var fieldsCornerPin = new google.maps.Marker({position: fieldsCorner, map: map});
	var centralSquarePin = new google.maps.Marker({position: centralSquare, map: map});
	var braintreePin = new google.maps.Marker({position: braintree, map: map});

	var redLineStations = [
		alewife, davis, porterSquare, harvardSquare, centralSquare, kendallMIT, 
		charlesMGH, parkStreet, downtownCrossing, southStation, broadway, andrew, jfkUMass
	];
	var redLine = new google.maps.Polyline({
		path: redLineStations,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	var braintreeBranchStations = [
		jfkUMass, northQuincy, wollaston, quincyCenter, quincyAdams, braintree
	];

	var braintreeBranch = new google.maps.Polyline({
		path: braintreeBranchStations,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	var ashmontBranchStations = [
		jfkUMass, savinHill, fieldsCorner, shawmut, ashmont
	];

	var ashmontBranch = new google.maps.Polyline({
		path: ashmontBranchStations,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	redLine.setMap(map);
	braintreeBranch.setMap(map);
	ashmontBranch.setMap(map);

	infoWindow = new google.maps.InfoWindow;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var currentPos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		var yourLocation = new google.maps.Marker({position: currentPos, map: map});
		infoWindow.setPosition(currentPos);
		infoWindow.setContent('Hello World');
		infoWindow.open(map);
		map.setCenter(currentPos);
	}, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(currentPos);
		infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(map);
	}

*/

}