// const { color } = require("chart.js/helpers");

document.getElementById("nav_suivi").addEventListener("click", suiviAjax);

// principal

function suiviAjax(){
    
    // nombre
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("section").innerHTML = this.responseText;

        var nbdrone=recupererNombreDrone();
        document.getElementsByClassName("statistique_valeur")[0].innerHTML = nbdrone;

        var nbvol=recupererNombreVol();
        document.getElementsByClassName("statistique_valeur")[1].innerHTML = nbvol;

        var nbutilisateur=recupererNombreUtilisateur();
        document.getElementsByClassName("statistique_valeur")[2].innerHTML = nbutilisateur;

        //

        document.getElementsByClassName("statistique")[0].addEventListener("click", recupererDonneesDrones);
        document.getElementsByClassName("statistique")[1].addEventListener("click", recupererDonneesVols);
        document.getElementsByClassName("statistique")[2].addEventListener("click", recupererDonneesUtilisateur);
    }
    };
    xhttp.open("GET", "mainDrone.html");
    xhttp.send();
}

// fonction complémentaire

// Nombre

function recupererNombreDrone(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var reponse=JSON.parse(this.responseText);

        return reponse.valeur;
    }
    };
    xhttp.open("GET", "rest.php/nbdrone",false);
    xhttp.send();
    return xhttp.onreadystatechange();
}

function recupererNombreVol(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let reponse=JSON.parse(this.responseText);

        return reponse.valeur;
    }
    };
    xhttp.open("GET", "rest.php/nbvol",false);
    xhttp.send();
    return xhttp.onreadystatechange();
}

function recupererNombreUtilisateur(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let reponse=JSON.parse(this.responseText);

        return reponse.valeur;
    }
    };
    xhttp.open("GET", "rest.php/nbutilisateur",false);
    xhttp.send();
    return xhttp.onreadystatechange();
}

// Données

function recupererDonneesDrones(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var reponseAPI = JSON.parse(this.responseText);

        // table drone

        var table="<div ><table class='tableau_statistique '><tr class='centrer'><th >Numéro drône</th><th>Marque</th><th>Modèle</th><th>Référence</th><th>Dateachat</th><th>Action</th></tr>";
        for(let i=0;i < reponseAPI.length;i++){
        table+="<tr class='centrer'>";
        let donneesDrone=reponseAPI[i];
        table+="<td class='idgris'>"+donneesDrone.iddrone+"</td>";
        table+="<td>"+donneesDrone.marque+"</td>";
        table+="<td>"+donneesDrone.modele+"</td>";
        table+="<td>"+donneesDrone.refdrone+"</td>";
        table+="<td>"+donneesDrone.dateachat+"</td>";
        table+="<td>"+donneesDrone.dronecoll+"</td>";
        table+="</tr>";
        }
        table+="</table></div>";
        document.getElementById("section").innerHTML=table;
    }
    };
    xhttp.open("GET", "rest.php/drone",false);
    xhttp.send();
    return xhttp.onreadystatechange();
}

function recupererDonneesVols(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var reponseAPI = JSON.parse(this.responseText);

        // table vol

        var table="<div ><table class='tableau_statistique '><tr class='centrer'><th >Numéro Vol</th><th>Date de vol</th><th >Numéro drône</th><th >Numéro Utilisateur</th></tr>";
        for(let i=0;i < reponseAPI.length;i++){
        table+="<tr class='centrer'>";
        let donneesVol=reponseAPI[i];
        table+="<td class='idgris'>"+donneesVol.idvol+"</td>";
        table+="<td>"+donneesVol.datevol+"</td>";
        table+="<td class='idgris'>"+donneesVol.iddrone+"</td>";
        table+="<td class='idgris'>"+donneesVol.idutilisateurs+"</td>";
        table+='<td> <input type="button" value="Graphe" class="graphe"/> </td>'
        table+="</tr>";
        }
        table+="</table></div>";
        document.getElementById("section").innerHTML=table;

        for(let i=0;i < reponseAPI.length;i++){
            document.getElementsByClassName("graphe")[i].addEventListener("click", function (){
                getgraphdrone( reponseAPI[i].idvol, "h" )
                
            });
        }

    }
    };
    xhttp.open("GET", "rest.php/vol",false);
    xhttp.send();
    return xhttp.onreadystatechange();
}

function recupererDonneesUtilisateur(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var reponseAPI = JSON.parse(this.responseText);

        // table utilisateur

        var table="<div ><table class='tableau_statistique '><tr class='centrer'><th >Numéro Utilisateur</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Date de naissance</th><th>Pseudo</th></tr>";
        for(let i=0;i < reponseAPI.length;i++){
        table+="<tr class='centrer'>";
        let donneesUtilisateur=reponseAPI[i];
        table+="<td class='idgris'>"+donneesUtilisateur.idutilisateur+"</td>";
        table+="<td>"+donneesUtilisateur.nom+"</td>";
        table+="<td>"+donneesUtilisateur.prenom+"</td>";
        table+="<td>"+donneesUtilisateur.email+"</td>";
        table+="<td>"+donneesUtilisateur.naissance+"</td>";
        table+="<td>"+donneesUtilisateur.pseudo+"</td>";
        table+="</tr>";
        }
        table+="</table></div>";
        document.getElementById("section").innerHTML=table;
    }
    };
    xhttp.open("GET", "rest.php/utilisateur",false);
    xhttp.send();
    return xhttp.onreadystatechange();
}

// graphe

function getgraphdrone(idvol,options){
    var id = idvol

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        var reponseAPI = JSON.parse(this.responseText);

        var table="<div ><table class='tableau_statistique '><tr class='centrer'>";

        table+="<th>Pitch</th>";
        table+="<th>Roll</th>";
        table+="<th>Yaw</th>";
        table+="<th>VGX</th>";
        table+="<th>VGY</th>";
        table+="<th>VGZ</th>";
        table+="<th>TempL</th>";
        table+="<th>TempH</th>";
        table+="<th>TOF</th>";
        table+="<th>H</th>";
        table+="<th>Bat</th>";
        table+="<th>Baro</th>";
        table+="<th>Time</th>";
        table+="<th>AGX</th>";
        table+="<th>AGY</th>";
        table+="<th>AGZ</th></tr>";

        table+="<tr class='centrer'>";
        table+='<td><input type="checkbox" id="pitch" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="roll" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="yaw" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="vgx" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="vgy" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="vgz" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="templ" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="temph" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="tof" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="h" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="bat" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="baro" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="time" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="agx" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="agy" class="checkboxgraphe" ></input></td>';
        table+='<td><input type="checkbox" id="agz" class="checkboxgraphe" ></input></td>';
        table+="</tr>";
        table+="</table></div>";

        table += '<canvas id="grapheetat"></canvas>';
        document.getElementById("section").innerHTML=table;

        for(let i=0;i < 16;i++){
            document.getElementsByClassName("checkboxgraphe")[i].addEventListener("click", function (graphe){
                getgraphdrone( id, graphe.currentTarget.id )
            });
        }

        getgrapheetat(reponseAPI);
    
    }
    };
    if (options){
        xhttp.open("GET", "rest.php/graphe/" + id + "/" + options,false);
    }else{
        xhttp.open("GET", "rest.php/graphe/" + id,false);
    } 
    xhttp.send();
    return xhttp.onreadystatechange();
}

var x=[];var y1=[]; var leg1; var col1

function getgrapheetat(drone){

    var dronetotal = drone.length;

    for(let i = 0; i<dronetotal; i++)
    {
        y1[i] = drone[i].param
        x[i] = (drone[i].idetats - drone[0].idetats) / 10
    }

    Graph(x,y1,"Hauteur","255,0,0")
}

let chart;

function Graph(x, y1, leg1,  col1) {

    const ctx = document.getElementById('grapheetat');

    var data =  
    {
        type: 'line',
        options: {scales:
            {
                h: {type: 'linear',display:true,position:'left'}
            }
        },
        data: {
            type: 'line',
            labels: x,
            datasets: 
            [{ 
                yAxisID: "h",
                label: leg1,
                data: y1,
                borderColor: "rgb("+col1+")",
                borderWidth: 1
            }]

        }
    }

    if(chart)
    {
        chart.destroy()
        chart = new Chart(ctx, data);
    }
    else{
        chart = new Chart(ctx, data);
    }

}