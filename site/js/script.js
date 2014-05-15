/* Angular stuff goes here */
var socket = io.connect('http://localhost');

socket.on('news', function (data) {
  console.log(data);
});

function UserCtrl($scope) {
  $scope.userAdded = false;
  
  $scope.addUser = function() {
    var user = $scope.userName;

    socket.emit('add', {
      todo: todo,
      createDate: new Date().getTime(),
      modifiedDate: new Date().getTime()
    });

    $scope.userAdded = true;
    alert($scope.userAdded);
  }

}