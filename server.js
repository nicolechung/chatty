//testing
// Module dependencies
var application_root = __dirname,
  express = require('express'), // Web framework
  path = require ('path'), // Utilities for dealind with file paths
  mongoose = require('mongoose'); // MongoDB integration
 


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

app.get( '/api', function (request, response) {
  response.send( 'Our API is running' );
});

// Connect to the database
mongoose.connect('mongodb://localhost/chatty');

// Schemas
var user = new mongoose.Schema({
  name: String
});

var message = new mongoose.Schema({
  userName: String,
  text: String
});


var UserModel = mongoose.model( 'UserModel', user);

var MessageModel = mongoose.model ( 'MessageModel', message);


// Get a list of all users
app.get( '/api/users', function (request, response) {
  // use mongoose to get all todos in the database
    UserModel.find(function(err, users) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        response.send(err)

      response.json(users); // return all todos in JSON format
    });
});

// Insert a new user 
app.post ( '/api/user', function ( request, response ) {
  var user = new UserModel({
    name: request.body.name,
  });
console.log(user);
  return user.save( function ( err ) {
    if ( !err ) {
      console.log( 'created' );
      return response.send( user );
    } else {
      console.log( err );
    }
  });
});


// Get a list of all messages
app.get( '/api/messages', function (request, response) {
  // use mongoose to get all todos in the database
    MessageModel.find(function(err, messages) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        response.send(err)

      response.json(messages); // return all todos in JSON format
    });
});



// Insert a new message
app.post ( '/api/message', function ( request, response ) {
  var message = new MessageModel({
    userName: request.body.name,
    text: request.body.text
  });
console.log(message);
  return message.save( function ( err ) {
    if ( !err ) {
      console.log( 'message created' );
      return response.send( message );
    } else {
      console.log( err );
    }
  });
});

//clear database collections
app.get( '/api/deleteAll', function (request, response) {
   MessageModel.remove().exec();

    UserModel.remove().exec();
});

// SOCKETS
io.sockets.on('connection', function(socket) {
  console.log("connected");

// triggered when user is added
socket.on('updateUsers', function(data)
{
    UserModel.find({}, function(err, data) {
     io.sockets.emit('displayUsers', {users: data});
   }); 
});

//triggered when messages is added
socket.on('updateMessages', function(data)
{
    MessageModel.find({}, function(err, data) {

     io.sockets.emit('displayMessages', {messages: data});
   }); 
});
 
});

