# Nestor API Test Technique

Welcome to my room reservation API.
It has been deployed with Heroku at :
+ [Application](https://nestorapi.herokuapp.com)

The endpoints of this API are listed at the swagger hosted in the application :
+ [Swagger](https://nestorapi.herokuapp.com/swagger)

To develop this API used the framework SailsJS :
+ [SailsJS](https://sailsjs.com)

### How to begin

In order to launch the app you may clone the repository then enter the following commands at the root of the project:

`npm i`

`sails lift`

Once you have entered it a developing server will start at the port 1337 of your localhost.

The local database adapter is sails-disk

The database adapter used for production is sails-postgresql.

### FeedBacks

I took about six hours to implement this app.
I chose to take 1 hour on the conception.
3 and a half hour developing the code, refactoring it.
1 and a half hour to build the swagger (something that I never did before with sails) and deploy the application on Heroku.

### Improvement

The production database migration is set to 'alter' which is not secure at all, I should have created a deploying environnement to seperate the construction of the database and the production usage of it. But I haven't had time to resolve the many bugs I encountered doing it.

I regret that I had not the time to build tests and I only used postman to check whether a route worked or not. Testing could have been very useful, to be sure that the refactoring didn't broke any process or to set up a proper CI with Circle. I have never implemented tests on Node yet but it will be for sure my next formation.

The swagger on the hosted version does not update with the latest changes, which I don't understand yet because the exact same application on local display these changes. In conclusion the local version of swagger is more complete and accurate.
