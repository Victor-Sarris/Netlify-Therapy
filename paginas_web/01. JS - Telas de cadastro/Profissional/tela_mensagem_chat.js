// Variáveis globais
let currentChat = null;
let conversations = [];
let messages = {};

// Função para inicializar o chat
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupEventListeners();
    const firstChat = document.querySelector('.conversation-item');
    if (firstChat) {
        firstChat.click();
    }
    setupCalendar();
});

// Inicializar dados de exemplo
function initializeData() {
    const conversationElements = document.querySelectorAll('.conversation-item');

    conversationElements.forEach((conv, index) => {
        const id = 'chat_' + index;
        const name = conv.querySelector('h3').textContent;
        const lastMessage = conv.querySelector('p').textContent;
        const time = conv.querySelector('.time').textContent;
        const img = conv.querySelector('img').src;

        conversations.push({
            id: id,
            name: name,
            lastMessage: lastMessage,
            time: time,
            img: img,
            element: conv
        });

        messages[id] = [];
        conv.setAttribute('data-id', id);
    });

    const messageElements = document.querySelectorAll('.message');

    if (conversations.length > 0) {
        messageElements.forEach(msg => {
            const text = msg.querySelector('p').textContent;
            const isPatient = msg.classList.contains('patient');

            messages[conversations[0].id].push({
                text: text,
                sender: isPatient ? 'patient' : 'therapist',
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            });
        });
    }
}

// Configurar eventos
function setupEventListeners() {
    document.querySelectorAll('.conversation-item').forEach(conv => {
        conv.addEventListener('click', function() {
            const chatId = this.getAttribute('data-id');
            selectChat(chatId);
        });
    });

    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-btn');

    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (text && currentChat) {
            addMessage(text, 'therapist');
            chatInput.value = '';
        }
    };

    sendButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 🔍 Funcionalidade de busca nos contatos
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        conversations.forEach(conversation => {
            const name = conversation.name.toLowerCase();
            const element = conversation.element;

            if (name.includes(searchTerm)) {
                element.style.display = 'flex';
            } else {
                element.style.display = 'none';
            }
        });
    });

    // Eventos do calendário
    document.querySelectorAll('.calendar .days div').forEach(day => {
        day.addEventListener('click', function() {
            document.querySelectorAll('.calendar .days div').forEach(d => {
                d.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    document.querySelector('.prev-month').addEventListener('click', function() {
        alert('Navegação para o mês anterior');
    });

    document.querySelector('.next-month').addEventListener('click', function() {
        alert('Navegação para o próximo mês');
    });

    document.querySelector('.description-header button').addEventListener('click', function() {
        const content = document.querySelector('.description-content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
        this.querySelector('i').classList.toggle('fa-chevron-up');
        this.querySelector('i').classList.toggle('fa-chevron-down');
    });

    setupMobileResponsiveness();
}

// Responsividade mobile
function setupMobileResponsiveness() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(menuToggle);

    menuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    const chatListToggle = document.createElement('button');
    chatListToggle.className = 'chat-list-toggle';
    chatListToggle.innerHTML = '<i class="fas fa-comments"></i>';
    document.body.appendChild(chatListToggle);

    chatListToggle.addEventListener('click', function() {
        document.querySelector('.chat-list').classList.toggle('active');
    });

    const profileToggle = document.createElement('button');
    profileToggle.className = 'profile-toggle';
    profileToggle.innerHTML = '<i class="fas fa-user"></i>';
    document.body.appendChild(profileToggle);

    profileToggle.addEventListener('click', function() {
        document.querySelector('.profile-panel').classList.toggle('active');
    });

    function updateButtonVisibility() {
        if (window.innerWidth > 1200) {
            profileToggle.style.display = 'none';
            chatListToggle.style.display = 'none';
            menuToggle.style.display = 'none';
        } else if (window.innerWidth > 900) {
            profileToggle.style.display = 'flex';
            chatListToggle.style.display = 'none';
            menuToggle.style.display = 'none';
        } else if (window.innerWidth > 600) {
            profileToggle.style.display = 'flex';
            chatListToggle.style.display = 'flex';
            menuToggle.style.display = 'none';
        } else {
            profileToggle.style.display = 'flex';
            chatListToggle.style.display = 'flex';
            menuToggle.style.display = 'flex';
        }
    }

    updateButtonVisibility();
    window.addEventListener('resize', updateButtonVisibility);
}

// Selecionar uma conversa
function selectChat(chatId) {
    const chat = conversations.find(c => c.id === chatId);
    if (!chat) return;

    currentChat = chatId;

    document.querySelectorAll('.conversation-item').forEach(conv => {
        conv.classList.remove('active');
    });

    chat.element.classList.add('active');

    // Atualizar cabeçalho do chat
    document.querySelector('.chat-user img').src = chat.img;
    document.querySelector('.chat-user h3').textContent = chat.name;

    // Atualizar painel de perfil do paciente
    document.querySelector('.patient-profile img').src = chat.img;
    document.querySelector('.patient-profile h2').textContent = chat.name.toUpperCase();
    document.querySelector('.patient-profile .status').textContent = 'ONLINE';

    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.innerHTML = '';

    messages[chatId].forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${msg.sender}`;
        messageElement.innerHTML = `<p>${msg.text}</p>`;
        chatMessages.appendChild(messageElement);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Adicionar uma nova mensagem
function addMessage(text, sender) {
    if (!currentChat) return;

    const message = {
        text: text,
        sender: sender,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    messages[currentChat].push(message);

    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.innerHTML = `<p>${text}</p>`;

    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (sender === 'therapist') {
        setTimeout(() => {
            const responses = [
                "Entendi, obrigado!",
                "Perfeito, vou anotar.",
                "Ok, até a próxima sessão!",
                "Sim, isso me ajuda muito.",
                "Compreendi, vou seguir sua orientação."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'patient');

            const currentConversation = conversations.find(c => c.id === currentChat);
            if (currentConversation) {
                currentConversation.lastMessage = randomResponse;
                currentConversation.element.querySelector('p').textContent = randomResponse;
                currentConversation.element.querySelector('.time').textContent = 'agora';
            }
        }, 1000);
    }
}

// Configurar calendário
function setupCalendar() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    document.querySelector('.calendar-header h4').innerHTML = 
        `${getMonthName(currentMonth)} <span>${currentYear}</span>`;

    const today = now.getDate();
    const dayElements = document.querySelectorAll('.calendar .days div:not(.prev-month-day):not(.next-month-day)');

    dayElements.forEach(day => {
        if (parseInt(day.textContent) === today) {
            day.classList.add('active');
        }
    });
}

// Obter nome do mês
function getMonthName(month) {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[month];
}
