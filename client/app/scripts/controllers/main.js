'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

 // Commented out!
// angular.module('clientApp')
//   .controller('MainCtrl', function ($scope) {
//     $scope.awesomeThings = [
//       'HTML5 Boilerplate',
//       'AngularJS',
//       'Karma'
//     ];
//   });


.controller('MainCtrl', function($scope, $http) {
	$scope.doSearch = function() {
		$http.post('http://localhost:7474/db/data/cypher/',
			'{')
	}
})