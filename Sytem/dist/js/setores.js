var ref = firebase.database().ref();

function cadastrar(data,id,tabela){
	postData = data;
	ref.child('/'+ tabela + '/' + id).set(postData);
}

var setoresModulo = angular.module('setoresModulo',['dirPagination']);

setoresModulo.controller("setoresController", function($scope, $http,$window){


	var arraySetor = $scope.setores = [];

	var setor = function(arraySetor,callback){
		ref.child("setor").once('value',function (snapshot) {

			feed = [];
			snapshot.forEach(function (child) {
				var data = child.val();
				feed.push(data);				
			});
			callback(feed);

		});
	}
	setor(arraySetor,function (callback) {
		for(var i=0;i<=callback.length;i++){
			arraySetor.push(callback[i]);
		}
	});

	setTimeout(function(){ $("th").click(); }, 2000);

	$("#lista td").attr("style","");

	$scope.selecionaSetor = function(setorSelecionado){

		$scope.setor = setorSelecionado;
		//$window.open("http://www.google.com", '_blank');
		$('#myTab a[href="#nav-Cadastro"]').tab('open');
	}
	$scope.limparCampos = function(){
		$scope.setor = "";
	}
			
	$scope.salvar = function() {


		nome = $("#nome").val();
		latitude = $("#latitude").val();
		longitude = $("#longitude").val();


		ref.child("setor").once('value', function(snapshot) {
			if (!(snapshot.exists())){
				id = 1;
			}
			else{
				json = snapshot.val();
				id = Object.keys(json).sort().pop();
                id = parseInt(id);
				id = id + 1;
			}

            postData = {
                codigo: id,
                nome: nome,
                latitude: latitude,
                longitude: longitude
        };
			cadastrar(postData,id,"setor");
		});


		// $scope.setores.push($scope.setor);


		alert("Setor Salvo Com Sucesso!");
        // $scope.limparCampos();



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