'use strict';

angular.module('igApp', ['btford.socket-io']).
    controller('ChatCtrl', function ($scope, socket) {

    $scope.messages = [];
    socket.on('message', function (data) {
        $scope.messages.unshift(data.msg);
    });
    socket.on('delete_messages', function (data) {
        $scope.messages = [];
    });

    $scope.connected = false;
    socket.on('connect', function () {
        $scope.connected = true;
    });
    socket.on('disconnect', function () {
        $scope.connected = false;
    });

    $scope.speak = function() {
        var msg = $scope.message;
        if (msg) {
            socket.emit('message', { msg: msg});
        }
        $scope.message="";
    };
});
