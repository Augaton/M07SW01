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

        document.getElementsByClassName("statistique_valeur")[0].addEventListener("click", recupererDonneesDrones);
        document.getElementsByClassName("statistique_valeur")[1].addEventListener("click", recupererDonneesVols);
        document.getElementsByClassName("statistique_valeur")[2].addEventListener("click", recupererDonneesUtilisateur);
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
        table+="</tr>";
        }
        table+="</table></div>";
        document.getElementById("section").innerHTML=table;
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