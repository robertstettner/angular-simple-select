'use strict';

/*
 * Angular JS Simple Select
 * Creates a simple list with icon checkboxes.
 *
 * Project started on: Tue, 19 Aug 2014
 * Current version: 0.0.2
 *
 * Released under the MIT License
 * --------------------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Robert Stettner (https://github.com/robertstettner)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * --------------------------------------------------------------------------------
 */

 angular.module( 'simple-select', ['ng'] ).directive( 'simpleSelect' , [ '$sce', '$timeout', '$filter', '$compile',
    function ( $sce, $timeout, $filter, $compile ) {
    return {
        restrict: 'AE',
        scope: {
            collection: '=',
            itemName: '@itemName',
            itemTicked: '@itemTicked',
            itemDisabled: '@itemDisabled',
            onItemClick: '&',
            onTickAll: '&'
        },
        compile: function(element) {

            var html = element.html().length === 0 ? '{{ item[itemName] }}' : element.html();

            var template = angular.element('<ul class="simple-select">' +
                '<li ng-click="tickAll()" ng-class="{active: tickedAll }" class="tickAll"><span>Select All</span></li>' +
                '<li ng-repeat="item in collection" ng-disabled="item.disabled" ng-class="{active: item.active, disabled: item.disabled}" ng-click="toggle(item)">' +
                    '<span>'+ html +'</span>' +
                '</li>' +

            '</ul>');

            element.empty();

            return function($scope, element, attrs) {

                $scope.clickedItem = null;
                $scope.itemName = $scope.itemName || 'name';
                $scope.itemTicked = $scope.itemTicked || 'ticked';
                $scope.itemDisabled = $scope.itemDisabled || 'disabled';

                $scope.hasOnItemClick = function() {
                    return angular.isDefined(attrs['onItemClick']);
                };

                $scope.hasOnTickAll = function() {
                    return angular.isDefined(attrs['onTickAll']);
                };

                $scope.trustHtml = function(html) {
                    return $sce.trustAsHtml(html);
                };

                $scope.tickAll = function() {
                    $scope.tickedAll = !$scope.tickedAll;
                    if (typeof $scope.tickedAll === 'boolean') {
                        if ($scope.hasOnTickAll()) {
                            $scope.onTickAll({data: $scope.tickedAll});
                        } else {
                            $scope.tickAllDefault($scope.tickedAll);
                        }
                    }
                };

                $scope.tickAllDefault = function(tickedAll) {

                    $scope.collection.forEach(function(val) {
                        val[$scope.itemTicked] = (_.isUndefined(val[$scope.itemDisabled]) && tickedAll) || (val[$scope.itemDisabled] && tickedAll);
                    });

                };

                $scope.toggle = function( item ) {
                    if (item && !item[$scope.itemDisabled]) {
                        item[$scope.itemTicked] = !item[$scope.itemTicked];
                        $scope.clickedItem = item;
                    }
                };

                $scope.$watch('collection', function(val) {

                    var enabledCount = 0,
                        tickedCount = 0;

                    if (val) {

                        enabledCount = _.filter(val, function(n) {
                            return !$scope.itemDisabled || ($scope.itemDisabled && !n[$scope.itemDisabled]);
                        }).length;

                        tickedCount = _.filter(val, function(n) {
                            return (!$scope.itemDisabled && n[$scope.itemTicked]) || ($scope.itemDisabled && !n[$scope.itemDisabled] && n[$scope.itemTicked]);
                        }).length;

                        $scope.tickedAll = enabledCount == tickedCount;
                    }

                },true);

                $scope.$watch( 'clickedItem' , function( val ) {
                    if ( val && $scope.clickedItem !== null ) {
                        if ($scope.hasOnItemClick) {
                            $scope.onItemClick( { data: val } );
                        }
                        $scope.clickedItem = null;
                    }
                });

                element.append(template);
                $compile(template)($scope);

            };
        }
    };
}]);
