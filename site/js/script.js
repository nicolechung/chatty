/* Angular stuff goes here */
var socket = io.connect('http://localhost');
var chatty = angular.module('chatty', []);

socket.on('chat', function (data) {
  console.log(data);
});

chatty.factory('Username', function () {
   return {
    givenName : "",
    added: false
  };
});

chatty.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});


function UserCtrl($scope, $http, socket, Username) {
  $scope.users = {};
  $scope.message = {};
  $scope.messages = {};

 socket.on("refreshUsers", function(data){
    $scope.users = data.users;
  });

 socket.emit('getUsers', {});

 $scope.clear = function(){
  $http.get('/api/deleteAll')
    .success(function(data) {
      $scope.users = data;
      console.log("users",$scope.users);
    })
    .error(function(data) {
          });
 }

  $scope.addUser = function() {
    $scope.userName.added = true;
    Username.givenName = $scope.userName.name;
    Username.added = $scope.userName.added;
   $http.post('/api/users',$scope.userName)
    .success(function(data) {
      console.log(data);
    socket.emit('getUsers', {});
    })
    .error(function(data) {
          });

    //  $http.get('/api/users')
    // .success(function(data) {
    //   $scope.users = data;
    //   console.log("users",$scope.users);
    // })
    // .error(function(data) {
    //       });

  }
};
function MessagesCtrl($scope, $http, socket, Username) {

  $scope.displayName = {};
  $scope.displayName = Username;


  socket.on("refreshMessages", function(data){
    $scope.messages = data.messages;
  });


  $scope.sendMessage = function() {
    $scope.message.name = Username.givenName;
     $http.post('/api/message',$scope.message)
    .success(function(data) {

      socket.emit('getMessages', {});
      $scope.message.text = "";
    })
    .error(function(data) {
          });

    //  $http.get('/api/messages')
    // .success(function(data) {
    //   $scope.messages = data;
    //   console.log("users",$scope.messages);
    // })
    // .error(function(data) {
    //       });
  };
  
  

};