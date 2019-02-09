var ref = firebase.database().ref();

function cadastrar(data,id,tabela){
	postData = data;
	ref.child('/'+ tabela + '/' + id).set(postData);
}

function delete_firebase(id,tabela){
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
		for(var i=0;i<callback.length;i++){
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

	$scope.editar = function(id) {


		$("#editar-"+id).hide();
		$("#alterar-"+id).show();
		$("#cancel-"+id).show();

		$("#span-nome-"+id).hide();
		$("#input-nome-"+id).show();

		$("#span-latitude-"+id).hide();
		$("#input-latitude-"+id).show();

		$("#span-longitude-"+id).hide();
		$("#input-longitude-"+id).show();
	}

	$scope.alterar = function(id) {

		nome_old = $("#span-nome-"+id).text();
		latitude_old = $("#span-latitude-"+id).text();
		longitude_old = $("#span-longitude-"+id).text();

		

		$("#cancel-"+id).hide();
		$("#alterar-"+id).hide();
		$("#editar-"+id).show();
		
		$("#span-nome-"+id).show();
		$("#input-nome-"+id).hide();

		$("#span-latitude-"+id).show();
		$("#input-latitude-"+id).hide();

		$("#span-longitude-"+id).show();
		$("#input-longitude-"+id).hide();


		nome = $("#input-nome-"+id).val();
		latitude = $("#input-latitude-"+id).val();
		longitude = $("#input-longitude-"+id).val();
		
		if (nome == ""){
			nome = nome_old;
		}
		if (latitude == ""){
			latitude = latitude_old;
		}
		if (longitude == ""){
			longitude = longitude_old;
		}
		postData = {
			codigo: id,
			nome: nome,
			latitude: latitude,
			longitude: longitude
		};
		cadastrar(postData,id,"setor");

		$scope.cancel(id);

		$("#span-nome-"+id).text(nome);
		$("#span-latitude-"+id).text(latitude);
		$("#span-longitude-"+id).text(longitude);
	}

	$scope.excluir = function(id,setorSelecionado) {
		$scope.setores = $scope.setores.filter(function(value, index, arr){
			return value.codigo != id;
		});

		cadastrar(null,id,"setor");
		alert("Setor Deletado");
	}

	$scope.cancel = function(id) {
		$("#cancel-"+id).hide();
		$("#alterar-"+id).hide();
		$("#editar-"+id).show();
		
		$("#span-nome-"+id).show();
		$("#input-nome-"+id).hide();

		$("#span-latitude-"+id).show();
		$("#input-latitude-"+id).hide();

		$("#span-longitude-"+id).show();
		$("#input-longitude-"+id).hide();
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