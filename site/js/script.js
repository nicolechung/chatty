/* Angular stuff goes here */
// var socket = io.connect('http://localhost');
var scotchTodo = angular.module('chatty', []);

// socket.on('news', function (data) {
//   console.log(data);
// });

function UserCtrl($scope, $http) {
  
$scope.users = {};

  $scope.userName = {};
  $scope.message = {};
  $scope.messages = {};
  $scope.addUser = function() {
    
   $http.post('/api/users',$scope.userName)
    .success(function(data) {
      alert('added user');
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

  $scope.sendMessage = function() {
    $scope.message.name = 'Giff';
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
  
  

}