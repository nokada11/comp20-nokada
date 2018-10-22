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

	var pins = {};

	var map = new google.maps.Map(document.getElementById('map'), {
		  center: stations["southStation"],
		  zoom: 11
	});

	placePins(map, stations, pins);

	var redLineStations = [
		stations["alewife"], stations["davis"], stations["porterSquare"], stations["harvardSquare"], 
		stations["centralSquare"], stations["kendallMIT"], stations["charlesMGH"], stations["parkStreet"], 
		stations["downtownCrossing"], stations["southStation"], stations["broadway"], 
		stations["andrew"], stations["jfkUMass"]
	];

	var braintreeBranchStations = [
		stations["jfkUMass"], stations["northQuincy"], stations["wollaston"], stations["quincyCenter"], 
		stations["quincyAdams"], stations["braintree"]
	];

	var ashmontBranchStations = [
		stations["jfkUMass"], stations["savinHill"], stations["fieldsCorner"], stations["shawmut"], stations["ashmont"]
	];

	setPolyLine(map, redLineStations);
	setPolyLine(map, braintreeBranchStations);
	setPolyLine(map, ashmontBranchStations);

	infoWindow = new google.maps.InfoWindow;
	stationWindow = new google.maps.InfoWindow;

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

	for (var key in stations) {
		pins[key].addListener('click', function() {
			stationWindow.setPosition(stations[key]);
			stationWindow.setContent('Aiya!');
			stationWindow.open(map);
			console.log("Aiya!!!!");
		});
	}
}



function placePins(map, stations, pins) {
	for (var key in stations) {
		pins[key] = new google.maps.Marker({position: stations[key], map: map});
	}
}

function setPolyLine(map, chosenStations) {
	var redLine = new google.maps.Polyline({
		path: chosenStations,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	redLine.setMap(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}


/*

request = new XMLHttpRequest();
request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=place-sstat", true);

request.onreadystatechange = function() {
	if (request.readyState == 4 && request.status == 200) {
		theData = request.responseText;
		messages = JSON.parse(theData);
		returnHTML = "<ul>";
		for (i = 0; i < messages.length; i++) {
			returnHTML += "<li>" + messages[i].content + " by " + messages[i].username + 
			"</li>";
		}
		returnHTML += "</ul>";
		document.getElementById("messages").innerHTML =returnHTML;
	}
	else if (request.readyState == 4 && request.status != 200) {
		document.getElementById("messages").innerHTML = "Whoops, something went terribly wrong!";
	}
	else if (request.readyState == 3) {
		document.getElementById("messages").innerHTML = "Come back soon!";
	}
}

request.send();
});
*/