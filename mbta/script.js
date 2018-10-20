var map;

function initMap() {
	var stations = {
		southStation: {lat: 42.352271, lng: -71.05524200000001},
		andrew: {lat: 42.330154, lng: -71.057655}, 
		porterSquare: {lat: 42.3884, lng: -71.11914899999999},
		harvardSquare: {lat: 42.373362, lng: -71.118956},
		jfkUMass: {lat: 42.320685, lng: -71.052391},
		savinHill: {lat: 42.31129, lng: -71.053331},
		parkStreet: {lat: 42.35639457, lng: -71.0624242},
		broadway: {lat: 42.342622, lng: -71.056967},
		northQuincy: {lat: 42.275275, lng: -71.029583},
		shawmut: {lat: 42.29312583, lng: -71.06573796000001},
		davis: {lat: 42.39674, lng: -71.121815},
		alewife: {lat: 42.395428, lng: -71.142483},
		kendallMIT: {lat: 42.36249079, lng: -71.08617653},
		charlesMGH: {lat: 42.361166, lng: -71.070628},
		downtownCrossing: {lat: 42.355518, lng: -71.060225},
		quincyCenter: {lat: 42.251809, lng: -71.005409},
		quincyAdams: {lat: 42.233391, lng: -71.007153},
		ashmont: {lat: 42.284652, lng: -71.06448899999999},
		wollaston: {lat: 42.2665139, lng: -71.0203369},
		fieldsCorner: {lat: 42.300093, lng: -71.061667},
		centralSquare: {lat: 42.365486, lng: -71.103802},
		braintree: {lat: 42.2078543, lng: -71.0011385}
	};

	map = new google.maps.Map(document.getElementById('map'), {
		  center: stations["southStation"],
		  zoom: 11
	});

	var custom = 'static/images/pin.png';

	for (var key in stations) {
		var Pin = new google.maps.Marker({position: stations[key], map: map});
	}
	
	var redLineStations = [
		stations["alewife"], stations["davis"], stations["porterSquare"], stations["harvardSquare"], 
		stations["centralSquare"], stations["kendallMIT"], stations["charlesMGH"], stations["parkStreet"], 
		stations["downtownCrossing"], stations["southStation"], stations["broadway"], 
		stations["andrew"], stations["jfkUMass"]
	];
	var redLine = new google.maps.Polyline({
		path: redLineStations,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	redLine.setMap(map);

	var braintreeBranchStations = [
		stations["jfkUMass"], stations["northQuincy"], stations["wollaston"], stations["quincyCenter"], 
		stations["quincyAdams"], stations["braintree"]
	];

	var braintreeBranch = new google.maps.Polyline({
		path: braintreeBranchStations,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	braintreeBranch.setMap(map);

	var ashmontBranchStations = [
		stations["jfkUMass"], stations["savinHill"], stations["fieldsCorner"], stations["shawmut"], stations["ashmont"]
	];

	var ashmontBranch = new google.maps.Polyline({
		path: ashmontBranchStations,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

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


}