# Social Feed Reader

![Travis Build Status](https://travis-ci.org/tonyedwardspz/social-feed-feeder.svg?branch=master "Travis Build Status")

## Overview
This is an application which algorithmically generates a schedule for posting to social media,
initially just twitter via buffer. This app has been created for a javascript module at
university.

## Goals
I have chosen to create the application in the way I have because:

- I want to be more comfortable & fluent programming using JavaScript after a little bit of time away from front end.
- Use ES6 features where logical, transpiling using [Babel](https://babeljs.io/).
- Learn the fundamentals of creating a PWA
- Transfer design patterns from `Ruby on Rails` to a JavaScript project to see how it goes.

## Prerequisites

In order to run this project you need `npm` and `node.js` installed. Please
refer to the relevant documentation for instructions.

Add your environment variables as indicated in the `example.env` file, saving it as `.env`.
If you're lucky enough to have the variables provided by me, add them in the same way.

## Installation
To install the project:

Clone the project locally, and move into project directory:

```
git clone https://github.com/tonyedwardspz/social-feed-reader && cd social-feed-reader
```

Install dependencies:

```
npm install
```

## Run things

The project uses [Gulp](http://gulpjs.com/) for the build system. There
are a few tasks which are suggested. All tasks are run from the project directory
on the command line.

To build the project run:

```
gulp
```

To build the project and watch for changes use:
```
gulp dev
```
Intentionally, the browser does not refresh after each change, however the server will restart and files will be
regenerated.

### Other tasks
There are a couple other tasks you may wish to run:

#### Tests

To run the projects tests use the command `npm test`. This will execute some
good 'ol assertion tests followed by QUnit integration tests, which require the
building of the project.

#### Documentation

To generate the project's documentation, run the common `gulp doc`. The documentation
can be found in the `./doc/gen` folder, with `index.html` as the starting point.

## Deployment
The project uses a TravisCI to run tests, deploying code to a heroku dyno if passing.
This is triggered by a push to the master branch.

## Contributing

Contributions / pull requests etc are not accepted. This is a university project and
that would break guidelines. If you see something that I can improve please get in touch
initially on [twitter](https://twitter.com/tonyedwardspz). To quote Professor Mehran Sahami of
Stanford University:

> Share ideas.... not code.

## Authors
- *Tony Edwards*
    - [Twitter](https://twitter.com/tonyedwardspz)

## License
There is not license until I hand this in :(
