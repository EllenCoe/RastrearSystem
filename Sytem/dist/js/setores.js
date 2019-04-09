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
	
	$scope.andares =[{"codigo": 0,"texto":"Terreo"},{"codigo": 1,"texto":"Primeiro andar"},{"codigo": 2,"texto":"Segundo andar"},{"codigo": 3,"texto":"Terceiro andar"}];
	
	$(window).on('load', function () {
		
		$('#preloader .inner').fadeOut();
		$('#imagemTeste').fadeOut();
		$('#preloader').fadeOut(); 
		
	});
	$("#loader").show();
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
		$("th").click();
		if(arraySetor.length != 0){ $("#loader").hide();
		};
		
		
	});
	
	var arrayEquipamento = [];
	
	

    var equipamento = function(arrayEquipamento,callback){
        ref.child("equipamento").once('value',function (snapshot) {

            feed = [];
            snapshot.forEach(function (child) {
                var data = child.val();
                feed.push(data);				
            });
            callback(feed);

        });
    }
    equipamento(arrayEquipamento,function (callback) {
        for(var i=0;i<=callback.length;i++){
            if (callback[i] !== undefined){
                arrayEquipamento.push(callback[i]);
				
            }
        }
        $("th").click();
		
    });
	console.log(arrayEquipamento);
	setTimeout(function(){ $("th").click(); }, 2000);
		
	
	$("#lista td").attr("style","");

	$scope.selecionaSetor = function(setorSelecionado){

		$scope.setor = setorSelecionado;
		//$window.open("http://www.google.com", '_blank');
		//$('#myTab a[href="#nav-Cadastro"]').tab('open');
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
		
		$("#span-andar-"+id).hide();
		$("#input-andar-"+id).show();
	}

	$scope.alterar = function(id) {

		nome_old = $("#span-nome-"+id).text();
		latitude_old = $("#span-latitude-"+id).text();
		longitude_old = $("#span-longitude-"+id).text();
		andar_old = $("#span-andar-"+id).text();

		

		$("#cancel-"+id).hide();
		$("#alterar-"+id).hide();
		$("#editar-"+id).show();
		
		$("#span-nome-"+id).show();
		$("#input-nome-"+id).hide();

		$("#span-latitude-"+id).show();
		$("#input-latitude-"+id).hide();

		$("#span-longitude-"+id).show();
		$("#input-longitude-"+id).hide();
		
		$("#span-andar-"+id).show();
		$("#input-andar-"+id).hide();



		nome = $("#input-nome-"+id).val();
		latitude = $("#input-latitude-"+id).val();
		longitude = $("#input-longitude-"+id).val();
		andar = $("#input-andar-"+id).val();
		
		
		if (nome == ""){
			nome = nome_old;
		}
		if (latitude == ""){
			latitude = latitude_old;
		}
		if (longitude == ""){
			longitude = longitude_old;
		}
		if (andar == ""){
			andar = andar_old;
		}
		postData = {
			codigo: id,
			nome: nome,
			latitude: latitude,
			longitude: longitude,
			andar:andar
		};
		cadastrar(postData,id,"setor");

		$scope.cancel(id);

		$("#span-nome-"+id).text(nome);
		$("#span-latitude-"+id).text(latitude);
		$("#span-longitude-"+id).text(longitude);
		$("#span-andar-"+id).text(andar);
		
		if(nome != nome_old || latitude != latitude_old || longitude != longitude_old){
			$('#alertSalvar').fadeIn(1000);
		   setTimeout(function() { 
			   $('#alertSalvar').fadeOut(1000); 
			}, 5000);
		}
		
	}

	$scope.excluir = function(id,setorSelecionado) {
		
		
		var setor_exist = arrayEquipamento.filter( function(item) { return item.setor == id });
		
		
		if(setor_exist.length > 0){
			$('#alertIndisponivel').fadeIn(1000);
			setTimeout(function() { 
			$('#alertIndisponivel').fadeOut(1000); 
			}, 5000);
		}else{
				$scope.setores = $scope.setores.filter(function(value, index, arr){
				return value.codigo != id;
			});
			cadastrar(null,id,"setor");
		
			$('#alertExcluir').fadeIn(1000);
		   setTimeout(function() { 
			   $('#alertExcluir').fadeOut(1000); 
		   }, 5000);
			
			
		}
		
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
		
		$("#span-andar-"+id).show();
		$("#input-andar-"+id).hide();
	}
			
	$scope.salvar = function() {


		nome = $("#nome").val();
		latitude = $("#latitude").val();
		longitude = $("#longitude").val();
		andar = $("#andar").val();
        console.log("ANDAR", andar);
		


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
                longitude: longitude,
				andar: andar
        };
			console.log(id);
			cadastrar(postData,id,"setor");
		});


		
		$('#alertCadastrar').fadeIn(1000);
	   setTimeout(function() { 
		   $('#alertCadastrar').fadeOut(1000); 
	   }, 5000);
		
		
		$scope.limparCampos(); 
			

	}
	
	
	$scope.ordenar = function(keyname){
		
		$scope.sortKey = keyname;
				
		$scope.reverse = !$scope.reverse;
				
				
	}
	
	
	
});