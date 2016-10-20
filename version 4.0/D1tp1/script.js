/**
 * Created by D'rin on 06/10/2016.
 */
function calcul(){
    var div = document.getElementById("bloc1");
    var val = document.forms["myform"].nombre.value;
    if((parseFloat(val)).toString() == val && val != ""){
        var nbr = parseFloat(val);
        var carre = nbr *nbr;

        var result = document.getElementById("result");
        result.innerHTML = "Le carre de <span style='background-color:red'>"+nbr+"</span> est <span style='background-color:green'>"+carre+"</span><br/>";
    }else{
        alert("Veuillez entrer un nombre!!");
        document.forms["myform"].nombre.value = "";
    }


}