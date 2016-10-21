/**
 * Created by D'rin on 29/09/2016.
 */
var vide = 0; // savoir si le tableau est vide
var matiere;
var champNote;
document.addEventListener("DOMContentLoaded", function (event) {
    addEvent();
    document.getElementById("Add").addEventListener("click", function (e) {
        ajouter(e.target);
        e.preventDefault;
    });
});

function supprime(s) {
    var ligne = s.parentElement.parentElement.parentElement;
    ligne.remove();
    actualiseMoyenne();
}

function modifier(s) {
    var mod = s.parentElement.parentElement.parentElement;
    var note;
    var tdmatiere = mod.querySelector(".matiere");
    var tdnote = mod.querySelector(".note");
    scanValeurs(tdmatiere.innerText, tdnote.innerText);
    if (typeof(champNote) != "object" && typeof(matiere) != "object") {
        note = parseFloat(champNote);
        tdmatiere.innerHTML = matiere;
        tdnote.innerHTML = note;
        actualiseMoyenne();
    }
}

function scanValeurs(valMatiere, valNote) {
    var text = "Mauvaise valeur! ";
    var saisieNote = false;
    var saisieMatiere = false;

    do {
        if (!saisieMatiere) {
            window.matiere = prompt("Veuillez entrer la matière. ", valMatiere);
            saisieMatiere = true;
            //alert(matiere + " " + typeof (matiere));
        } else {
            window.matiere = prompt(text + "Veuillez entrer la matière. ", valMatiere);
            // alert(matiere + " " + typeof (matiere));

        }
    } while (matiere == "");

    if (typeof(matiere) != "object") {
        do {
            if (!saisieNote) {
                window.champNote = prompt("Veuillez entrer la note. ", valNote);
                saisieNote = true;
            } else {
                window.champNote = prompt(text + "Veuillez entrer la note. ", valNote);
            }
            var note = parseFloat(champNote);
        } while (isNaN(champNote) || champNote == "" || note > 20 || note < 0);

    }
}
function ajouter() {
    var note;
    scanValeurs("", "");
    if (typeof(champNote) != "object" && typeof(matiere) != "object") {
        note = parseFloat(champNote);
        if (vide == 0) {
            var moyenne = document.getElementById("moyenne");
            var nbr = document.getElementById("tableau").childNodes.length;
            ajouteLigne(matiere, note, moyenne, nbr);
            actualiseMoyenne();
        } else {
            var moyenne = document.createElement("tr");
            moyenne.id = "moyenne";
            moyenne.className = "warning";
            moyenne.innerHTML = '<td class = "matiere" colspan="2">MOYENNE </td> <td id = "moy">' + note + '</td>';
            window.vide = 0;
            var tableau = document.getElementsByTagName("tbody")[0];
            tableau.appendChild(moyenne);
            ajouteLigne(matiere, note, moyenne, 1);
        }
    }
}

function ajouteLigne(matiere, note, moyenne, nbr) {
    var ligne = document.createElement("tr");
    ligne.id = "element" + nbr;
    ligne.className = "info";
    ligne.innerHTML = "<td class = 'matiere'>" +
        matiere + " </td> <td class = 'note'>" + note + " </td> <td id = 'map" + nbr + "' class='action'> " +
        " <div> <span class ='icon-pencil Edit'></span> <span class='icon-remove Suppression pull-right'></span> " +
        "</div> </td>";
    addEventClickEdit(ligne.querySelector(".Edit"));
    addEventClickSuppression(ligne.querySelector(".Suppression"));
    moyenne.parentNode.insertBefore(ligne, moyenne);
}

function actualiseMoyenne() {
    var notes = document.getElementsByClassName("note");
    var moyenne = 0.0;
    if (notes.length > 0) {
        for (var i = 0; i < notes.length; i++) {
            moyenne += parseFloat(notes[i].innerHTML);
        }
        moyenne /= notes.length;
        var repmoy = document.getElementById("moy");
        repmoy.innerHTML = "" + moyenne;
    } else {
        var repmoy = document.getElementById("moyenne");
        repmoy.remove();
        window.vide = 1;
    }
}

function addEvent() {
    var t = (document.getElementsByClassName("Suppression"));
    for (var i = 0; i < t.length; i++) {
        addEventClickSuppression(t[i]);
    }
    t = (document.getElementsByClassName("Edit"));
    for (var i = 0; i < t.length; i++) {
       addEventClickEdit(t[i]);
    }

}
function addEventClickSuppression(t) {
    t.addEventListener("click", function (e) {
        e.preventDefault();
        supprime(e.target);
    });
}
function addEventClickEdit(t) {
    t.addEventListener("click", function (e) {
        e.preventDefault();
        modifier(e.target);
    });
}