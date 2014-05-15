/* Angular stuff goes here */
var socket = io.connect('http://localhost');

socket.on('news', function (data) {
  console.log(data);
});

function MessageCtrl($scope) {
  $scope.addMessage = function() {
    var message = $scope.beforeIDieTxt;

    socket.emit('add', {
      todo: todo,
      createDate: new Date().getTime(),
      modifiedDate: new Date().getTime()
    });
  }
}