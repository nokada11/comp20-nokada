function initMap() {
	var stations = {
		sstat: {lat: 42.352271, lng: -71.05524200000001},
		andrw: {lat: 42.330154, lng: -71.057655}, 
		portr: {lat: 42.3884, lng: -71.11914899999999},
		harsq: {lat: 42.373362, lng: -71.118956},
		jfk: {lat: 42.320685, lng: -71.052391},
		shmnl: {lat: 42.31129, lng: -71.053331},
		pktrm: {lat: 42.35639457, lng: -71.0624242},
		brdwy: {lat: 42.342622, lng: -71.056967},
		nqncy: {lat: 42.275275, lng: -71.029583},
		smmnl: {lat: 42.29312583, lng: -71.06573796000001},
		davis: {lat: 42.39674, lng: -71.121815},
		alfcl: {lat: 42.395428, lng: -71.142483},
		knncl: {lat: 42.36249079, lng: -71.08617653},
		chmnl: {lat: 42.361166, lng: -71.070628},
		dwnxg: {lat: 42.355518, lng: -71.060225},
		qnctr: {lat: 42.251809, lng: -71.005409},
		qamnl: {lat: 42.233391, lng: -71.007153},
		asmnl: {lat: 42.284652, lng: -71.06448899999999},
		wlsta: {lat: 42.2665139, lng: -71.0203369},
		fldcr: {lat: 42.300093, lng: -71.061667},
		cntsq: {lat: 42.365486, lng: -71.103802},
		brntn: {lat: 42.2078543, lng: -71.0011385}
	};

	var map = new google.maps.Map(document.getElementById('map'), {
		  center: stations[0],
		  zoom: 11
	});

	var infoWindow = new google.maps.InfoWindow;

	for (var key in stations)
	{
		var marker = new google.maps.Marker({position: stations[key], map: map});
		var stationWindow = new google.maps.InfoWindow;

		google.maps.event.addListener(marker, 'click', (function(marker, key) {
	        return function() {
	        	request = new XMLHttpRequest();
	        	request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + key, true);

	        	request.send();

	        	request.onreadystatechange = function() {
	        		if (request.readyState == 4 && request.status == 200) {
	        			console.log("Yay!");

	        			theData = request.responseText;
	        			messages = JSON.parse(theData);

	        			for (i = 0; i < messages.length; i++) {
	        				console.log(messages[i].content)
	        			}
	        		}
	        		else if (request.readyState == 4 && request.status != 200) {
	        			console.log("Whoops, something went terribly wrong!");
	        		}
	        		else if (request.readyState == 3) {
	        			console.log("Come back soon!");
	        		}
	        	};

	            stationWindow.setContent("TEST");
	            stationWindow.open(map, marker);
	        }
	    })(marker, key));
	}

	// Retrieve data
	getData();
	
	var redLineStations = [
		stations["alfcl"], stations["davis"], stations["portr"], stations["harsq"], 
		stations["cntsq"], stations["knncl"], stations["chmnl"], stations["pktrm"], 
		stations["dwnxg"], stations["sstat"], stations["brdwy"], 
		stations["andrw"], stations["jfk"]
	];

	var braintreeBranchStations = [
		stations["jfk"], stations["nqncy"], stations["wlsta"], stations["qnctr"], 
		stations["qamnl"], stations["brntn"]
	];

	var ashmontBranchStations = [
		stations["jfk"], stations["shmnl"], stations["fldcr"], stations["smmnl"], stations["asmnl"]
	];

	setPolyLine(map, redLineStations);
	setPolyLine(map, braintreeBranchStations);
	setPolyLine(map, ashmontBranchStations);


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

function getData() {
	request = new XMLHttpRequest();
	request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=place-davis", true);

	request.send();

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log("Yay!");

			theData = request.responseText;
			messages = JSON.parse(theData);

			for (i = 0; i < messages.length; i++) {
				console.log(messages[i].content)
			}
		}
		else if (request.readyState == 4 && request.status != 200) {
			console.log("Whoops, something went terribly wrong!");
		}
		else if (request.readyState == 3) {
			console.log("Come back soon!");
		}
	};
}
