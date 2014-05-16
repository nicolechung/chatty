/* Angular stuff goes here */
// var socket = io.connect('http://localhost');
var chatty = angular.module('chatty', []);

// socket.on('news', function (data) {
//   console.log(data);
// });

chatty.factory('Username', function () {
   
   return {
    givenName : "John"
  };
});


function UserCtrl($scope, $http, Username) {
$scope.users = {};

  //$scope.userName = Username;
  $scope.message = {};
  $scope.messages = {};
  $scope.addUser = function() {
    Username.givenName = $scope.userName.name;
    alert(Username.givenName);
   $http.post('/api/users',$scope.userName.name)
    .success(function(data) {
      console.log(data);
    })
    .error(function(data) {
          });

     $http.get('/api/users')
    .success(function(data) {
      $scope.users = data;
      console.log("users",$scope.users);
    })
    .error(function(data) {
          });

  }
};
function MessagesCtrl($scope, $http,Username) {
  $scope.sendMessage = function() {
    $scope.message.name = Username.givenName;
    console.log($scope.message);
     $http.post('/api/message',$scope.message)
    .success(function(data) {

      console.log(data);
    })
    .error(function(data) {
          });

     $http.get('/api/messages')
    .success(function(data) {
      $scope.messages = data;
      console.log("users",$scope.messages);
    })
    .error(function(data) {
          });
  };
  
  

};