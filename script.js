// ===============================
// REFERÊNCIAS DOS ELEMENTOS HTML
// ===============================

// Elemento <audio> responsável por tocar a música
const song = document.getElementById('audio');

// Imagem da capa da música
const cover = document.getElementById('cover');

// Nome da música exibido na tela
const songName = document.getElementById('song-name');

// Botão de play/pause
const playBtn = document.getElementById('play');

// Botão próxima música
const nextBtn = document.getElementById('next');

// Botão música anterior
const prevBtn = document.getElementById('previous');

// Barra clicável de progresso
const progressContainer = document.getElementById('progress-bar');

// Parte preenchida da barra de progresso
const currentProgress = document.getElementById('current-progress');

// Tempo atual da música (00:00)
const currentTimeEl = document.getElementById('current-time');

// Duração total da música (00:00)
const durationEl = document.getElementById('duration');


// ===============================
// EVENTOS DOS BOTÕES E DO ÁUDIO
// ===============================

// Avança para a próxima música
nextBtn.addEventListener('click', nextSong);

// Volta para a música anterior
prevBtn.addEventListener('click', prevSong);

// Quando a música terminar, toca a próxima automaticamente
song.addEventListener('ended', nextSong);

// Atualiza a barra de progresso conforme a música toca
song.addEventListener('timeupdate', () => {
    if (!song.duration) return;

    const progressPercent = (song.currentTime / song.duration) * 100;
    currentProgress.style.width = `${progressPercent}%`;
});

// Quando os metadados carregam, mostra a duração total
song.addEventListener('loadedmetadata', () => {
    durationEl.innerText = formatTime(song.duration);
});


// ===============================
// LISTA DE MÚSICAS (PLAYLIST)
// ===============================

const songs = [
    {
        name: "A Benção",
        file: "songs/a_bencao.mp3",
        cover: "abencao.jpg"
    },
    {
        name: "Vitorioso És",
        file: "songs/vitorioso_es.mp3",
        cover: "vitorioso_es.jpg"
    },
    {
        name: "Acredito",
        file: "songs/acredito.mp3",
        cover: "acredito.jpg"
    },
    {
        name: "Sua Presença",
        file: "songs/sua_presenca.mp3",
        cover: "sua_presenca.jpg"
    },
    {
        name: "Átos 2",
        file: "songs/atos2.mp3",
        cover: "atos2.jpg"
    },
    {
        name: "Eu Só Quero Tua Presença",
        file: "songs/eu_so_quero_tua_presenca.mp3",
        cover: "eu_so_quero_tua_presenca.jpg"
    },
    {
        name: "Todavia Me Alegrarei",
        file: "songs/samuel_messias_todavia_me_alegrarei.mp3",
        cover: "samuel_messias_todavia_me_alegrarei.jpg"
    },
    {
        name: "Tudo A Ver Com Ele",
        file: "songs/tudo_a_ver_com_ele_central3.mp3",
        cover: "tudo_a_ver_com_ele_central3.jpg"
    },
    {
        name: "Era Eu",
        file: "songs/era_eu_casa_worship.mp3",
        cover: "era_eu_casa_worship.jpg"
    },
    {
        name: "Lindo És + Só Quero Ver Você",
        file: "songs/juliano_son_lindo_es_so_quero_ver_voce.mp3",
        cover: "juliano_son_lindo_es_so_quero_ver_voce.jpg"
    },
    {
        name: "Caminho No Deserto",
        file: "songs/caminho_no_deserto_fernandinho_epaula.mp3",
        cover: "caminho_no_deserto_fernandinho_epaula.jpg"
    },
    {
        name: "Nada Mais",
        file: "songs/gabriel_guedes_nada_mais.mp3",
        cover: "gabriel_guedes_nada_mais.jpg"
    },
    {
        name: "Em Teus Braços",
        file: "songs/em_teus_bracos_mauro_henrique.mp3",
        cover: "em_teus_bracos_mauro_henrique.jpg"
    },
    {
        name: "Furioso Oceano",
        file: "songs/furioso_oceano_jhonas_serra.mp3",
        cover: "furioso_oceano_jhonas_serra.jpg"
    },
    {
        name: "Colossenses E Suas Linhas de Amor",
        file: "songs/marco_telles_colossenses_e_suas_linhas_de_amor.mp3",
        cover: "marco_telles_colossenses_e_suas_linhas_de_amor.jpg"
    },
    {
        name: "Único",
        file: "songs/unico.mp3",
        cover: "unico.jpg"
    }
];


// ===============================
// CONTROLE DE ESTADO
// ===============================

// Indica se a música está tocando
let isPlaying = false;

// Índice da música atual
let currentSong = 0;

// Flag para controle de carregamento (pouco usada aqui)
let loaded = false;


// ===============================
// PLAY / PAUSE
// ===============================

function playSong() {
    const icon = playBtn.querySelector('i');

    // Atualiza nome da música e capa
    songName.innerText = songs[currentSong].name;
    cover.src = songs[currentSong].cover;

    // Se NÃO estiver tocando → play
    if (!isPlaying) {
        song.src = songs[currentSong].file;

        // Força o carregamento do áudio (importante online)
        song.load();

        song.play()
            .then(() => {
                isPlaying = true;
                icon.classList.remove('bi-play-circle-fill');
                icon.classList.add('bi-pause-circle-fill');
            })
            .catch(err => {
                console.log('Erro ao tocar:', err);
            });

    } 
    // Se JÁ estiver tocando → pause
    else {
        song.pause();
        isPlaying = false;
        icon.classList.remove('bi-pause-circle-fill');
        icon.classList.add('bi-play-circle-fill');
    }
}


// ===============================
// PRÓXIMA MÚSICA
// ===============================

function nextSong() {
    // Avança o índice da música
    currentSong = (currentSong + 1) % songs.length;

    // Força novo play
    isPlaying = false;
    playSong();
}


// ===============================
// MÚSICA ANTERIOR
// ===============================

function prevSong() {
    // Volta o índice da música
    currentSong = (currentSong - 1 + songs.length) % songs.length;

    loaded = false;

    // Para e reseta a música atual
    song.pause();
    song.currentTime = 0;

    // Força o ícone de play
    const icon = playBtn.querySelector('i');
    icon.classList.remove('bi-pause-circle-fill');
    icon.classList.add('bi-play-circle-fill');

    // Toca a música anterior
    playSong();
}


// ===============================
// FORMATA TEMPO (MM:SS)
// ===============================

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}


// ===============================
// ATUALIZA TEMPO ATUAL E BARRA
// ===============================

song.addEventListener('timeupdate', () => {
    if (!song.duration) return;

    const progressPercent = (song.currentTime / song.duration) * 100;
    currentProgress.style.width = `${progressPercent}%`;

    // Atualiza o tempo atual
    currentTimeEl.innerText = formatTime(song.currentTime);
});


// ===============================
// CLIQUE NA BARRA DE PROGRESSO
// ===============================

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;

    const duration = song.duration;

    // Calcula o tempo proporcional ao clique
    song.currentTime = (clickX / width) * duration;
});
