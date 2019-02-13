<?php
/**
 * Created by PhpStorm.
 * User: ramon
 * Date: 20/06/18
 * Time: 17:20
 */

ini_set('display_errors',1);
ini_set('display_startup_erros',1);

include ("DatabaseMysql.php");

if (isset($_POST['name'])){
    $nome = $_POST['name'];
}
else{
    echo "Falta do campo nome";
    exit;
}
if (isset($_POST['login'])){
    $login = $_POST['login'];
}
else{
    echo "Falta do campo Login";
    exit;
}
if (isset($_POST['password'])){
    if (strlen($_POST['password'])<6){
        echo "Informe pelo menos 6 caracteres";
        exit;
    }
    $pass = md5($_POST['password']);
    $confirm_pass = md5($_POST['password_confirm']);
    if($pass != $confirm_pass){
        echo "Senhas diferentes";
        exit;
    }
}
else{
    echo "Falta do campo senha";
    exit;
}
if (isset($_POST['group'])){
    $group = $_POST['group'];
}
else{
    echo "Falta do campo group";
    exit;
}
if (isset($_POST['email'])){
    $email = $_POST['email'];
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        echo "Email incorreto";
        exit;
    }
}
else{
    echo "Falta do campo email";
    exit;
}


$db = new DatabaseMysql("ramon","142.44.247.125","Sportrecife2008","system_mon");


var_dump($db);
$sql = "INSERT INTO User (`nome_completo`,`login`,`senha`,`group`,`email`) VALUES ('$nome','$login','$pass','$group','$email')";


if($db->insert($sql,1)){
    echo "Cadastro realizado";
    echo "<script> window.location.href = '../login'; </script>";
}
else{
    echo "Login já existe";
}

$db = NULL;