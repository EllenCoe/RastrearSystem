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
                console.log(arrayEquipamento);
            }
        }
        $("th").click();
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
        setor = $("#inputGroupSelect3").val();
        setor = parseInt(setor);
        setor_nome = $('#inputGroupSelect3 option:selected').text();

        if (tag_ident == "" || tag_ident == undefined){
            tag_ident = false;
        }
        //else, cadastra na tabela de log


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
        });

        $('#alertCadastrar').fadeIn(1000);
    setTimeout(function() { 
        $('#alertCadastrar').fadeOut(1000); 
    }, 5000);
        
        
        
        $scope.limparCampos();
        
        
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
        console.log(setor_nome);
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

        $scope.cancel(id);

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

    },

    $scope.excluir = function(id) {

        $scope.equipamentos = $scope.equipamentos.filter(function(value, index, arr){
            return value.codigo != id;
        });

        console.log($scope.setores);

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
        /*$scope.listarequipamentos = function(){
        $http.get(urlequipamento).success(function (equipamentos){
        $scope.equipamentos = equipamentos;
        }).error(function (erro){
        alert(erro)
        });}
        $scope.listarequipamentos();*/
});