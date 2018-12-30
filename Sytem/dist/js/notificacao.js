var ref = firebase.database().ref();

function cadastrar(data,id,tabela){
	postData = data;
	ref.child('/'+ tabela + '/' + id).set(postData);
}

var configuracoesModulo = angular.module('configuracoesModulo',['dirPagination']);

configuracoesModulo.controller("configuracoesModulo", function($scope, $http,$window){


	var arraySensor = $scope.sensores = [];

	var sensor = function(arraySensor,callback){
		ref.child("configuraoes").once('value',function (snapshot) {

			feed = [];
			snapshot.forEach(function (child) {
				var data = child.val();
				feed.push(data);				
			});
			callback(feed);

		});
	}
	sensor(arraySensor,function (callback) {
		for(var i=0;i<=callback.length;i++){
			arraySensor.push(callback[i]);
		}
	});

	setTimeout(function(){ $("th").click(); }, 2000);

	$("#lista td").attr("style","");

	$scope.selecionaSensor = function(sensorSelecionado){

		$scope.sensor = sensorSelecionado;
		//$window.open("http://www.google.com", '_blank');
		$('#myTab a[href="#nav-Cadastro"]').tab('open');
	}
	
		
			
	/*$scope.excluir = function() {
		$scope.setores.splice($scope.setores.indexOf($scope.setores,1));
		$scope.limparCampos();
		alert("Setor Deletado");
		
	}*/
	
	$scope.ordenar = function(keyname){
		
		$scope.sortKey = keyname;
				
		$scope.reverse = !$scope.reverse;
				
				
	}
		 

});