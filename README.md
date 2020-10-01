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
To get up and running with this project, run the following commands from the root of the api folder.<br>
First, install the project's dependencies using `npm`.

```
npm install

```
#### Mac Configuration 
Now you need to run MongoDB in separate terminal window. You do it from your home directory, you can navigate there with cd ~.  
The path will change depending on where you have installed your MongoDB and how you've named your folders.
I've installed mine in monika root directory, called folder for mongoDB - mongodb and folder for databases-mongodb-data. 
MongoDB will start on <b>port 27017</b>.

```
/your/path/mongodb/bin/yourMongoDBFolder --dbpath=/your/path/yourDatabaseFolder
```
On my computer:
```
ex.: /Users/monika/mongodb/bin/mongod --dbpath=/Users/monika/mongodb-data
```
#### Windows Configuration 
Now you need to run MongoDB in separate terminal window. You do it from your bin directory. 
/Users/YourUserName/mongodb/  

The path will change depending on where you have installed your MongoDB. MongoDB will start on <b>port 27017</b>.


Now you need to open your MongoDB GUI I'm using [Robo 3T](https://studio3t.com). <br>
In GUI open connections panel. Create new connection give it a name, set address to localhost and port to 27017, test the connection in GUI and save.<br>
Keep the connection with database running.

In separate terminal window navigate to the root of the api folder.<br><br>
Seed the MongoDB database.

```
npm run seed
```
After seeding finish connection in the terminal.
Lastly, start the application.

```
npm run start
```

### Testing API
To test the Express server, browse to the URL [http://localhost:3000/api](http://localhost:3000/api). <br>

To test and explore application use [Postman](https://www.postman.com) a popular application for testing REST APIs.

I've added postman collection JSON file for testing the API. When you want to test route that includes ID be sure to update it with your own ID's from GET families or GET users routes. 

## Getting started with client

Install dependencies by running from the client root folder:

```
npm install

```
Start the application.

```
npm run start
```

### Testing Client

Client will be up and running on [http://localhost:4000](http://localhost:4000). <br>




