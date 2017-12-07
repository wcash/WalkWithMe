var map, infoWindow;
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

            if(data != null)
            {
                // gets the waypoints from the user to the destination
                meetPoint(data, position[0]['location'], position[0]['destination']);
                //showInfo(points[1], data);
                console.log(data);
            }
        });

    });

}

//adds meeting points with friends
function meetPoint(place, start, destination, callback){
    var matches = [start];
    var list = [];

    // only adds meeting points that aren't in the matches array
    for (var i = 0; i < place.length; i++) {
        if($.inArray(place[i]['location'], matches) == -1){

            matches.push(place[i]['location']);

        }
    }
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: matches,
            destinations: [destination],
            travelMode: 'WALKING'
        }, function(response, status){

        for (var i = 0; i < matches.length - 1; i++){
            if (response.rows[0].elements[0].distance.value > response.rows[i+1].elements[0].distance.value){
                list.push(matches[i+1]);
            }
        }
        calcRoute(start,list,destination);
        leavingTime(response.rows[0].elements[0].duration.text, place[0]["dep_time"], (matches.length - 1 < list.length));
        console.log(matches.length - 1);
        console.log(list.length);
        console.log(matches.length - 1 <= list.length);

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

function leavingTime(travelTime, arrivalTime, starting){
    if (starting){
        var message = "Leave ";
    }
    else{
        var message = "Meeting friends "
    }

    message += travelTime + " before " + arrivalTime + " to meet friends";

    infoWindow.setContent(message);
    infoWindow.setPosition({lat: 42.3770, lng: -71.1167});

    infoWindow.open(map);
}