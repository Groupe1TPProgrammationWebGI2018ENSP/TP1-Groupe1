/**
 * Created by D'rin on 06/10/2016.
 */
document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("myform").addEventListener("submit",function(event){
        event.preventDefault();
        calcul();
    })
     });
function calcul(){
    var elt_nombre = document.getElementById("nombre");
    var val = elt_nombre.value;
    var result = document.getElementById("result");

    if((parseFloat(val).toString() == val && val!="") || (val - parseFloat(val))==0){
        var nbr = parseFloat(val);
        var carre = nbr *nbr;

        result.innerHTML = "&nbsp;Le carre de <span class='red'>"+nbr+"</span> est <span class='green'>"+carre+"</span><br/>";
    }else{
        alert("Veuillez entrer un nombre!!");
        elt_nombre.value = "";
        result.innerHTML = "";
    }


}
