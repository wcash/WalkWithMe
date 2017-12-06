var map, infoWindow;
var pos;
var cars;
var json;
var directionsService;
var directionsDisplay;

var userPosition;
var userDestination

var meeting;

// test test test test


// var riverNorth;
// var riverSouth;
// var stadium;
// var quad;
// var yardNorth;
// var yardSouth;
// var eastRiver

function initMap() {

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;


    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3770, lng: -71.1167},
        zoom: 16
        });
    directionsDisplay.setMap(map);


    infoWindow = new google.maps.InfoWindow;

    $.getJSON("/position", function(position) {

        $.getJSON("/matches", function(data) {

            if(data != null)
            {

                meeting = meetPoint(data, position[0]['location'], position[0]['destination']);
                //makeMarker(meeting);
                //calcRoute(data[0]['location'], meeting, data[0]['destination']);
                calcRoute(position[0]['location'], meeting, position[0]['destination']);

            }
        });

    });

}

function calcRoute(start, meeting, end) {

    var waypts = [];

    for (var i = 0; i < meeting.length; i++){
        waypts.push({
            location: meeting[i],
            stopover: true
        });
    }

    var request = {
        origin: start,
        waypoints: waypts,
        destination: end,
        optimizeWaypoints: true,
        travelMode: 'WALKING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function meetPoint(place, start, destination){
    var matches = [];

    for (var i = 0; i < place.length; i++) {
        if($.inArray(place[i]['location'], matches) == -1 && place[i]['location'] != start && findDistance(start, place[i]['location'], destination)){

            console.log(place[i]['location']);
            matches.push(place[i]['location']);
        }
    }

    return matches;

}

function makeMarker(point){
    var marker = new google.maps.Marker({
        position: point,
        map: map
    });

}

function findDistance(first, second, end){
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [first, second],
            destinations: [end, end],
            travelMode: 'WALKING'
        }, function(response, status){

        console.log(response);
        console.log(response.rows[0].elements[0].distance.value);
        console.log(response.rows[1].elements[0].distance.value);
        var a = response.rows[0].elements[0].distance.value;
        var b = response.rows[1].elements[0].distance.value
        if (a < b){//response.rows[0].elements[0].distance.value < response.rows[1].elements[0].distance.value){
            return false;
        }
        else {
            return false;
        }

        return true;
        });
}

