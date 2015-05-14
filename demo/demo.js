'use strict';

angular.module('demo.simple-select', ['simple-select'])
    .controller('DemoController', ['$scope', function($scope){

        $scope.collection = [
            { name: 'Item A', ticked: false },
            { name: 'Item B', ticked: false }
        ];

    }]);
