<?php
/**
 * Created by PhpStorm.
 * User: ramon
 * Date: 20/06/18
 * Time: 17:20
 */

include ("../classes/Database/DatabaseMysql.php");
include ($_SERVER["DOCUMENT_ROOT"]."/Sensors/classes/Mail.php");

function recupera_config(){
    $path_config = $_SERVER["DOCUMENT_ROOT"]."/Sensors/bases/config.json";
    $file = file_get_contents($path_config);
    if ($file != null){
        return json_decode($file);
    }
    else{
        return null;
    }
}

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

$config = recupera_config();

$db = new DatabaseMysql($config->database->login,$config->database->server,$config->database->senha,$config->database->base);

$verificador = md5($login);


$sql = "INSERT INTO usuarios (nome_completo,login,senha,companhia,email,verificado) VALUES ('$nome','$login','$pass','$group','$email','$verificador')";

if($db->insert($sql,0)){
    $msg = "<a href = '$config->host/Sensors/bases/authenticationMail.php?auth=$verificador&cadastro=1'>Clique aqui para validar sua conta</a>";

    $mail = new Mail(
        $config->mail->smtp,
        $config->mail->porta,
        $config->mail->login,
        $config->mail->senha,
        $config->mail->login,
        $config->mail->nome,
        $email,
        $nome,
        "Confirmar E-mail",
        $msg,
        $config->mail->ssl
    );
    $mail->send_mail();
}
else{
    echo "Login já existe";
}

$db = NULL;