document.getElementById("nav_suivi").addEventListener("click", suiviAjax);

// principal

function suiviAjax(){
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
    }
    };
    xhttp.open("GET", "mainDrone.html");
    xhttp.send();
}

// fonction complémentaire

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