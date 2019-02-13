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


if (isset($_POST['username'])){
    $username = $_POST['username'];
}
else{
    echo "Falta do Login";
    exit;
}
if (isset($_POST['password'])){
    $password = $_POST['password'];
}
else{
    echo "Falta do password";
    exit;
}

$password = md5($password);
$sql = "select COUNT(*) as login_count from User where senha = '$password' AND login = '$username'";

$db = new DatabaseMysql("ramon","142.44.247.125","Sportrecife2008","system_mon");


$result = $db->select($sql);

if ($result[0]['login_count'] == "1"){
    echo "Redirect...";
    echo "<script> window.location.href = '../pages/'; </script>";
}
else{
    echo "Usuario ou senha incorreto";
    echo "<script> setTimeout(function(){ window.location.href = '../login'; }, 3000); </script>";
}