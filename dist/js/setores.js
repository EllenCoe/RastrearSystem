var setoresModulo = angular.module('setoresModulo',['dirPagination']);

setoresModulo.controller("setoresController", function($scope, $http,$window){
	//urlSetor = 'http://localhost:8080/RastrearSystem/rest/setores';
	
	$scope.setores = [
		{codigo: 1, nome: 'Egas Moniz', latitude: '10.9', longitude: '-90'},
		{codigo: 2, nome: 'Ambulatorio Maria Fernanda', latitude: '8.9', longitude: '5'},
		{codigo: 3, nome: 'João de Deus 5º Andar', latitude: '9.2', longitude: '3'},
		{codigo: 4, nome: 'João de Deus 8º Andar', latitude: '9.0', longitude: '3'},
		{codigo: 5, nome: 'João de Deus 2º Andar UTI', latitude: '9.2', longitude: '3'}
	];
	
	$scope.selecionaSetor = function(setorSelecionado){
				
				$scope.setor = setorSelecionado;
				//$window.open("http://www.google.com", '_blank');
				$('#myTab a[href="#nav-Cadastro"]').tab('open');
			}
	$scope.limparCampos = function(){
				$scope.setor = "";
			}
			
	$scope.salvar = function() {
		$scope.setores.push($scope.setor);
		$scope.limparCampos();
		
		alert("Setor Salvo Com Sucesso!");
	
	
				/*if ($scope.setor.codigo == undefined) {
					
					
				   $http.post(urlSetor,$scope.setor).success(function(setor) {
					   alert("Salvo com Sucesso!");
				        //$scope.listarSetores();
				        $scope.limparCampos();
				   }).error (function (erro) {
						alert(erro);
					});
				  	
				} else {
					
					
					  $http.put(urlSetor,$scope.setor).success(function(setor) {
						  alert("Salvo com Sucesso!");
						  //$scope.listarSetores();
					      $scope.limparCampos();
					   }).error (function (erro) {
							alert(erro);
						});	
				}*/
				

			}
			
			$scope.excluir = function() {
		$scope.setores.splice($scope.setores.indexOf($scope.setores,1));
		$scope.limparCampos();
		alert("Setor Deletado");
				/*if ($scope.setor.codigo == undefined) {
					alert("Favor selecionar um registro para poder excluir");
					console.log("Favor selecionar um registro para poder excluir");
				} else {
					$http.delete(urlSetor+'/'+$scope.setor.codigo).success(function () {
						 $scope.listarSetores();
					     $scope.limparCampos();
					  }).error (function (erro) {
							alert(erro);
						});	
				}*/
	}
	
	$scope.ordenar = function(keyname){
		
		        $scope.sortKey = keyname;
				
		        $scope.reverse = !$scope.reverse;
				
				
		    }
		 
	 /*$scope.listarSetores = function(){
		 
		 $http.get(urlSetor).success(function (setores){
			 
			 	$scope.setores = setores;
		 }).error(function (erro){
			 alert(erro)
		 });}
	 
		 
			
		
	 
	 
		 $scope.listarSetores();*/
	 
	});
	
