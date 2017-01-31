//Declaración de variables globales.
var zonaJuego = document.getElementById("tableroJuego");
var elementH1 = document.createElement("h1");
var divModoJuego = document.getElementById("modoJuego");
var btnIndex = document.getElementById("indexPage"); //Boton que te lleva a Index
btnIndex.style.visibility = "hidden"; //Al principio estará oculto
var countdown;
var countdown_number;
contadorId = 0; //Contador del numero total de id de la caja
var puntuacion = 0; //variable global donde se va a guardar la puntuacion
var aciertos = 0;
var nameUsu = "";
var controlComprobar = false; //Variable para controlar que no se pueda pinchar al principio
//Creación del array de Colores.
var arrayColores = ["#2EFE2E", "#F78181", "#2ECCFA", "#21610B", "#DF7401", "#FF0000", "#151515", "#0000FF", "#3ADF00", "#FE2E9A"];
var arrayIds = [];
var time = "";
var contadorJuego = 0; //Contador de ronda
var contadorPosicion = 0; //Contador donde se encuentra en ese momento


//Creación del tablero de juego, con su respectivo modo de juego
//Al crear la tabla se iniciará todos los valores que se ha usado una vez jugado.
function crearTablero(tamanio) {
    var tablaP = document.getElementById("tablaPuntuaciones");
    tablaP.innerHTML = "";
    var imgAvatar = document.createElement("img");
    imgAvatar.setAttribute("src", localStorage.getItem("avatar"));
    tablaP.appendChild(imgAvatar);
    controlComprobar = false;
    zonaJuego.innerHTML = "";
    aciertos = 0;
    contadorId = 0;
    contadorJuego = 0;
    contadorPosicion = 0;
    var tablero = document.createElement("table");
    tablero.setAttribute("border", "2");
    tablero.setAttribute("class", "table-responsive");
    for (var i = 0; i < tamanio; i++) {
        var hilera = document.createElement("tr");
        for (var a = 0; a < tamanio; a++) {
            var columna = document.createElement("td");
            columna.setAttribute("height", "30px");
            columna.setAttribute("width", "30px");
            columna.setAttribute("id", contadorId);
            var selecColor = crearRandomcito(arrayColores.length); //color random con en el que se pinta la casilla
            columna.style.backgroundColor = arrayColores[selecColor];
            columna.onclick = function() {
                comprobar(this)
            };
            hilera.appendChild(columna);
            contadorId++
        }
        tablero.appendChild(hilera);
    }
    zonaJuego.appendChild(tablero);
    var iniciarButton = document.createElement("button");
    var textoButton = document.createTextNode("Start!");
    iniciarButton.appendChild(textoButton);
    iniciarButton.addEventListener("click", iniciarJuegoF1);
    iniciarButton.setAttribute("id", "comienzo");
    iniciarButton.setAttribute("class", "button button5")
    zonaJuego.appendChild(iniciarButton);
    tableroDimension();
}


function iniciarJuegoF1() {
    document.getElementById("modoFacil").style.visibility = "hidden";
    document.getElementById("modoMedio").style.visibility = "hidden";
    document.getElementById("modoDificil").style.visibility = "hidden";
    countdown_number = 4;
    countdown_trigger();
}


function iniciarJuegoF2() {
    var valorRandomId = crearRandomcito(contadorId); //Valor random de la caja
    var selecColor = crearRandomcito(arrayColores.length); //color random con en el que se pinta la casilla
    document.getElementById(valorRandomId).style.backgroundColor = "white";
    document.getElementById(valorRandomId).setAttribute("value", contadorJuego);
    while (arrayIds.indexOf(valorRandomId) != -1) {
        valorRandomId = crearRandomcito(contadorId);
    }
    arrayIds.push(valorRandomId);
    contadorPosicion = 0;
    time = setTimeout(function() {
        reColor(valorRandomId)
    }, 1000);
}


function Usuario(nombreUsu, puntuacion) {
    this.nombreUsu = nombreUsu;
    this.puntuacion = puntuacion;
}
//var storedNames=JSON.parse(localStorage['names']);
function ListaUsu() {
    this.arrayUsuario = [];
    if (localStorage.getItem("data") != null) {
        var test2 = localStorage.getItem("data");
        this.arrayUsuario = JSON.parse(test2);
    }
}

ListaUsu.prototype.insertarUsu = function(nombreUsu, puntuacion) {
    this.arrayUsuario.push(new Usuario(nombreUsu, puntuacion));
};

ListaUsu.prototype.mostrarUsu = function() {
    var varTablaPuntuaciones = document.getElementById("tablaPuntuaciones");
    varTablaPuntuaciones.innerHTML = "";
    var tabla = document.createElement("table");
    var trTabla = document.createElement("tr");

    var thTabla = document.createElement("th");
    var thTextUsu = document.createTextNode("Usuario");
    thTabla.appendChild(thTextUsu);
    trTabla.appendChild(thTabla);

    var thTabla2 = document.createElement("th");
    var thTextPunt = document.createTextNode("Puntuacion");
    thTabla2.appendChild(thTextPunt);
    trTabla.appendChild(thTabla2);

    varTablaPuntuaciones.appendChild(tabla);
    varTablaPuntuaciones.appendChild(trTabla);


    for (a = 0; a < this.arrayUsuario.length; a++) {
        var hilera = document.createElement("tr");
        var tdUsu = document.createElement("td");
        var tdPuntua = document.createElement("td");
        var textoUsu = document.createTextNode(" " + this.arrayUsuario[a].nombreUsu + " ");
        var textoPuntuacion = document.createTextNode(" " + this.arrayUsuario[a].puntuacion + " ");
        tdUsu.appendChild(textoUsu);
        tdPuntua.appendChild(textoPuntuacion);
        hilera.appendChild(tdUsu);
        hilera.appendChild(tdPuntua);
        varTablaPuntuaciones.appendChild(hilera);
    }

};


var misUsuarios = new ListaUsu();

if (localStorage.getItem("data") == null) {
    misUsuarios = new ListaUsu();
}

function comprobar(element) {
    //Aquí se realizará que pierda el usuario;
    if (controlComprobar == true) {
        if (element.getAttribute("value") != contadorPosicion) {
            var textPerder = document.createTextNode("Has Perdido");
            elementH1.appendChild(textPerder);
            document.getElementById("cajaPerder").appendChild(elementH1);
            zonaJuego.innerHTML = "";
            document.getElementById("modoFacil").style.visibility = "visible";
            document.getElementById("modoMedio").style.visibility = "visible";
            document.getElementById("modoDificil").style.visibility = "visible";
            nameUsu = localStorage.getItem("usuario");
            puntuacionF();
            misUsuarios.insertarUsu(nameUsu, puntuacion);
            localStorage.setItem("data", JSON.stringify(misUsuarios.arrayUsuario));
            misUsuarios.mostrarUsu();
            puntuacion = 0;
            document.getElementById("cajaPerder").removeChild(elementH1);
            btnIndex.style.visibility = "visible";
        } else {
            if (contadorPosicion == contadorJuego) {
                aciertos++;
                contadorJuego++;
                puntuacionF();
                nextLevel();
            } else {
                contadorPosicion++;
            }
        }
    }
}

function nextLevel() {
    if ((contadorId == 100) && (aciertos == 3)) {
        crearTablero(12);
    } else if ((contadorId == 144) && (aciertos == 4)) {
        crearTablero(15);
    } else if ((contadorId == 225) && (aciertos == 5)) {
        var varVictoria = document.createElement("h1");
        var textoVictoria = document.createTextNode("Congratulations you win the game!!!");
        varVictoria.appendChild(textoVictoria);
        divModoJuego.appendChild(varVictoria);
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', "Audio/Final_Fantasy _VII_Victory_Fanfare.mp3");
        audioElement.play();
        puntuacionF();
        nameUsu = localStorage.getItem("usuario");
        misUsuarios.insertarUsu(nameUsu, puntuacion);
        localStorage.setItem("data", JSON.stringify(misUsuarios.arrayUsuario));
        misUsuarios.mostrarUsu();
        puntuacion = 0;
    } else {
        iniciarJuegoF2();
    }
}


function puntuacionF() {
    if (contadorId == 100) {
        puntuacion = puntuacion + 100;
    }
    if (contadorId == 144) {
        puntuacion = puntuacion + 200;
    }
    if (contadorId == 225) {
        puntuacion = puntuacion + 300;
    }
}


function crearRandomcito(element) {
    return Math.floor((Math.random() * element) + 0);
}

function countdown_trigger() {
    if (countdown_number > 0) {
        countdown_number--;
        elementH1.innerHTML = "The game start in " + countdown_number + " seconds";
        elementH1.style.color = "#DCDCDC";
        divModoJuego.appendChild(elementH1)
        if (countdown_number > 0) {
            countdown = setTimeout('countdown_trigger()', 1000);
        }
    }
    if (countdown_number == 0) {
        document.getElementById("comienzo").style.visibility = "hidden";
        elementH1.innerHTML = "";
        controlComprobar = true;
        iniciarJuegoF2();
    }
}

function tableroDimension() {
    if (contadorId == 100) {
        document.getElementById("tableroJuego").style.width = "";
        document.getElementById("tableroJuego").style.width = "45%";
        document.getElementById("comienzo").style.marginLeft = "23%";
    }
    if (contadorId == 144) {
        document.getElementById("tableroJuego").style.width = "";
        document.getElementById("tableroJuego").style.width = "52%";
        document.getElementById("comienzo").style.marginLeft = "26%";
    }
    if (contadorId == 225) {
        document.getElementById("tableroJuego").style.width = "";
        document.getElementById("tableroJuego").style.width = "64%";
        document.getElementById("comienzo").style.marginLeft = "30%";
    }
}

function reColor(element) {
    clearTimeout(time);
    var selecColor = crearRandomcito(arrayColores.length);
    document.getElementById(element).style.backgroundColor = arrayColores[selecColor];;
}

function goIndex() {
    window.location = "Index.html";
}
