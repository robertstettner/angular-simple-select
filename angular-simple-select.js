/* 
 * Angular JS Simple Select
 * Creates a simple list with icon checkboxes. 
 *
 * Project started on: Tue, 19 Aug 2014
 * Current version: 0.0.1
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

 angular.module( 'simple-select', ['ng'] ).directive( 'simpleSelect' , [ '$timeout', function ( $timeout ) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {   
            collection: '=',
            onItemClick: '&'                   
        },
        template:
        	'<ul class="simple-select">' +
                '<li ng-repeat="item in collection" ng-class="{active: item.ticked}" ng-click="toggle(item)">' + 
                	'<span class="icon" ng-if="item.icon" ng-bind-html-unsafe="item.icon"></span>' +
                	'<span>{{item.name}}</span>' +
                '</li>' +
            '</ul>',

        link: function ( $scope, element, attrs ) {
        	$scope.clickedItem = null;       
        	
        	$scope.toggle = function( item ) {
                item.ticked = !item.ticked;
                $scope.clickedItem = item;
        	};
        	
        	$scope.$watch( 'collection' , function( val ) {                                 
                if ( val && $scope.clickedItem !== null ) {                        
                    $timeout( function() {
                        $scope.onItemClick( { data: $scope.clickedItem } );
                        $scope.clickedItem = null;
                    }, 0 );                                                 
                }
            }, true);
        }   
    }
}]);