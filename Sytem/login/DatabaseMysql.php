

<?php
/**
 * Created by PhpStorm.
 * User: ramon
 * Date: 13/03/2018
 * Time: 00:45
 */

class DatabaseMysql{
    private $host;
    private $user;
    private $pass;
    private $banco;
    private $conn;

    public function __construct($username,$servername,$password,$database){
        $this->user = $username;
        $this->host = $servername;
        $this->pass = $password;
        $this->banco = $database;

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn = $conn;
            return $conn;
        }
        catch(PDOException $e){
            $this->conn = null;
        }
    }

    public function select($sql){
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            return $stmt->fetchAll();
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            return null;
        }
    }

    public function update($sql){
        try{
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return 1;
        }
        catch (PDOException $e){
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    public function insert($sql,$DEBUG){
        if($DEBUG == 1){
            try{
                $this->conn->exec($sql);
                return 1;
            }
            catch (PDOException $e){
                echo $sql . "<br>" . $e->getMessage();
            }
        }
        else{
            try{
                $this->conn->exec($sql);
                return 1;
            }
            catch (PDOException $e){
                return 0;
            }
        }
    }

    public function delete($sql){
        try{
            $this->conn->exec($sql);
            return 1;
        }
        catch (PDOException $e){
            echo $sql . "<br>" . $e->getMessage();
        }
    }


    /**
     * @return mixed
     */
    public function getConn()
    {
        return $this->conn;
    }

    /**
     * @return mixed
     */
    public function getHost()
    {
        return $this->host;
    }

    /**
     * @param mixed $host
     */
    public function setHost($host)
    {
        $this->host = $host;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getPass()
    {
        return $this->pass;
    }

    /**
     * @param mixed $pass
     */
    public function setPass($pass)
    {
        $this->pass = $pass;
    }

    /**
     * @return mixed
     */
    public function getBanco()
    {
        return $this->banco;
    }

    /**
     * @param mixed $banco
     */
    public function setBanco($banco)
    {
        $this->banco = $banco;
    }


}

