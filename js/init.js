var Objetos =[];
var canvas = document.getElementById('plano');
var context = canvas.getContext('2d');
ContruirGrafico();

context.stroke();

function eixoY() {
    for(var i= 0; i<=canvas.height; i=i+20){
        context.fillText(i,0,i);
        context.moveTo(0, i);
        context.lineTo(canvas.width,i);
    }


}
function eixoX() {
    for(var i= 20; i<=canvas.width; i=i+20){
        context.fillText(i,i,10);
        context.moveTo(i, 0);
        context.lineTo(i,canvas.height);
    }
}
function desenhaObjeto(x,y,nome) {
    context.fillText(nome, x,y);
    context.fillRect(x,y, 2.5, 2.5);
}
function F(d,Q1,Q2){
    Q1=ConvertNumber(Q1);
    Q2=ConvertNumber(Q2);
    console.log(Q1,Q2);
    console.log(9*(Math.pow(10,9))*Q1*Q2);
    console.log(Math.pow(d,2));
    return ((9*(Math.pow(10,9)))*Q1*Q2)/Math.pow(d,2);
}
function ContruirGrafico() {
    context.font = "8px Arial";
    context.lineWidth = 0.5;
    context.strokeStyle = "#eee";
    eixoY();
    eixoX();
}
function AddObjeto(x,y, nome,carga,tipo) {
    var Objeto={nome:nome,local:{x:x,y:y},carga:carga, tipo:tipo};
    Objetos.push(Objeto);
    AtualizarListaObjeto();
}
function CalcularFDoisObjeto(Objeto1, Objeto2){
    var x=Math.pow((Objeto1.local.x-Objeto2.local.x),2);
    var y =Math.pow((Objeto1.local.y-Objeto2.local.y),2);
    var distancia= (x+y);
    var d = Math.sqrt(distancia);
    console.log(d);
    return F(d,Objeto1.carga,Objeto2.carga);
}
function ConvertNumber(carga) {
    return carga*(Math.pow(10,-6))
}
function AtualizarListaObjeto() {
    var edit= "<button class='btn btn-sm btn-danger' id='deletar'><i class='fa fa-trash' aria-hidden='true'></i> </button>"+
        "<button class=' btn btn-sm btn-success' id='editar'><i class='fa fa-pencil' aria-hidden='true'></i> </button>";
    var html;
    for(var i =0; i<Objetos.length; i++){
        desenhaObjeto(Objetos[i].local.x,Objetos[i].local.y,Objetos[i].nome);
        html= html+"<tr>";
        html = html+ "<td>"+Objetos[i].nome +"</td>";
        html = html+ "<td>"+Objetos[i].tipo+Objetos[i].carga +" µ </td>";
        html = html+ "<td>("+Objetos[i].local.x+" , "+ Objetos[i].local.y+")</td>";
        html = html+ "<td>"+edit+"</td>";
        html= html+"</tr>";
    }
    $("#objetos").html(html)

}
function CalcularF() {
var html;
    for(var i=0; i<Objetos.length; i++){
    for(var j=0;j<Objetos.length;j++){
        if (Objetos[i].nome == Objetos[j].nome) {
        } else {
            var tipo = (Objetos[j].tipo === Objetos[i].tipo) ? "Respusão" : "Atração";
            html = html + "<tr>";
            html = html + "<td>F(" + Objetos[i].nome + " , " + Objetos[j].nome + ")</td>" +
            "<td>" +
            CalcularFDoisObjeto(Objetos[i], Objetos[j]) +
            "</td>" +
            " <td>" +
            Objetos[i].nome + " , " + Objetos[j].nome +
            "</td>" +
            "<td>" + tipo
            +"</td> ";
            html = html + "</tr>"
        }
        }
        $("#forcas").html(html)
    }

}
$("#salvar").click(function () {
    $('#myModal').modal("hide");
    var nome = $("#nome_obj").val();
    var carga = $("#carga").val();
    var tipo = $("#tipo").val();
    var x = $("#x").val();
    var y = $("#y").val();
    AddObjeto(x,y,nome,carga,tipo);
    if(Objetos.length>=2){
        CalcularF();
    }
});
