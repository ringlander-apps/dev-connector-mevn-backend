# dev-connector-mevn-backend

# Introduction

Welcome to the dev-connector-mevn-backend repo.
This repos is built whilst following the Udemy course:

[**"MERN Stack Front To Back"**](https://www.udemy.com/mern-stack-front-to-back/learn/v4/overview)

by [**Brad Traversy**](https://github.com/bradtraversy)

_From the course description:_

> Welcome to "MERN Stack Front To Back". In this course we will build an in depth full stack social network application using Node.js, Express, React, Redux and MongoDB along with ES6+. We will start with a bank text editor and end with a deployed full stack application.
> This course includes...
>
> - Building an extensive backend API with Node.js & Express
> - Protecting routes/endpoints with JWT (JSON Web Tokens)
> - Extensive API testing with Postman
> - Integrating React with our backend in an elegant way, creating a great workflow
> - Building our frontend to work with the API
> - Using Redux for app state management
> - Creating reducers and actions for our resources
> - Creating many container components that integrate with Redux
> - Testing with the Redux Chrome extension
> - Creating a build script, securing our keys and deploy to Heroku using Git
>   This is NOT an "Intro to React" or "Intro to Node" course. It is a practical hands on course for building an app using the incredible MERN stack. I do try and explain everything as I go so it is possible to follow without React/Node experience but it is recommended that you know at least the basics first.

The purpose of this repo is to serve as the back-end solution supporting the _to-be-built_ front-end: **dev-connector-mevn-frontend**

Front-end will be built using:

[Vue.js](https://vuejs.org/),
[VueRouter](https://router.vuejs.org/),
[Vuex](https://vuex.vuejs.org/)

as an alternative solution to the React implementation built in the Udemy course.

## Additional features

In addition to the features presented above we will try to build out the API using **TDD(Test driven development)** principles.

# 1. Getting started

As stated in the course description we will be building an API with Node.js & Express as our backend.

MongoDB will be our document database of choice served by [mLab](https://mlab.com/), the leading Database-as-a-Service provider for MongoDB.

## 1.1 Base dependencies (packages)

Following packages are the minimum required for the back-end implementation.

### - [express.js](https://expressjs.com/)

- _Fast, unopinionated, minimalist web framework for Node.js_

  `$ npm install --save express`

### - [body-parser](https://github.com/expressjs/body-parser)

- _Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property._

  `$ npm install body-parser`

### - [mongoose.js](https://mongoosejs.com/)

- _Elegant mongodb object modeling for node.js_

  `$ npm install --save mongoose`

### - [passport](http://www.passportjs.org/)

- _Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application._

#### - [passport-jwt](http://www.passportjs.org/packages/passport-jwt/)

- _A Passport strategy for authenticating with a JSON Web Token._

  `$ npm install passport passport-jwt`

### - [jsonwebtoken](https://jwt.io/)

- _JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties._

  `$ npm install jsonwebtoken`

### - [bcrypt.js](https://www.npmjs.com/package/bcryptjs)

- _Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser._

  `$ npm install bcryptjs`

## 1.2 Development dependencies (packages):

### - [nodemon](https://nodemon.io/)

- _Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development._

  `$ npm install --save-dev nodemon`

---

## 1.3 Setup Express

We setup Express in the most simpliest manner

```
//Bring in Express
const express = require("express");

//Setup express
const app = express();
//Port
const port = process.env.PORT || 5000;

//Create simple test route
app.get("/", (req, res) => {
  res.send("Hello from Express");
});
//Start up the server and wait for incoming requests....
app.listen(port, () =>
  console.log(
    `Server is up and running, listening on request on port: ${port}`
  )
);
```

Having setup Express like above, we should now test the hitting the server, but first we need to change some settings for our startup scripts.

---

### Adjusting package.json & start the server

In `{} package.json`, locate the scripts section and add the following script entry:

```
{
  ....
  "scripts": {
    "start": "node server.js"
  }
  ...
}
```

With this done we can now start the server by entering:

`$ node server`

in our terminal of choice, and we should get this message in our terminal:

![Alt text](documentation/images/up_and_running.png)

---

### Test web server

Test the web server in your browser of choice by entering `localhost:5000` in the address field.

![Alt text](documentation/images/browser_check.jpg)

Yayyyy! our application is up and running and is reachable as well :)

In the next section we will start looking at the requirements for the application and begin building the initial tests based on that.
But first....

---

### Add Nodemon to start scripts

In order to make the development process easier, we don't want to re-start the server between code changes.

With introduction of nodemon in the mix, that package
will automatically re-start the development server as soon as changes are made to any of our files..

So...back to `{} package.json`.

Add another script attribute `"server":"nodemon server.js"` in the scripts object like so:

```
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  },
```

Now to have Nodemon monitor and restart the server as needed we run the following in the terminal:

`$ npm run server`

This will kick-off nodemon which in turn will run the "start" script

![Alt text](documentation/images/up_and_running_nodemon.jpg)

---

# 2. API Requirements and initiating TDD concept

In this section we should start setting the requirements for the API.

The full documentation of the API requirements are stored [here](./requirements/requirement_base.md).

Process and methodology is that we should try to map each requirement to a test case which we create using Chai assertion library.

The described tests will be run using Mocha test runner.

## 2.1 Installing additional dependencies

The following packages are installed to support validation and TDD development.

## 2.1.1 Production dependencies

### - [validator.js](https://github.com/chriso/validator.js/)

- _A library of string validators and sanitizers._

  `$ npm install validator`

## 2.1.2 Development dependencies

### - [request.js](https://github.com/request/request)

- _Simplified HTTP request client. Used for making HTTP requests to the API routes, during testing of the API_

  `$ npm i --save-dev request`

### - [chai.js](https://www.chaijs.com/)

- _Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework._

  `$ npm i --save-dev chai`

### - [mocha.js](https://mochajs.org/)

- _Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun._

  `$ npm i --save-dev mocha`
