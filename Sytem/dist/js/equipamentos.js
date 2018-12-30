var ref = firebase.database().ref();


function cadastrar(data,id,tabela){
    postData = data;
	ref.child('/'+ tabela + '/' + id).set(postData);
}

var equipamentosModulo = angular.module('equipamentosModulo', ['dirPagination']);
equipamentosModulo.controller("equipamentosController", function($scope, $http, $window) {
    
    //urlEquipamento = 'http://localhost:8080/RastrearSystem/rest/Equipamentos';

    
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
            console.log(arraySetor);
		}
    });
    
	setTimeout(function(){ $("th").click(); }, 2000);
    
	// $scope.setores = [{
    //     codigo: 1,
    //     nome: 'Egas Moniz',
    //     latitude: '10.9',
    //     longitude: '-90'
    // }, {
    //     codigo: 2,
    //     nome: 'Ambulatorio Maria Fernanda',
    //     latitude: '8.9',
    //     longitude: '5'
    // }, {
    //     codigo: 3,
    //     nome: 'João de Deus 5º Andar',
    //     latitude: '9.2',
    //     longitude: '3'
    // }, {
    //     codigo: 4,
    //     nome: 'João de Deus 8º Andar',
    //     latitude: '9.0',
    //     longitude: '3'
    // }, ];
	
    $scope.equipamentos = [{
        codigo: 1,
        nome: 'Tensiometro',
        patrimonio: '30999',
        marca: 'Heine',
        modelo: 'Aneroide',
        serie: '123456',
        setor: {
           codigo: 2,
			nome: 'Ambulatorio Maria Fernanda',
			latitude: '8.9',
			longitude: '5'
        },
        tag: 1
    }];
    $scope.selecionaequipamento = function(equipamentoSelecionado) {
        $scope.equipamento = equipamentoSelecionado;
        
        $('#myTab a[href="#nav-Cadastro"]').tab('open');
    },
    $scope.selecionaSetor = function(setorSelecionado) {
        $scope.setor = setorSelecionado;
		$scope.equipamento.setor = setorSelecionado;
        
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
        tag_ident = $("#tag_ident").val();
        setor = $("#inputGroupSelect3").val();
        setor = parseInt(setor);

        if (tag_ident == "" || tag_ident == undefined){
            tag_ident = false;
        }


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
                patrimonio: patrimonio,
                tag_ident: tag_ident,
                setor:setor
            };
			cadastrar(postData,id,"equipamento");
		});


        $scope.equipamentos.push(postData);
        // $scope.limparCampos();
        alert("equipamento Salvo Com Sucesso!");
        
    },
    $scope.excluir = function() {
        $scope.equipamentos.splice($scope.equipamentos.indexOf($scope.equipamentos, 1));
        $scope.limparCampos();
        alert("Equipamento Deletado");
        /*if ($scope.equipamento.codigo == undefined) {
        alert("Favor selecionar um registro para poder excluir");
        console.log("Favor selecionar um registro para poder excluir");
        } else {
        $http.delete(urlequipamento+'/'+$scope.equipamento.codigo).success(function () {
        $scope.listarequipamentos();
        $scope.limparCampos();
        }).error (function (erro) {
        alert(erro);
        });	
        }*/
    },
    $scope.ordenar = function(keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
    }
        /*$scope.listarequipamentos = function(){
        $http.get(urlequipamento).success(function (equipamentos){
        $scope.equipamentos = equipamentos;
        }).error(function (erro){
        alert(erro)
        });}
        $scope.listarequipamentos();*/
});