/**
 * Created by D'rin on 29/09/2016.
 */
var mod;
var vide =0;
var form = 0;
var t = (document.getElementsByClassName("Suppression"));
    for(var i = 0; i< t.length;i++){
        t[i].addEventListener("click",function(e){

            supprime(e.target);
            e.preventDefault;
        });
    }

t = (document.getElementsByClassName("Edit"));
for(var i = 0; i< t.length;i++){
    t[i].addEventListener("click",function(e){
        modifie(e.target);
        e.preventDefault;
    });
}

t = (document.getElementById("Add"));
    t.addEventListener("click",function(e){
        ajoute(e.target);
        e.preventDefault;
    });


function supprime(s){
    if(window.form == 0){
        var ligne = s.parentElement.parentElement.parentElement;
        ligne.remove();
        actualiseMoyenne();
        addEvent();
    }


}

function modifie(s){
    if(window.form == 0 ){
        window.form = 1;
        window.mod = s.parentElement.parentElement.parentElement;
        var divbody = document.getElementById("body");
        var formM = document.createElement("div");
        formM.innerHTML = '<form name="modifier" id = "modification" class="form-horizontal span4" > ' +
            '<label class="control-label" style="margin-right: 10px;">MATIERE : </label> <input type = "text" class="input-medium" placeholder="Matiere" maxlength="60" name = "Ematiere" > <br/> <br/> ' +
            '<label class="control-label" style="margin-right: 10px;">Note : </label> <input type = "text" class="input-medium" placeholder="Note" maxlength="60"  name = "Enote"> <br/> <br/> ' +
            '<input type="button"  class = "btn btn-primary offset1" id = "submit" value="modifier" >  ' +
            '<input type="button" class="btn btn-danger" id = "cancel" value="Annuler" ></form>';
        divbody.appendChild(formM);
        refresh(1);
    }

}

function ajoute(s){
    if(window.form == 0){
        window.form = 1;
        var divbody = document.getElementById("body");
        var form = document.createElement("div");
        form.innerHTML = '<form  name="ajouter" id = "ajouter" class="form-horizontal span4" > ' +
            '<label class="control-label" style="margin-right: 10px;"">MATIERE : </label> ' +
            '<input type = "text" placeholder="Matiere" class="input-medium" maxlength="60" name = "Ematiere" > <br/> <br/> ' +
            '<label class="control-label" style="margin-right: 10px;">Note : </label> ' +
            '<input type = "text" placeholder="Note" class="input-medium" maxlength="60" name = "Enote"> <br/> <br/> ' +
            '<input type="button"  class = "btn btn-primary offset1" id = "submit" value="Ajouter" >  ' +
            '<input type="button" class="btn btn-danger" id = "cancel" value="Annuler"></form>';
        divbody.appendChild(form);
        refresh(0);
    }

}
function modifier() {
    var formulaire = document.getElementsByTagName("input");
    var champNote = formulaire[1].value;
    var matiere = formulaire[0].value;
   // alert(""+window.mod);
    if((parseFloat(champNote)).toString() == champNote && champNote != "") {
        note = parseFloat(champNote);
        var tdmatiere = window.mod.getElementsByClassName("matiere")[0];
        var tdnote = window.mod.getElementsByClassName("note")[0];

        tdmatiere.innerHTML = matiere;

        tdnote.innerHTML = note;

        actualiseMoyenne();
        addEvent();
        var add = document.getElementById("modification");
        add.remove();
        window.form = 0;
    }else {
        alert("Veuillez entrer une note correcte!!");
        formulaire[1].value = "";
    }


}
function ajouter(){
    var formulaire = document.getElementsByTagName("input");
    var val = formulaire[1].value;
    var matiere = formulaire[0].value;
    if((parseFloat(val)).toString() == val && val != "") {
        note = parseFloat(val);

        if (window.vide == 0) {
            var tableau;
            tableau = document.getElementById("tableau");
            var moyenne = document.getElementById("moyenne");
            // alert(moyenne);
            var nbr = tableau.childNodes.length;
            var ligne = document.createElement("tr");
            ligne.className = "info";
            ligne.id = "element" + nbr;
            ligne.innerHTML = "<td class = 'matiere'>" +
                matiere + " </td> <td class = 'note'>" + note + " </td> <td class='action' id = 'map" + nbr +
                "'> <div> <span class ='icon-pencil Edit' style='-webkit-transform:scale(1.5);'></span> <span class='icon-remove Suppression pull-right'style='-webkit-transform:scale(1.5);'></span> " +
                "</div> </td>";

            moyenne.parentNode.insertBefore(ligne, moyenne);
            actualiseMoyenne();
            addEvent();
            var add = document.getElementById("ajouter");
            add.remove();
        } else {
            var tableau;
            var moyenne = document.createElement("tr");
            moyenne.id = "moyenne";
            moyenne.className = "warning";
            moyenne.innerHTML = '<td class = "matiere" colspan="2">MOYENNE </td> <td id = "moy">12 </td>';
            tableau = document.getElementsByTagName("tbody")[0];
            tableau.appendChild(moyenne);
            var nbr = 1;
            var ligne = document.createElement("tr");
            ligne.className = "info";
            ligne.id = "element" + nbr;
            ligne.innerHTML = "<td class = 'matiere'>" + matiere + " </td> " +
                "<td class = 'note'>" + note + " </td> " +
                "<td class='action' id = 'map" + nbr + "'> <div> <span class ='icon-pencil Edit'style='-webkit-transform:scale(1.5);'></span> <span class='icon-remove Suppression pull-right'style='-webkit-transform:scale(1.5);'></span> " +
                "</div></td>";

            moyenne.parentNode.insertBefore(ligne, moyenne);
            actualiseMoyenne();
            addEvent();
            var add = document.getElementById("ajouter");
            add.remove();
            window.vide = 0;
        }
        window.form = 0;
    }else{
        alert("Veuillez entrer une note correcte!!");
        formulaire[1].value = "";
    }

}
function actualiseMoyenne(){
    var notes = document.getElementsByClassName("note");
    var moyenne = 0.0 ;
    if(notes.length > 0){
        for(i = 0;i<notes.length;i++){
            moyenne += parseFloat(notes[i].innerHTML);
            //alert("taille "+notes.length+ "  moyenne     "+ notes[i].innerHTML);

        }

        moyenne /= notes.length;
        var repmoy = document.getElementById("moy");
        repmoy.innerHTML = ""+moyenne;
    }else {
       // alert("note     "+ notes.length);

        var repmoy = document.getElementById("moyenne");
        repmoy.remove();
        window.vide = 1;
    }


}
function addEvent(){
    var t = (document.getElementsByClassName("Suppression"));
    for(var i = 0; i< t.length;i++){
        t[i].addEventListener("click",function(e){
            supprime(e.target);
            e.preventDefault;
        });
    }

    t = (document.getElementsByClassName("Edit"));
    for(var i = 0; i< t.length;i++){
        t[i].addEventListener("click",function(e){
            modifie(e.target);
            e.preventDefault;
        });
    }

}

function refresh(p) {
    if(p ==0){
        var val = (document.getElementById("submit")).addEventListener("click",function (e) {
            ajouter();
            e.preventDefault;

        });
        var annul = (document.getElementById("cancel")).addEventListener("click",function (e) {
            var op = document.getElementById("ajouter");
            op.remove();
            window.form =0;
            e.preventDefault;

        });
    }
    if(p== 1){
        var val = (document.getElementById("submit")).addEventListener("click",function (e) {
            modifier();
            e.preventDefault;

        });
        var annul = (document.getElementById("cancel")).addEventListener("click",function (e) {
            var op = document.getElementById("modification");
            op.remove();
            window.form =0;
            e.preventDefault;

        });
    }

}
