/* Angular stuff goes here */
var socket = io.connect('http://localhost');

socket.on('news', function (data) {
  console.log(data);
});

function UserCtrl($scope) {
  //$scope.user.added = false;
  $scope.added = false;
  
  $scope.addUser = function() {
    
    $scope.added = true;
    // socket.emit('add', {
    //   todo: todo,
    //   createDate: new Date().getTime(),
    //   modifiedDate: new Date().getTime()
    // });


    
  }

}