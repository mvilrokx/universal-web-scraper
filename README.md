# Introduction
This node application exposes a simple REST API that allows you to scrape any web page.  You provide the url to scrape, the selector of an element you are looking for and an optional attribute you want to find on that element.  If no attribute is specified, the html is returned, otherwise it returns the attribute's value.

# Usage
## Without Attribute
    $ curl -X POST -d "url=https://www.twitter.com/mvilrokx&selector=.ProfileAvatar-container" http://localhost:8080/api/scrape
returns:

    {"scraped":"\n      <img class=\"ProfileAvatar-image \" src=\"https://pbs.twimg.com/profile_images/573168878949306368/dr5Xh1N9_400x400.jpeg\" alt=\"Mark Vilrokx\">\n    "}
## With Attribute
    $ curl -X POST -d "url=https://www.twitter.com/mvilrokx&selector=.ProfileAvatar-image&attr=src" http://localhost:8080/api/scrape
returns:

    {"scraped":"https://pbs.twimg.com/profile_images/573168878949306368/dr5Xh1N9_400x400.jpeg"}⏎

# Install locally
Download this repository and then run:

    $ npm install

To start the applications:

    $ node server.js

To use the application:

    $ curl -X POST -d "url=https://www.twitter.com/mvilrokx&selector=.ProfileAvatar-container" http://localhost:8080/api/scrape

# [Install on heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
[Make sure you have the heroku toolbelt installed](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).  Then download this repository and create a heroku application by changing your directory to the application you just downloaded and run
    
    $ heroku create

When finished, deploy the application to heroku with

    $ git push heroku master

This will give you a application URL you can now use to call the API, just like you did locally, except you replace localhost:8080 with the URL proviced.
