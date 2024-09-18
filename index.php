<?php session_start(); ?>

<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
    <title>BTS SNIR - Dev WEB</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./CSS/ossature_grid.css">
    <link rel="stylesheet" type="text/css" href="./CSS/design.css">
    <link rel="stylesheet" type="text/css" href="./CSS/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


  </head>

  <body>
    <header>

      <h1>Dron'ir</h1>
      <img id="dark_light">
      <img id="hamburger" src="MyHamburger.png">
    </header>

    <nav id="barre_navigation">

      <div id="nav_presentation">Présentation</div>
      <div id="nav_suivi">Suivi</div>
      <div  id="nav_connexion">Connexion</div>
      <div  id="nav_inscription" >Inscription</div>

      <div></div>
    </nav>

    <div>
      <canvas id="grapheetat"></canvas>
    </div>

    <section id="section">
    <form class="menu_graphe" action="index.php" method="get" onsubmit="getgraphdrone()">
      <label class='pitch' for='pitch'>pitch</label>
      <input type='checkbox' name='pitch[]' value='pitchid' id='pitch'></input>

      <label class='roll' for='roll'>roll</label>
      <input type='checkbox' name='roll[]' value='rollid' id='roll'></input>

      <label class='yaw' for='yaw'>yaw</label>
      <input type='checkbox' name='yaw[]' value='yawid' id='yaw'></input>

      <label class='vgx' for='vgx'>vgx</label>
      <input type='checkbox' name='vgx[]' value='vgxid' id='vgx'></input>

      <label class='vgy' for='vgy'>vgy</label>
      <input type='checkbox' name='vgy[]' value='vgyid' id='vgy'></input>

      <label class='vgz' for='vgz'>vgz</label>
      <input type='checkbox' name='vgz[]' value='vgzid' id='vgz'></input>

      <label class='templ' for='templ'>templ</label>
      <input type='checkbox' name='templ[]' value='templid' id='templ'></input>

      <label class='temph' for='temph'>temph</label>
      <input type='checkbox' name='temph[]' value='temphid' id='temph'></input>

      <label class='tof' for='tof'>tof</label>
      <input type='checkbox' name='tof[]' value='tofid' id='tof'></input>

      <label class='h' for='h'>h</label>
      <input type='checkbox' name='h[]' value='hid' id='h'></input>

      <label class='bat' for='bat'>bat</label>
      <input type='checkbox' name='bat[]' value='batid' id='bat'></input>

      <label class='baro' for='baro'>baro</label>
      <input type='checkbox' name='baro[]' value='baroid' id='baro'></input>

      <label class='time' for='time'>time</label>
      <input type='checkbox' name='time[]' value='timeid' id='time'></input>

      <label class='agx' for='agx'>agx</label>
      <input type='checkbox' name='agx[]' value='agxid' id='agx'></input>

      <label class='agy' for='agy'>agy</label>
      <input type='checkbox' name='agy[]' value='agyid' id='agy'></input>

      <label class='agz' for='agz'>agz</label>
      <input type='checkbox' name='agz[]' value='agzid' id='agz'></input>

      <!-- Envoie -->
      <input type="submit" value="Envoyer">
    </form>
    <section class="container_graphe"></section>
    </section>
    
    <footer id="mon_footer">
      <div>
          <h1>Les drones :</h1>
          <a href="https://www.ryzerobotics.com/fr/tello">Le drone Tello</a>
          <a href="https://www.dji.com/fr/mavic">Le Mavic Pro</a>
        </div>
        <div>
          <h1>Les règles de vol :</h1>
          <a href="https://www.service-public.fr/particuliers/vosdroits/F34630">Le site officiel du service public</a>
        </div>
        <div>
          <h1>A propos :</h1>
          <a href="../00_LeCV/index.html" alt="Mon CV">Consulter mon CV</a>
          <a href="https://css-tricks.com/snippets/css/complete-guide-grid/">Tout sur les Grid CSS</a>
        </div>
    </footer>

    <script src="JS/cookie.js"></script>
    <script src="JS/mesFonctions.js"></script>
    <script src="JS/dark_light.js"></script>
    <script src="JS/navigation.js"></script>
    <script src="JS/ajax.js"></script>

  </body>
 
</html>