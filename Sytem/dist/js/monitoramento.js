var ref = firebase.database().ref();

function cadastrar(data,id,tabela){
	postData = data;
	ref.child('/'+ tabela + '/' + id).set(postData);
}

function delete_firebase(id,tabela){
	ref.child('/'+ tabela + '/' + id).set(postData);
}

// if (typeof(Number.prototype.toRad) === "undefined") {
// 	Number.prototype.toRad = function() {
// 		return Math.abs(this * Math.PI / 180);
// 	}
// }


function toRad(number){
	return Math.abs(number * Math.PI / 180);
}

function calcula_alguma_coisa(latitude,longitude,arraySetor){
		var lat2 = latitude;
		var lon2 = longitude;
		var arrayDistancia = [];
		for(var j = 0; j<arraySetor.length;j++){
		
			
			var lat1 = arraySetor[j].latitude; 
			var lon1 = arraySetor[j].longitude; 

			// alert(lat2);
			// alert(lon2);

			// alert(lat1);
			// alert(lon1);
			
			
			var R = 6371; // km 
			//has a problem with the .toRad() method below.
			var x1 = lat2-lat1;
			var dLat = toRad(x1);
			var x2 = lon2-lon1;
			var dLon = toRad(x2);  
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
							Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
							Math.sin(dLon/2) * Math.sin(dLon/2);  
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = (R * c)*1000;
			//console.log(d);
			arrayDistancia.push(d);	
			//console.log(arrayDistancia);
	}
	
	
			var minimaDistancia = Math.min.apply(Math,arrayDistancia);
			posicao = arrayDistancia.indexOf(minimaDistancia);
				
				//console.log(posicao);
				
			if(minimaDistancia<=5){
				
				var result = arraySetor[posicao].nome;
			}
			else{
			result = "Não cadastrado. Setor mais próximo: " + arraySetor[posicao].nome;
			}
	return result;
	// console.log(d);
	// if(d<=10){
	// 	alert("está no setor"+arraySetor[j].nome);
	// 	return arraySetor[j].nome;
	// }
	// // console.log(arraySetor[j].nome);
	// return "Não encontrado";
}


var monitoramentoModulo = angular.module('monitoramentoController',['dirPagination']);

monitoramentoModulo.controller("monitoramentoController", function($scope, $http,$window){



	var log = $scope.monitoramentos = [];
	var arrayDispositivo = [];
	var arrayEquipamento = [];

	
	$("#loader").show();
	
	var dispositivos = function(arrayDispositivo,callback){
		ref.child("dispositivos").once('value',function (snapshot) {
			feed = [];
			snapshot.forEach(function (child) {
				var data = child.val();
				feed.push(data);
			});
			callback(feed);

		});
	}
	dispositivos(arrayDispositivo,function (callback) {
		for(var i=0;i<callback.length;i++){
			arrayDispositivo.push(callback[i]);
		}
		
		var equipamento = function(arrayDispositivo,callback){
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
			for(var i=0;i<callback.length;i++){
				arrayEquipamento.push(callback[i]);
			}
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
				
				// var log = [];
				var value = [];
				
				for(var i=0;i<arrayEquipamento.length;i++){
					aux_dispositivo = arrayDispositivo.filter(function(value,index,arr){
						
						return value.codigo == arrayEquipamento[i].dispositivo;
					});

					aux_setor = arraySetor.filter(function(value,index,arr){
						return value.codigo == arrayEquipamento[i].setor;
					});
					
					if (arrayDispositivo[0] !== undefined && arrayEquipamento[i].dispositivo != "0"){
						setor_atual = calcula_alguma_coisa(aux_dispositivo[0].Latitude,aux_dispositivo[0].Longitude,arraySetor);
						log_aux = {
							data: aux_dispositivo[0].Data,
							latitude_dispositivo: aux_dispositivo[0].Latitude,
							longitude_dispositivo: aux_dispositivo[0].Longitude,
							nome: arrayEquipamento[i].nome,
							equipamento_id: arrayEquipamento[i].codigo,
							setor_nome: arrayEquipamento[i].setor_nome,
							setor_id: arrayEquipamento[0].setor,
							latitude_setor: aux_setor[0].latitude,
							longitude_setor: aux_setor[0].longitude,
							setor_atual: setor_atual
						}
						
						log.push(log_aux);
						cadastrar(log_aux,log_aux.equipamento_id,"log");
						
					}
					
				}
				if(log != null){ $("#loader").hide()};
			});
		});
	});
	
	
	
	$scope.detalhar = function(monitoramentoSelecionado) {
		
		$scope.monitoramento = monitoramentoSelecionado;
		
		var id = $scope.monitoramento.equipamento_id;
		var filtro = arrayEquipamento.filter( function(item) { return item.codigo == id } );
		
		
		$scope.monitoramento_equipamento = filtro[0];

	}
	setTimeout(function(){ $("th").click(); }, 2000);

	$("#lista td").attr("style","");


	$scope.ordenar = function(keyname){
		$scope.sortKey = keyname;
		$scope.reverse = !$scope.reverse;
	}
	
	setInterval(function(){ 
		$window.location.reload();
		}, 60000);

});