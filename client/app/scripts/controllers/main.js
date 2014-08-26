/*global $:false */
'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

angular.module('clientApp')
	.controller('MainCtrl', function($scope) {
		$scope.addToMovies = function() {
			var movieToAdd = $scope.addMovie.replace(/\s/g, '');
			console.log($scope.addMovie);
			$.ajax({
				type: 'POST',
				url: 'http://localhost:7474/db/data/cypher/',
				accepts: 'application/json',
				dataType: 'json',
				data: {'query' : 'MERGE ('+ $scope.userInput +':Person {name: "'+ $scope.userInput +'"}) MERGE ('+ movieToAdd +':Movie {name: "'+ $scope.addMovie +'"}) MERGE ('+ $scope.userInput +')-[:RATED {rating:'+ $scope.movieRating +'}]->('+ movieToAdd +')', 'params' : {}
				},
				success: function() {
					$scope.ratings = 'meow';
					console.log($scope.ratings);
				},
				error: function() {
					console.log('woof!');
				}
			});
		};

		$scope.generateSimilarities = function() {
			$.ajax({
				type: 'POST',
				url: 'http://localhost:7474/db/data/cypher/',
				accepts: 'application/json',
				dataType: 'json',
				data: {'query' : 'MATCH (p1:Person)-[x:RATED]->(m:Movie)<-[y:RATED]-(p2:Person) WITH SUM(x.rating * y.rating) AS xyDotProduct, SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.rating) | xDot + a^2)) AS xLength, SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.rating) | yDot + b^2)) AS yLength, p1, p2 MERGE (p1)-[s:SIMILARITY]-(p2) SET s.similarity = xyDotProduct / (xLength * yLength)', 'params' : {}
				},
				success: function() {
					console.log('LOVE!');
				},
				error: function() {
					console.log('NO LOVE!');
				}
			});
		};

		$scope.generateRecommendations = function() {
			$scope.generateSimilarities();
			// would need to set the below to 'request'
			$.ajax({
				type: 'POST',
				url: 'http://localhost:7474/db/data/cypher/',
				accepts: 'application/json',
				dataType: 'json',
				data: {'query': 'MATCH (b:Person)-[r:RATED]->(m:Movie), (b)-[s:SIMILARITY]-(a:Person {name:"'+ $scope.userInput +'"}) WHERE NOT((a)-[:RATED]->(m)) WITH m, s.similarity AS similarity, r.rating AS rating ORDER BY m.name, similarity DESC WITH m.name AS movie, COLLECT(rating)[0..3] AS ratings WITH movie, REDUCE(s = 0, i IN ratings | s + i)*1.0 / LENGTH(ratings) AS reco ORDER BY reco DESC RETURN movie AS Movie, reco AS Recommendation', 'params' : {}
				},
				success: function(data) {
					$scope.results = data.data;
					console.log($scope.results);
					console.log('meow!');
				},
				async: false, // would like to replace this
				error: function() {
					console.log('Final error!');
				}
			});
			// $.when(request).done(function(request) {
			// 	$scope.results = request.data;
			// 	console.log($scope.results);
			// 	console.log('Done!');
			// });
		};
	});
