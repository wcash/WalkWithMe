# WalkWithMe

## Introduction
Utilizing *WalkWithMe* is extremely easy. **Friends don't let friends walk alone!** This web app serves to allow users (read: you) to find friends who are walking to the same destination at the same time. *WalkWithMe* will not only find you friends to walk with, but it will also give you optimal directions through *Google Maps* and help you find the best meeting point! Read more below to learn how to use *WalkWithMe*.

## Accessing the Site
Firstly, to access the site, simply [click here](https://harvard-walkwithme.herokuapp.com/) or go to https://harvard-walkwithme.herokuapp.com/. The site is hosted through *Heroku*. In the case of an emergency where Heroku is not working, the site can also be hosted locally by changing your directory to `/workspace/project/WalkWithMe/` and running `Flask Run`.

## Creating an Account or Logging in
Once you reach *WalkWithMe*'s homepage, click on `REGISTER` or `LOGIN` to create a new account or login, respectively. Both pages are extremely straightforward. Follow the directions on each individual page and be sure to click submit. Once you register, you will have to login (but don't worry, you will automaticly be redirected to the login page)!

## Adding Friends
Once you create an account, you need to add friends! You can do this by selecting `Add Friends` on the Welcome page or on the navagation bar. Once you are at the friends page, type in a friend's username amd click `Add Friend`. Then, they will appear on your friends list with their current location, destination, and departure time (if they have it listed). If you want to check if your friends have updated their location (or if anyone has added you and are thus on your friends list), click the `Check friends for updates` button, which reloads the friends page.

## Making requests
Now is the time to make a request and begin meeting up with friends! To do this, select `Request` in the navagation bar or `Create Request` on the welcome page. On the top of this site, you'll notice be able to see your current request (current location, destination, and planned departure time). This is what your friends see on their friends list next to your name, so if you want to walk alone :( , be sure to click `Clear` to set all values to `None`. Below, you can add a new request (which becomes your current request upon submission). Select where you currently are, where on campus you are headed, and your planned departure time (which must be in 15 minute increments!). Then, click `Request`! It is that easy! Then, you will automaticly be brought to the map! Read on to learn how to use the map!

## Map
In addition to being redirected to the map after creating a new request, you can always visit the map using the navigation bar. On the map, you will see a walking path from your current location to your destination. Each pin along the way illustrate a friend headed to the same destination at the same time! Go ahead and meet them along your route at your planned departure time. If there are no other pins on the map, no friends are currently headed to the same place at the same time :(. BUT, don't worry! Click `Check for newly available friends` to reload the map and see if any friends submitted new requests.

## Settings
You can access settings by either selecting `Settings` or `Hi, [your username]` in the navigation bar. Here, you can change your password or delete your account. Simply follow the instructions on the page. We would hate to see you go, so we hope you neve visit the page to delete your account!

## Thank you!
Thank you for using *WalkWithMe*!