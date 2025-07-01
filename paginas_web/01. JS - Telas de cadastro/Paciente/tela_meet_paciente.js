window.onload = () => {
    // Domínio a ser utilizado para a chamada
    const domain = 'meet.jit.si';

    const roomName = 'TherapyConsultaDaviClarice';

    // Informações do usuário que está entrando na chamada
    const userInfo = {
        displayName: 'Davi Oliveira' 
    };

    // Opções para a API do Jitsi
    const options = {
        roomName: roomName,
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#meet-container'), // Onde a chamada será renderizada
        userInfo: userInfo,
        // Configurações da interface para traduzir e customizar
        configOverwrite: {
            startWithAudioMuted: true, // Começar com áudio mudo
            startWithVideoMuted: false, // Começar com vídeo ligado
            prejoinPageEnabled: false, // Pular a tela de pré-visualização do Jitsi
            toolbarButtons: [ 
                'microphone', 'camera', 'desktop', 'hangup', 'profile', 
                'chat', 'recording', 'livestreaming', 'etherpad', 'sharedvideo', 
                'settings', 'raisehand', 'videoquality', 'filmstrip', 
                'feedback', 'stats', 'shortcuts', 'tileview', 'videobackgroundblur', 
                'fullscreen', 'mute-everyone'
            ],
        },
        // Configurações de idioma e outras
        interfaceConfigOverwrite: {
            DEFAULT_BACKGROUND: '#fafafd',
            SHOW_CHROME_EXTENSION_BANNER: false,
            TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'desktop', 'hangup', 'profile', 'chat', 'raisehand', 'settings'
            ],
            SETTINGS_SECTIONS: ['devices', 'language', 'profile', 'moderator'],
            LANG_DETECTION: true, // Tenta detectar o idioma do navegador
            DEFAULT_REMOTE_DISPLAY_NAME: 'Especialista',
        }
    };

    // Inicializa a API do Jitsi
    const api = new JitsiMeetExternalAPI(domain, options);

    api.addEventListener('videoConferenceLeft', (payload) => {
        console.log('O usuário saiu da chamada.');
        alert('Você encerrou a chamada.');
    });
};

document.getElementById("date").innerHTML = new Date().toLocaleDateString();
document.getElementById("time").innerHTML = new Date().toLocaleTimeString();
