// Creates map utilizing distance matrix, route creating, creating map, and opening infomation windows
// information and sources from Google's API documentation: https://developers.google.com/maps/documentation/javascript/tutorial

// creates global variable for maps, information windows
var map, infoWindow;

// creates variables for the routing system
var directionsService;
var directionsDisplay;

function initMap() {

    // for the making the route on google maps
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    // the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3770, lng: -71.1167}, // Harvard Yard
        zoom: 16
        });
    directionsDisplay.setMap(map);

    infoWindow = new google.maps.InfoWindow;

    // get the position of the user
    $.getJSON("/position", function(position) {
        // get the users friends that are going to the same destination at the same time
        $.getJSON("/matches", function(data) {

            // only creates the route if user position given
            if(data != position)
            {
                // gets the waypoints from the user to the destination
                meetPoint(data, position[0]['location'], position[0]['destination']);
            }
        });

    });

}

// adds meeting points with friends
function meetPoint(place, start, destination, callback){
    var matches = [start];
    var list = [];

    // only adds meeting points that aren't in the matches array
    for (var i = 0; i < place.length; i++) {
        if($.inArray(place[i]['location'], matches) == -1){

            matches.push(place[i]['location']);

        }
    }
    // finds the distances between the user and destination and between meeting points and destination
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: matches,
            destinations: [destination],
            travelMode: 'WALKING'
        }, function(response, status){

        // if the distance between the user and destination is less then the meeting point and destination it adds that meeting point to the route
        for (var i = 0; i < matches.length - 1; i++){
            if (response.rows[0].elements[0].distance.value > response.rows[i+1].elements[0].distance.value){
                list.push(matches[i+1]);
            }
        }

        // calls function to calculate the route to the destination
        calcRoute(start,list,destination);
        // calls funtion to tell user when to leave
        leavingTime(response.rows[0].elements[0].duration.text, place[0]["dep_time"], (matches.length - 1 <= list.length));

    });
}

// function for calculating routs on google maps
function calcRoute(start, meeting, end) {
    // adds the waypoints to the route
    var waypts = [];
    for (var i = 0; i < meeting.length; i++){
        waypts.push({
            location: meeting[i],
            stopover: true
        });
    }

    // makes the route with travel mode WALKING
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
// function to tell user when to leave
function leavingTime(travelTime, arrivalTime, starting){
    var message = '';

    // message for if the user is the first person to leave and meets up with friends on the way
    if (starting){
        message += "Leave " + travelTime + " before " + arrivalTime + " to meet friends along your route!";
    }
    // message for if the user will meet others at their location
    else{
        message += "Meet friends " + travelTime + " before " + arrivalTime + "!";
    }

    // sets the content and opens window at Harvard Yard
    infoWindow.setContent(message);
    infoWindow.setPosition({lat: 42.3770, lng: -71.1167});
    infoWindow.open(map);
}