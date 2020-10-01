# Family Finances App

This is a full stack app for managing family finances. It has its own REST API created with Express, it manages data in mongoDB database and client side which makes it easy to work with data.

At the moment Family Finances App is just a sample of full Application, I'll expand it in the future.
### REST API
REST API is fully functional, you can make changes in two documents: families and users. You can read existing objects, add new, update them and delete. You can use API with the help of API client such as [POSTMAN](https://www.postman.com/product/api-client/). I've also included Postman collection in json file that lets you manipulate data and test API. API models are validated as well as routes.

REST API uses [mongoDB database](https://www.mongodb.com), [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com), [mongoose for object modeling](https://mongoosejs.com).

#### How does it work
* This app has two types of routes: families and users. <br>
* When you try to access non existing route you will get 404 error, when you try to choose non existing ID you will get 'family doesn't exist' or 'user doesn't exist'. If something is wrong with connection you'll get 500 global error <br>
* Families routes:
    * Get all families,
    * Get one family by ID,
    * Post new family,
    * Patch existing family by ID,
    * Delete family by ID <br>
* Users routes:
    * Get all users,
    * Get one user by ID,
    * Post new user,
    * Patch existing user by ID,
    * Delete family by ID <br>
* Changes are executed in a database. <br>
* There is a success message in a console when the server is up and there is successful connection with a database. There is also error log when the connection couldn't be made.

### Client
Client side app is a sample app that lets you use basic functionality. You can choose from user demo and administrator demo. <br>
Client app is build with [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com), [hbs templating](https://www.npmjs.com/package/hbs) and [postman-request npm](https://www.npmjs.com/package/postman-requests).
#### How does it work
* User demo lets you add new expenses for a family. It's currently fixed for one family, but with a simple changes in URL you can manipulate the expenses for all families.<br> 
* Admin demo gives you access to all families table. From this site you can navigate to single family page and add new funds.
* When you make changes in savings, there is a fetch that patches data by REST API in database.         
* When you try to access non existing route or non existing family you will get 404 error page.

## Getting started with API

## Getting started with client