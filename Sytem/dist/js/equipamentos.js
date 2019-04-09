var ref = firebase.database().ref();


function cadastrar(data,id,tabela){
    postData = data;
    ref.child('/'+ tabela + '/' + id).set(postData);
}

function disponiveis(banco,equipamento){
	
	//console.log("arrayDispositivosBanco",banco);
	//console.log("arrayDispositivosBancoEquipamentos",equipamento);
	

	//console.log("length",banco.length)
	//console.log(banco[0]);
	for(i=0;banco.length;i++){
		
		var dispositivo_ja_registrado = equipamento.indexOf(banco[i]);
		
		//console.log("dispositivo_ja_registrado",dispositivo_ja_registrado);
	}
	
	return 0;
	
	//console.log("disponiveis", disponivel);
        /*var apenasNoR2 = r2.filter(function (element, index, array) {
            if(r1.indexOf(element) == -1)
                return element;
        });

        var todasAsDiferencas = apenasNoR1.concat(apenasNoR2);

        alert(todasAsDiferencas);
		*/
	
}
var equipamentosModulo = angular.module('equipamentosModulo', ['dirPagination']);
equipamentosModulo.controller("equipamentosController", function($scope, $http, $window) {

    //urlEquipamento = 'http://localhost:8080/RastrearSystem/rest/Equipamentos';
	$(window).on('load', function () {
		
		$('#preloader .inner').fadeOut();
		$('#imagemTeste').fadeOut();
		$('#preloader').fadeOut(); 
	});

    var arraySetor = $scope.setores = [];
	
	$("#loader").show();
	
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
	
	var arrayLogs = $scope.logs = [];
	
	
    var logArray = function(arrayLogs,callback){
        ref.child("log").once('value',function (snapshot) {

            feed = [];
            snapshot.forEach(function (child) {
                var data = child.val();
                feed.push(data);				
            });
            callback(feed);

        });
    }
	
	
    logArray(arrayLogs,function (callback) {
        for(var i=0;i<=callback.length;i++){
			if(callback != undefined){
				arrayLogs.push(callback[i]);
			}
        }
    });
	
	
    var arrayEquipamento = $scope.equipamentos = [];
	
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
		
		if(arrayEquipamento.length != 0){ $("#loader").hide()};
		
    });
	
	
	var arrayDispositivosBanco = [];
	
	var arrayDispositivos = $scope.dispositivos = [];

    var dispositivoBanco = function(arrayDispositivosBanco,callback){
        ref.child("dispositivos").once('value',function (snapshot) {

            feed = [];
            snapshot.forEach(function (child) {
                var data = child.val();
                feed.push(data);				
            });
            callback(feed);

        });
    }
	
    dispositivoBanco(arrayDispositivosBanco,function (callback) {
        for(var i=0;i<=callback.length;i++){
            if (callback[i] !== undefined){
                arrayDispositivosBanco.push(callback[i]);
				var value = [];	
            }
        }
		//console.log("Dispositivos banco",arrayDispositivosBanco);
		
		for(var j=0;j<arrayDispositivosBanco.length;j++){
			
					equip = arrayEquipamento.filter(function(value,index,arr){
						
						return value.dispositivo == arrayDispositivosBanco[j].codigo;
					});
					//console.log(equip);
				
				
				if(equip.length == 0){ 
					
					arrayDispositivos.push(arrayDispositivosBanco[j]);
					//console.log(arrayDispositivosBanco);
					
					}
				//console.log("equip ", equip );
			}
	
    });
	
	
    
    setTimeout(function(){ $("th").click(); }, 3000);

	
	
    $scope.selecionaEquipamento = function(equipamentoSelecionado) {
        $scope.equipamento = equipamentoSelecionado;
        
        //$('#myTab a[href="#nav-Cadastro"]').tab('open');
    },
    $scope.selecionaSetor = function(setorSelecionado) {
        $scope.setor = setorSelecionado;
        $scope.equipamento.setor = setorSelecionado;
        
    },
    $scope.selecionaDispositivo = function(dispositivoSelecionado) {
        $scope.dispositivo = dispositivoSelecionado;
        $scope.equipamento.tag = setorSelecionado;
		
        
    },
    $scope.limparCampos = function() {
        $scope.equipamento = "";
    },
    $scope.salvar = function() {

        nome = $("#nome").val();
        marca = $("#marca").val();
        modelo = $("#modelo").val();
        serie = $("#serie").val();
        patrimonio = $("#patrimonio").val();
		tag_ident = $("#tag").val();
        //console.log(tag_ident);
		
		$('#tag option:selected').remove();
		
        setor = $("#inputGroupSelect3").val();
        setor = parseInt(setor);
        setor_nome = $('#inputGroupSelect3 option:selected').text();
		
        if (tag_ident == "" || tag_ident == undefined){
			tag_ident = false;
            tag_ident = "0";
        }else{
			//$("#tag option[value="+ tag_ident +"]").attr('disabled','disabled').siblings().removeAttr('disabled');
			//$("#theSelect).find(tag_ident).remove();
			$scope.disabled={};
				
		}
        //else, cadastra na tabela de log
		
		//alert("valor do dispositivoselecionado",tag_ident);
		var filtro = arrayEquipamento.filter( function(item) { return item.dispositivo != 0 } );
		//console.log("FILTRO",filtro);
		var tag_exist = filtro.filter( function(item) { return item.dispositivo == tag_ident });
		//console.log("tag_exist",tag_exist);
		
		if(tag_exist.length > 0){
			$('#alertDispositivo').fadeIn(1000);
			setTimeout(function() { 
				$('#alertDispositivo').fadeOut(1000); 
			}, 5000);
			
		}else{
		
			ref.child("equipamento").once('value', function(snapshot) {
				
				if (!(snapshot.exists())){
					id = 1;
				}
				else{
					json = snapshot.val();
					id = Object.keys(json).sort().pop();
					id = parseInt(id)
					id = id + 1;
				}
				postData = {
					codigo: id,
					nome: nome,
					marca: marca,
					serie: serie,
					modelo: modelo,
					patrimonio: patrimonio,
					dispositivo: tag_ident,
					setor_nome: setor_nome,
					setor:setor
				};
				cadastrar(postData,id,"equipamento");
				//console.log("arrayDispositivos",arrayDispositivos);
				
				//console.log("arrayDispositivos antes",arrayDispositivos);
				
				arrayDispositivos = arrayDispositivos.filter(function(value,index,arr){
			
					return value.codigo != tag_ident;
				});
				
				
				
	

				
				
			});
			
			$('#alertCadastrar').fadeIn(1000);
			setTimeout(function() { 
				$('#alertCadastrar').fadeOut(1000); 
			}, 5000);
			$scope.limparCampos();
			
			
		}

        
        
        
        
        
        
        
    },
    $scope.editar = function(id) {
        
        
        $("#editar-"+id).hide();
        $("#alterar-"+id).show();
        $("#cancel-"+id).show();

        $("#span-nome-"+id).hide();
        $("#input-nome-"+id).show();

        $("#span-patrimonio-"+id).hide();
        $("#input-patrimonio-"+id).show();

        $("#span-marca-"+id).hide();
        $("#input-marca-"+id).show();

        $("#span-modelo-"+id).hide();
        $("#input-modelo-"+id).show();

        $("#span-serie-"+id).hide();
        $("#input-serie-"+id).show();

        $("#span-setor-"+id).hide();
        $("#setor_select-"+id).show();

        $("#span-dispositivo-"+id).hide();
        $("#input-dispositivo-"+id).show();

        setor_nome = $("#span-setor-"+id).text();
        //console.log(setor_nome);
        $("option").each(function(){
            if ($(this).text() == setor_nome){
                $("#setor_select-"+id).val($(this).val());
            }
        });
    },

    $scope.alterar = function(id) {

        nome_old = $("#span-nome-"+id).text();
        patrimonio_old = $("#span-patrimonio-"+id).text();
        marca_old = $("#span-marca-"+id).text();
        modelo_old = $("#span-modelo-"+id).text();
        serie_old = $("#span-serie-"+id).text();
        dispositivo_old = $("#span-dispositivo-"+id).text();


        

        nome = $("#input-nome-"+id).val();
        patrimonio = $("#input-patrimonio-"+id).val();
        marca = $("#input-marca-"+id).val();
        modelo = $("#input-modelo-"+id).val();
        serie = $("#input-serie-"+id).val();
        setor = $("#setor_select-"+id).val();
        setor = parseInt(setor);
        setor_nome = $("#setor_select-"+id+" option:selected").text();
        dispositivo = $("#input-dispositivo-"+id).val();



        if (nome == "" ){
            nome = nome_old;
        }
        if (patrimonio == ""){
            patrimonio = patrimonio_old;
        }
        if (marca == ""){
            marca = marca_old;
        }
        if (modelo == ""){
            modelo = modelo_old;
        }
        if (serie == ""){
            serie = serie_old;
        }
        if (dispositivo == ""){
            dispositivo = dispositivo_old;
        }
		
		
		var filtro = arrayEquipamento.filter( function(item) { return item.dispositivo != 0 } );
		//console.log(filtro);
		var dispositivo_exist = filtro.filter( function(item) { return item.dispositivo == dispositivo });
		//console.log("dispositivo exist",dispositivo_exist);
		//console.log(dispositivo_exist);
		if(dispositivo_exist.length > 0 && dispositivo_exist[0].dispositivo != dispositivo_old.toString() ){
			
			$('#alertDispositivo').fadeIn(1000);
			setTimeout(function() { 
			$('#alertDispositivo').fadeOut(1000); 
			}, 5000);
			
		}else{
		//console.log("DISPOSITIVO OLD",dispositivo_old);
		if(dispositivo_old > 0){
			
			if(dispositivo == 0 | dispositivo != dispositivo_old ){
				cadastrar(null,id,"log");
				
			}
		}
		$("#cancel-"+id).hide();
        $("#alterar-"+id).hide();
        $("#editar-"+id).show();

        $("#span-nome-"+id).hide();
        $("#input-nome-"+id).show();

        $("#span-patrimonio-"+id).hide();
        $("#input-patrimonio-"+id).show();

        $("#span-marca-"+id).hide();
        $("#input-marca-"+id).show();

        $("#span-modelo-"+id).hide();
        $("#input-modelo-"+id).show();

        $("#span-serie-"+id).hide();
        $("#input-serie-"+id).show();

			postData = {
				codigo: id,
				nome: nome,
				patrimonio: patrimonio,
				marca: marca,
				modelo:modelo,
				setor: setor,
				setor_nome: setor_nome,
				dispositivo: dispositivo,
				serie:serie
			};
			cadastrar(postData,id,"equipamento");
			
			$("#span-nome-"+id).text(nome);
			$("#span-patrimonio-"+id).text(patrimonio);
			$("#span-marca-"+id).text(marca);
			$("#span-modelo-"+id).text(modelo);
			$("#span-serie-"+id).text(serie);
			$("#span-dispositivo-"+id).text(dispositivo);
			$("#span-setor-"+id).text(setor_nome);

			if(nome != nome_old || patrimonio != patrimonio_old || marca != marca_old || modelo != modelo_old || serie != serie_old || dispositivo != dispositivo_old){
				$('#alertSalvar').fadeIn(1000);
			setTimeout(function() { 
				$('#alertSalvar').fadeOut(1000); 
				}, 5000);
			}
			$scope.cancel(id);

		}
        
        

    },

    $scope.excluir = function(id) {

        $scope.equipamentos = $scope.equipamentos.filter(function(value, index, arr){
            return value.codigo != id;
        });
		
		
        //console.log($scope.setores);
		cadastrar(null,id,"log");
        cadastrar(null,id,"equipamento");

        $('#alertExcluir').fadeIn(1000);
    setTimeout(function() { 
        $('#alertExcluir').fadeOut(1000); 
    }, 5000);
    },

    $scope.cancel = function(id) {
        $("#cancel-"+id).hide();
        $("#alterar-"+id).hide();
        $("#editar-"+id).show();

        $("#span-nome-"+id).show();
        $("#input-nome-"+id).hide();

        $("#span-patrimonio-"+id).show();
        $("#input-patrimonio-"+id).hide();

        $("#span-marca-"+id).show();
        $("#input-marca-"+id).hide();

        $("#span-modelo-"+id).show();
        $("#input-modelo-"+id).hide();

        $("#span-serie-"+id).show();
        $("#input-serie-"+id).hide();

        $("#span-setor-"+id).show();
        $("#setor_select-"+id).hide();

        $("#span-dispositivo-"+id).show();
        $("#input-dispositivo-"+id).hide();
    },

    $scope.ordenar = function(keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
    }
	
	$(document).ready(function () {
    $('tag').change(function () {
        $('tag option').attr('disabled', false);
        $('tag').each(function() {
            var val = $(this).find('option:selected').val();
            if (!val) return;
            $('tag option').filter(function() {
                return $(this).val() == val;
            }).attr('disabled', 'disabled');
        });
    });
});
        /*$scope.listarequipamentos = function(){
        $http.get(urlequipamento).success(function (equipamentos){
        $scope.equipamentos = equipamentos;
        }).error(function (erro){
        alert(erro)
        });}
        $scope.listarequipamentos();*/
	
	//$("#theSelect").onchange();
		
	
				
});