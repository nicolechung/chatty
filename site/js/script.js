/* Angular stuff goes here */
// var socket = io.connect('http://localhost');
var scotchTodo = angular.module('chatty', []);

// socket.on('news', function (data) {
//   console.log(data);
// });

function UserCtrl($scope, $http) {
  
$scope.users = {};
  $scope.userName = '';
  $scope.addUser = function() {
    
   $http.post('/api/users',$scope.userName)
    .success(function(data) {
      alert('added user');
      console.log(data);
    })
    .error(function(data) {
      alert("dd");
          });

     $http.get('/api/users')
    .success(function(data) {
      $scope.users = data;
      console.log("Asfasf",$scope.users);
    })
    .error(function(data) {
      alert("dd");
          });

  }

}