
var modal = document.getElementById("modal");
var btn = document.getElementById("abrirModal");
var span = document.getElementsByClassName("fechar")[0];

// Quando o usuário clica no botão, abre o modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Quando o usuário clica no X, fecha o modal
span.onclick = function() {
  modal.style.display = "none";
}

// Quando o usuário clica fora do modal, fecha ele
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* anotaações:

O modal ainda não abrindo, tenho que arrumar isso depois */

