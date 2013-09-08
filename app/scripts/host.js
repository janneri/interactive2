'use strict';

angular.module('igApp', ['btford.socket-io']).
    controller('HostCtrl', function ($scope, socket) {


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

    $scope.show = function() {
        var msg = $scope.message;
        if (msg) {
            socket.emit('screen', { msg: msg});
        }
        $scope.message="";
    };

    $scope.select = function(msg) {
        socket.emit('screen', { msg: msg});        
    }

    $scope.show_messages = function() {
        socket.emit('screen', { msg: null});
    }

    $scope.delete_messages = function() {
        socket.emit('delete_messages');
    }
});
