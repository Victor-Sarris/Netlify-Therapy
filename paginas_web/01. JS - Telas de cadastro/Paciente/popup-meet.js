// Funções para o pop-up de Meet
function showMeetPopup() {
  const popup = document.getElementById('meetPopup');
  if (popup) {
    popup.style.display = 'flex';
    // Adiciona animação de fade in
    popup.style.opacity = '0';
    setTimeout(() => {
      popup.style.opacity = '1';
    }, 10);
  }
}

// Função para abrir o chat
function openChat() {
  hideMeetPopup(); // Fecha o popup
  // Redireciona para a tela de mensagens
  window.location.href = 'tela_msg_cliente.html';
}

function hideMeetPopup() {
  const popup = document.getElementById('meetPopup');
  if (popup) {
    // Adiciona animação de fade out
    popup.style.opacity = '0';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 200);
  }
}

// Fechar pop-up ao clicar fora dele
document.addEventListener('DOMContentLoaded', function() {
  const popup = document.getElementById('meetPopup');
  
  if (popup) {
    popup.addEventListener('click', function(e) {
      if (e.target === this) {
        hideMeetPopup();
      }
    });

    // Previne que cliques dentro do popup fechem ele
    const popupContent = popup.querySelector('.popup-content');
    if (popupContent) {
      popupContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }

  // Fechar pop-up com a tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideMeetPopup();
    }
  });

  // Adiciona transição CSS para animação suave
  const style = document.createElement('style');
  style.textContent = `
    .popup-overlay {
      transition: opacity 0.2s ease-in-out;
    }
  `;
  document.head.appendChild(style);
});

// Função para testar se o popup está funcionando
function testPopup() {
  console.log('Testando popup...');
  showMeetPopup();
}