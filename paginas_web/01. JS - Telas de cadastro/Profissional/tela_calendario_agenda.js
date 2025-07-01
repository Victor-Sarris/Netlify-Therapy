// Abrir modal
document.getElementById("addNotasBtn").onclick = function() {
  document.getElementById("modalNotas").style.display = "block";
}

// Fechar modal ao clicar no X
document.querySelector(".close").onclick = function() {
  document.getElementById("modalNotas").style.display = "none";
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
  const modal = document.getElementById("modalNotas");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




// modal de confirmação de agenda


document.getElementById("salvarModalBnt").onclick = function () {
  // Fecha o modal de notas
  document.getElementById("modalNotas").style.display = "none";

  // Abre o modal de confirmação
  const modalConfirmacao = document.getElementById("modalConfirmacao");
  modalConfirmacao.style.display = "block";

  // Fecha o modal de confirmação após 3 segundos
  setTimeout(() => {
    modalConfirmacao.style.display = "none";
  }, 3000);
};
