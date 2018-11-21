var setoresModulo = angular.module('setoresModulo',['dirPagination']);

setoresModulo.controller("setoresController", function($scope, $http,$window){
	
	$http.get('../dist/js/setoresjson.json').then(function(response){
		$scope.setores = response.data.setores;
		})
		
	});


