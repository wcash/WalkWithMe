# WalkWithMe
The framework of WalkWithME uses Bootstrap on the frontend, flask and heroku servers, a SQL database, and Google Maps API.

## Login/Register
The website is designed similarly to CS50 Finance. The website requires the user to login or register to have access to the rest of the tools. When a user registers,
the website checks the SQL database to make sure there aren't any other users with the same username and the python backend makes sure that the user entered all of
the needed information fields. The backend also hashes the password when entering the information into the database. When a user logs in, the backend just
checks that there is a user with the same password and username entered in the database. Once the user has either logged in or registered, their userID and username is cached.


## Adding Friends
To add friends, the user enters their friend's username. This creates two insertions into a table called friends where the columns are id (which is the primary key), user (the user's username),
friend (the friend's user name), and date (the date and time of the creation). The two insertions are: one with the user's username in the user column and the friend's username under friend
and the other is the friend's username under user and the user's username under user. The implementation was created this way in order to make retrieving a user's friends by selecting from the
database where the user's username is in the user's column. The rest is the page is a table made using a loop in jinja where the table is made from information used from joining the users and
friends table. At the bottom there is a button used to refresh the page. We implemented this in order to allow the user to see if any friends updated their location, destination, or arrival time.

## Request
The request page allows the user to update their location, destination, and arrival time in the SQL database. The user is allowed to input their location and destination from the options in the dropdown lists
and state their arrival time in intervals of 15 minutes. The 15 minute intervals were chosen so that users won't have to miss friends because they were merely a few minutes off. The user is also shown their
last inputed location, destination, and arrival time where they have the ability to clear what is already listed. This simply updates their line in the SQL database.

## Settings
The user is given the option to change their password and delete their account. To change a password, the backend checks that the two input fields are equivelent. It then hashes the input and
updates the hash column in the SQL database. When deleting the account, the user must first click a checkbox to ensure they want to delete the account. Then, it deletes their row in the SQL database, as well as every entry in the friends list that mentions their username.

## Map
The Map webpage uses Google Maps API to creates a map and then display the route from the user to the meeting points to their destination.
The implementation of the map and creating of the route was done in JavaScript. To get the information of the user and of the user's friends.
we created two webpages `/position` and `/matches` where the server jsonifys the user's information and the users friends that are arriving at the same
location at the same time. In the javacript, the code takes the jsonified information, parses it, and then, using the friend's information, creates the route using Google's
API with the meeting points as waypoints. The meeting points are the locations of friends that are closer to the destination then the user.
This done so the the farthest person from the destination will meet up with friends along the way to their destination. This is done by finding the distance using the Google Maps
Distance Matrix and seeing if the distance between the user and the destination is less than the distances of the user's friends to the destination. The meeting points of the users are found,
and Google Maps Direction Service creates the route on the map. An info window is opened stating when to leave (if you are farthest from the destination) or when to meet your friends at your current location along their route to your shared destination.