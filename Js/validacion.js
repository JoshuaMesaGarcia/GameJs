var NameSpace = NameSpace || {};

NameSpace.Avatares = function() {};

NameSpace.Avatares.prototype.next = function() {
    var img = document.getElementsByClassName("image")[0];
    var idImg = img.getAttribute("id");
    if (idImg < 5) {
        idImg++;
    } else {
        idImg = 1;
    }
    img.src = "Images/" + idImg + ".jpg";
    img.id = idImg;
};

NameSpace.Avatares.prototype.back = function() {
    var img = document.getElementsByClassName("image")[0];
    var idImg = img.getAttribute("id");
    if (idImg > 1) {
        idImg--;
    } else {
        idImg = 4;
    }
    img.src = "Images/" + idImg + ".jpg";
    img.id = idImg;
};

NameSpace.Avatares.prototype.validar = function() {
    var divForm = document.getElementById("formUsu");
    var usuario = (document.getElementById("nUsu").value).trim();
    var avatar = document.getElementsByClassName("image")[0].getAttribute("src");
    if (usuario == "") {
        var alerta = document.createElement("h1");
        var textAlerta = document.createTextNode("Enter a username, please");
        alerta.style.color = "white";
        alerta.appendChild(textAlerta);
        divForm.appendChild(alerta);
    } else {
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("usuario", usuario);
        window.location = "JsGame.html";
    }
};
