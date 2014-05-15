// Module dependencies
var application_root = __dirname,
  express = require('express'), // Web framework
  path = require ('path'), // Utilities for dealind with file paths
  mongoose = require('mongoose'); // MongoDB integration
 

// Config (for later)
// var config = require( './config/config')();

// Create server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Configure server
app.configure( function() {

  // parses request body and populates request.body
  app.use( express.bodyParser() );

  // checks request.body for HTTP method overrides
  app.use( express.methodOverride() );

  // perform route lookup based on url and HTTP method
  app.use( app.router );

  // Where to serve static content
  app.use( express.static( path.join ( application_root, '/site' ) ) );

  // Show all errors in development
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

});

// Start server

var port = 4711;
server.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env);
});

// Routes

/*
  Note: do NOT use a get for the index.html page, just the api stuff
*/

app.get( '/api', function (request, response) {
  response.send( 'Our API is running' );
});

// Connect to the database
mongoose.connect('mongodb://localhost/chatty');

// Schemas
var user = new mongoose.Schema({
  name: String
});

var UserModel = mongoose.model( 'UserModel', user);

// Get a list of all before I die "todos"
app.get( '/api/users', function (request, response) {
  return UserModel.find( function ( err, user) {
    if ( !err) {
      console.log(data);
      return response.send( data );
    } else {
      return console.log(err);
    }
  });
});

// Insert a new "before i die" todo
app.post ( '/api/users', function ( request, response ) {
  var user = new UserModel({
    name: request.body.name,
  });

  return user.save( function ( err ) {
    if ( !err ) {
      console.log( 'created' );
      return response.send( user );
    } else {
      console.log( err );
    }
  });
});


// SOCKETS
io.sockets.on('connection', function(socket) {
  socket.join('ChatRoom');
  
  BeforeIDieModel.find({}, function(err, data) {
    socket.emit('news', {collection: data});
  }); 


  socket.on('add', function (data) {

    var user = new User({
      name: data.name
    });


    return goal.save( function ( err ) {
      if ( !err ) {
        console.log( 'created' );
      } else {
        console.log( err );
      }
    });
  })
});
