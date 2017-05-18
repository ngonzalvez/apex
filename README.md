# wb-rest



**IMPORTANT NOTICE:** *This library is still work in progress, so be aware that it may contain bugs or it may not have (yet) some feature you need. That being said, you are welcome to join us in the development if you will.*



*wb-rest* is a library designed to ease the creation of REST HTTP APIs in *node.js* with Typescript. It tries to take away all the pain involved in developing an API (such as structuring the project, defining the models and the relationships between them) and, at the same time, this library tries to reduce the amount of code required to do so.

The way it achieves its goal is by providing you with base classes, helpers and decorators to define endpoints, database models, routing and so on.



### Installation

In order to install *wb-rest* simply run:

~~~
npm install --save wb-rest
~~~

if you are using Typescript, you may want to add the typings folder to the "typeRoots" array in your tsconfig.json.



### Let's see it in action

Let's see an example of the simplest API we can build using this library, so that you can get a glance of how it works.

~~~typescript
import {HttpServer, Endpoint, GET} from 'wb-rest';

// Let's define a very simple endpoint.
@Endpoint('greetings')
class GreetingsEndpoint {
  /**
   * Here we are saying that all the GET requests to /greetings/say-hello should
   * be handled by the function below.
   */
  @GET('/say-hello')
  public static sayHello(req, res) {
    res.send('Hello there, stranger!');
  }
}

// Now, we need to create our HTTP server.
const server = new HttpServer({
  env: 'dev',
  version: 'v1',
  endpoints: [GreetingsEndpoint]
});

// Start the HTTP server.
server
  .listen(8080, 'localhost')
  .then(() => console.log('Server running on port 8080'))
  .catch(err => console.log(`Oops! Something went wrong: ${err.message}`));
~~~

If you run this code you should see the message `Server running on port 8080` on your terminal. Try opening `http://localhost:8080/v1/greetings/say-hello` and you should see the greeting message.

# 

### Creating an HTTP Server 

Creating an HTTP API with *wb-rest* is quite straigt-forward. Simply import the HttpServer class and instance it including your endpoints (we'll talk about this in the following section) in the config.

~~~typescript
import {HttpServer} from 'wb-rest';

// Import your own middlewares and endpoints.
import UsersEndpoint from './endpoints/UsersEndpoint';

const server = new HttpServer({
  version: 'v1',  // API version.
  environment: 'dev',
  endpoints: [UsersEndpoint]
});

// Start the HTTP server.
server
  .listen(8080, 'localhost')
  .then(() => console.log('Server running on port 8080'))
  .catch(err => console.log(`Oops! Something went wrong: ${err.message}`));
~~~



### Creating an Endpoint

An endpoint is simply a class whose methods are all *public static*. The class represents a resource in our REST API. Also, this class must be decorated with the **Endpoint** decorator. This decorator takes a string which will be the name of the resource in the API. 

In this case we'll be implementing the Users endpoint, so the name of the resource will be *users*. This means that this API endpoint will be accessible under the URL `http://localhost:8080/v1/users`.

As you may have noted the resource URL is prefixed by the version of the API. You can prevent this by leaving the version field empty when initializing the server.

Well, this is what we have so far.

~~~typescript
// File: endpoints/UsersEndpoint.ts
import {Endpoint} from 'wb-rest';

@Endpoint('users')
export default class UsersEndpoint {

}
~~~

But, of course, we only have an empty endpoint which does nothing, let's add some functionality to it. Let's say we want to return a hard-coded list of names when we perform a GET request to `/v1/users/`. 

We can do that by using the **@GET** decorator form *wb-rest*. Let's add a `getAll()` method to the endpoint.

~~~typescript
import {Endpoint, GET} from 'wb-rest';

@Endpoint('users')
export default class UsersEndpoint {
  @GET('/')
  public static getAll(req, res) {
    const names = ['Nick', 'John', 'Ann', 'Dean'];
    res.send(JSON.stringify(names));      
  }
}
~~~

You may have noticed that the method signature is pretty similar to what you would do if you were using *express* framework directly. You'll receive the *request* and *response* params and optionally a third param: *next*.

*wb-rest* also provides the **@POST**, **@PUT**, **@PATCH** and **@DELETE** decorators and they work the same way as **@GET**.



### Permissions and Access Control

TODO: Add documentation for the **@AccessControl** decorator.



### Persisting Data

TODO: Add documentation about the **Database** class, the **@Model** decorator and the **Database.Model<T>** base class.
