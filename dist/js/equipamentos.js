var equipamentosModulo = angular.module('equipamentosModulo', ['dirPagination']);
equipamentosModulo.controller("equipamentosController", function($scope, $http, $window) {
    
	//urlEquipamento = 'http://localhost:8080/RastrearSystem/rest/Equipamentos';
    
	$scope.setores = [{
        codigo: 1,
        nome: 'Egas Moniz',
        latitude: '10.9',
        longitude: '-90'
    }, {
        codigo: 2,
        nome: 'Ambulatorio Maria Fernanda',
        latitude: '8.9',
        longitude: '5'
    }, {
        codigo: 3,
        nome: 'João de Deus 5º Andar',
        latitude: '9.2',
        longitude: '3'
    }, {
        codigo: 4,
        nome: 'João de Deus 8º Andar',
        latitude: '9.0',
        longitude: '3'
    }, ];
	
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
        $scope.equipamentos.push($scope.equipamento);
        $scope.limparCampos();
        alert("equipamento Salvo Com Sucesso!");
        /*if ($scope.equipamento.codigo == undefined) {
        $http.post(urlequipamento,$scope.equipamento).success(function(equipamento) {
        alert("Salvo com Sucesso!");
        //$scope.listarequipamentos();
        $scope.limparCampos();
        }).error (function (erro) {
        alert(erro);
        });
        } else {
        $http.put(urlequipamento,$scope.equipamento).success(function(equipamento) {
        alert("Salvo com Sucesso!");
        //$scope.listarequipamentos();
        $scope.limparCampos();
        }).error (function (erro) {
        alert(erro);
        });	
        }*/
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