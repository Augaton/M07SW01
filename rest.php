<?php
    try{
        $connect = new PDO('mysql:host=localhost;dbname=Aure_Drone;charset=utf8','aurelien', 'snirlla');
    }
    catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
    }

    if(isset($_SERVER['PATH_INFO'])){
        $req_path=$_SERVER['PATH_INFO'];
        $req_data=explode('/',$req_path);
    }


    $req_typ = $_SERVER['REQUEST_METHOD'];
    switch ($_SERVER["REQUEST_METHOD"]){
    case "PUT":
        break;
    case "POST":
        $donneesVolJSON = file_get_contents("php://input");
        $donneesVolAssoc = json_decode($donneesVolJSON,true);
        print_r($donneesVolAssoc);

        // récup donnée

        if(isset($req_data[1])&&$req_data[1]=='utilisateur') {
            $req = "SELECT utilisateur.idutilisateur FROM utilisateur where utilisateur.nom=? ";
            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

            $tableaureq = array($donneesVolAssoc['nom']);
            $res->execute($tableaureq);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($data)) {
                $_COOKIE['idutilisateur'] = $data[0]['idutilisateur'];
            }    
            else
            {
                $req = "INSERT INTO utilisateur('nom') VALUES (?)";
                $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

                $tableaureq = array($donneesVolAssoc['nom']);
                $res->execute($tableaureq);
                $_COOKIE['idutilisateur']=$connect->lastInsertId();
            }
        }
        if(isset($req_data[1])&&$req_data[1]=='drone') {
            $req = "SELECT drone.iddrone FROM drone,vol where drone.refdrone=? ";
            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

            $tableaureq = array($donneesVolAssoc['numero']);
            $res->execute($tableaureq);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($data)) {
                $_COOKIE['iddrone'] = $data[0]['iddrone'];
            }    
            else
            {
                $req = "INSERT INTO drone('refdrone') VALUES (?)";
                $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

                $tableaureq = array($donneesVolAssoc['numero']);
                $res->execute($tableaureq);
            }
        }
        if(isset($req_data[1])&&$req_data[1]=='vol') {

            $req = "SELECT utilisateur.idutilisateur FROM utilisateur where utilisateur.nom=? ";
            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

            $tableaureq = array($donneesVolAssoc['nom']);
            $res->execute($tableaureq);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            $iduser = $data[0]['idutilisateur'];

            $date = date('Y-m-d H:i:s', $donneesVolAssoc['time']);

            $req = "SELECT vol.datevol FROM vol WHERE vol.datevol = ? AND vol.idutilisateurs = ?";
            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

            

            $tableaureq = array($date, $iduser);
            $res->execute($tableaureq);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
            $data_json = json_encode($data);
            print_r($data_json);
            
            if (!empty($data)) {
                break;
            }    
            else
            {
                $req = "INSERT INTO vol('idutilisateurs', 'datevol) VALUES (?,?)";
                $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

                $tableaureq = array($iduser,$date);
                $res->execute($tableaureq);
            }
        }
        if(isset($req_data[1])&&$req_data[1]=='etat') {

            $date = date('Y-m-d H:i:s', $donneesVolAssoc['time']);
            


            if (!empty($data)) {
                break;
            }    
            else
            {
                $req = "INSERT INTO etats VALUES ('1','1',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

                $tableaureq = array($date);
                $res->execute($tableaureq);
            }
        }

        break;
    case "GET":

        // recup données

        if(isset($req_data[1])&&$req_data[1]=='drone') {
            $req = "SELECT * FROM drone";

            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $res->execute(NULL);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
            $data_json = json_encode($data);
            print_r($data_json);
        }
        if(isset($req_data[1])&&$req_data[1]=='vol') {
            $req = "SELECT * FROM vol";

            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $res->execute(NULL);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
            $data_json = json_encode($data);
            print_r($data_json);
        }
        if(isset($req_data[1])&&$req_data[1]=='utilisateur') {
            $req = "SELECT * FROM utilisateur";

            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $res->execute(NULL);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
            $data_json = json_encode($data);
            print_r($data_json);
        }


        // récup count

        if(isset($req_data[1])&&$req_data[1]=='nbdrone') {
            $req = "SELECT count(iddrone) AS valeur FROM drone";

            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $res->execute(NULL);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
            $data_json = json_encode($data[0]);
            print_r($data_json);
        }
        if(isset($req_data[1])&&$req_data[1]=='nbvol') {
            $req = "SELECT count(idvol) AS valeur FROM vol";

            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $res->execute(NULL);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
            $data_json = json_encode($data[0]);
            print_r($data_json);
        }
        if(isset($req_data[1])&&$req_data[1]=='nbutilisateur') {
            $req = "SELECT count(idutilisateur) AS valeur FROM utilisateur";

            $res=$connect->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $res->execute(NULL);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
            $data_json = json_encode($data[0]);
            print_r($data_json);
        }

        break;
    default:
        print_r($_SERVER);
    }

?>