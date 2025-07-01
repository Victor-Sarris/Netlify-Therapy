// Busca (apenas exemplo)
document.getElementById('btn-buscar').addEventListener('click', function() {
    alert('Busca simulada! (Funcionalidade a implementar)');
});

// FAQ interativo
const faqRespostas = {
    1: 'A teleconsulta funciona por videochamada, permitindo que você converse com o especialista de onde estiver.',
    2: 'Cada sessão dura em média 50 minutos, podendo variar conforme a necessidade.',
    3: 'No atendimento agendado, você escolhe o profissional, data e horário para sua consulta.',
    4: 'Se precisar de ajuda imediata, basta clicar em "Atendimento de Plantão" e você será conectado a um psicólogo disponível.'
};

const faqItems = document.querySelectorAll('.faq-item');
const faqRespostaDiv = document.getElementById('faq-resposta');

faqItems.forEach(item => {
    item.addEventListener('click', function() {
        faqItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        const idx = this.getAttribute('data-faq');
        faqRespostaDiv.textContent = faqRespostas[idx];
    });
});

// Destacar cards ao passar o mouse (opcional, já tem hover no CSS) 

// Carrossel de profissionais de plantão
const profissionais = [
    {
        nome: 'Psic. AAA',
        especialidades: ['TDAH', 'Ansiedade'],
        img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400',
        rating: 3.9,
        reviews: 25
    },
    {
        nome: 'Psic. BBB',
        especialidades: ['TDAH', 'Ansiedade'],
        img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400',
        rating: 3.9,
        reviews: 25
    },
    {
        nome: 'Psic. CCC',
        especialidades: ['TDAH', 'Ansiedade'],
        img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400',
        rating: 3.9,
        reviews: 25
    },
    {
        nome: 'Psic. DDD',
        especialidades: ['TDAH', 'Ansiedade'],
        img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=400',
        rating: 3.9,
        reviews: 25
    },
    {
        nome: 'Psic. EEE',
        especialidades: ['TDAH', 'Ansiedade'],
        img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400',
        rating: 3.9,
        reviews: 25
    }
];

const carouselLista = document.getElementById('carousel-lista');
let currentIndex = 0;
let cardsToShow = 3;

function updateCardsToShow() {
    if (window.innerWidth < 700) {
        cardsToShow = 1;
    } else if (window.innerWidth < 1000) {
        cardsToShow = 2;
    } else {
        cardsToShow = 3;
    }
}

function renderCarousel() {
    carouselLista.innerHTML = '';
    for (let i = 0; i < cardsToShow; i++) {
        const idx = (currentIndex + i) % profissionais.length;
        const prof = profissionais[idx];
        const card = document.createElement('div');
        card.className = 'especialista-card';
        card.innerHTML = `
            <img src="${prof.img}" alt="${prof.nome}">
            <div class="info">
                <h3>${prof.nome}</h3>
                <span><a href="#" style="color:#7c3aed;text-decoration:none;">${prof.especialidades[0]}</a> <a href="#" style="color:#7c3aed;text-decoration:none;">${prof.especialidades[1]}</a></span>
                <div style="margin:8px 0;">
                    <a href="#"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="fb" style="width:20px;margin-right:6px;filter:grayscale(1);"></a>
                    <a href="#"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg" alt="g+" style="width:20px;margin-right:6px;filter:grayscale(1);"></a>
                    <a href="#"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="in" style="width:20px;filter:grayscale(1);"></a>
                </div>
                <div class="avaliacao">
                    <span>⭐ ${prof.rating} (${prof.reviews})</span>
                </div>
            </div>
        `;
        carouselLista.appendChild(card);
    }
}

function prevCarousel() {
    currentIndex = (currentIndex - 1 + profissionais.length) % profissionais.length;
    renderCarousel();
}
function nextCarousel() {
    currentIndex = (currentIndex + 1) % profissionais.length;
    renderCarousel();
}

document.getElementById('carousel-prev').addEventListener('click', prevCarousel);
document.getElementById('carousel-next').addEventListener('click', nextCarousel);

window.addEventListener('resize', () => {
    updateCardsToShow();
    renderCarousel();
});

// Inicialização
updateCardsToShow();
renderCarousel();

// Carrossel de Depoimentos
const depoimentos = [
  {
    texto: 'Foi minha primeira experiência com terapia online e fiquei surpresa com a qualidade do atendimento. A psicóloga me fez sentir muito confortável desde o início. Recomendo!',
    nome: 'Iasmin S',
    papel: 'Paciente',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
    estrelas: 5
  },
  {
    texto: 'A modalidade de plantão me ajudou muito em um momento difícil. Fui atendido rapidamente e consegui encontrar clareza para tomar decisões importantes.',
    nome: 'Vinícius',
    papel: 'Paciente',
    img: 'https://randomuser.me/api/portraits/men/43.jpg',
    estrelas: 5
  },
  {
    texto: 'O atendimento foi humanizado e acolhedor. Senti que realmente se importam com o meu bem-estar.',
    nome: 'Carla M',
    papel: 'Paciente',
    img: 'https://randomuser.me/api/portraits/women/32.jpg',
    estrelas: 5
  },
  {
    texto: 'A plataforma é fácil de usar e os profissionais são excelentes. Recomendo para todos que buscam apoio psicológico.',
    nome: 'Lucas P',
    papel: 'Paciente',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
    estrelas: 5
  }
];

let depoimentoIndex = 0;
const depoimentosCards = document.getElementById('depoimentos-cards');

function renderDepoimentos() {
  depoimentosCards.innerHTML = '';
  for (let i = 0; i < cardsToShow; i++) {
    const idx = (depoimentoIndex + i) % depoimentos.length;
    const d = depoimentos[idx];
    const card = document.createElement('div');
    card.className = 'depoimento-card-novo';
    card.innerHTML = `
      <div class="depoimento-stars">${'★'.repeat(d.estrelas)}</div>
      <div class="depoimento-text">"${d.texto}"</div>
      <div class="depoimento-user">
        <img src="${d.img}" alt="${d.nome}">
        <div class="depoimento-user-info">
          <span class="name">${d.nome}</span>
          <span class="role">${d.papel}</span>
        </div>
      </div>
    `;
    depoimentosCards.appendChild(card);
  }
}

document.getElementById('depoimentos-prev').addEventListener('click', function() {
  depoimentoIndex = (depoimentoIndex - 1 + depoimentos.length) % depoimentos.length;
  renderDepoimentos();
});
document.getElementById('depoimentos-next').addEventListener('click', function() {
  depoimentoIndex = (depoimentoIndex + 1) % depoimentos.length;
  renderDepoimentos();
});

let depoimentoInterval = setInterval(() => {
  depoimentoIndex = (depoimentoIndex + 1) % depoimentos.length;
  renderDepoimentos();
}, 5000);

depoimentosCards.addEventListener('mouseenter', () => clearInterval(depoimentoInterval));
depoimentosCards.addEventListener('mouseleave', () => {
  depoimentoInterval = setInterval(() => {
    depoimentoIndex = (depoimentoIndex + 1) % depoimentos.length;
    renderDepoimentos();
  }, 5000);
});

renderDepoimentos();