/*global $:false */
'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

 // Commented out!
angular.module('clientApp')
//   .controller('MainCtrl', function ($scope) {
//     $scope.awesomeThings = [
//       'HTML5 Boilerplate',
//       'AngularJS',
//       'Karma'
//     ];
//   });

	// would have to add back $http below
	.controller('MainCtrl', function($scope) {
		$scope.addToMovies = function() {
			var movieToAdd = $scope.addMovie.replace(/\s/g, '');
			console.log($scope.addMovie);
			$.ajax({
				type: 'POST',
				url: 'http://localhost:7474/db/data/cypher/',
				accepts: 'application/json',
				dataType: 'json',
				data: {'query' : 'MERGE ('+ $scope.userInput +':Person {name: "'+ $scope.userInput +'"}) MERGE ('+ movieToAdd +':Movie {name: "'+ $scope.addMovie +'"}) MERGE ('+ $scope.userInput +')-[:RATED {rating:'+ $scope.movieRating +'}]->('+ movieToAdd +')',
						'params' : {}
					  },
				success: function() {
					$scope.ratings = 'meow';
					// debugger;
					console.log($scope.ratings);
				},
				error: function() {
					console.log('woof!');
				}
			});
		};
	});


// Works!
// MERGE (DavidPonticello:Person {name:'David Ponticello'})
// MERGE (RememberTheTitans:Movie {name:'Remember the Titans'})
// MERGE (DavidPonticello)-[:RATED {rating: 9}]->(RememberTheTitans)