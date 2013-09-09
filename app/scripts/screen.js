angular.module('igApp', ['btford.socket-io']).
    controller('ScreenCtrl', function ($scope, socket) {

    'use strict';
    
    $scope.messages = [];
    socket.on('message', function (data) {
        $scope.messages.unshift(data.msg);
    });
    socket.on('delete_messages', function (data) {
        $scope.messages = [];
    });

    $scope.screen = null;
    socket.on('screen', function (data) {
        $scope.screen = (data.msg);
    });

    $scope.connected = false;
    socket.on('connect', function () {
        $scope.connected = true;
    });
    socket.on('disconnect', function () {
        $scope.connected = false;
    });
});
