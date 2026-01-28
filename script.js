/* =========================================================
   NAVEGAÇÃO ENTRE TELAS (MENU / PLAYER)
   ========================================================= */

/**
 * Mostra a tela escolhida e esconde as outras
 * @param {string} screen - nome da tela (menu, player)
 */
function goTo(screen) {
    // Remove a classe "active" de todas as telas
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
    });

    // Seleciona a tela correta
    const target = document.getElementById(`screen-${screen}`);
    if (!target) return;

    // Ativa a tela selecionada
    target.classList.add('active');
}

// Garante que o menu seja exibido ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    goTo('menu');
});


/* =========================================================
   REFERÊNCIAS DOS ELEMENTOS HTML
   ========================================================= */

// Elemento <audio>
const song = document.getElementById('audio');

// Capa da música
const cover = document.getElementById('cover');

// Nome da música
const songName = document.getElementById('song-name');

// Botões
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('previous');

// Barra de progresso
const progressContainer = document.getElementById('progress-bar');
const currentProgress = document.getElementById('current-progress');

// Tempo
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');


/* =========================================================
   PLAYLIST
   ========================================================= */

const songs = [
    { name: "A Benção", file: "songs/a_bencao.mp3", cover: "abencao.jpg" },
    { name: "Vitorioso És", file: "songs/vitorioso_es.mp3", cover: "vitorioso_es.jpg" },
    { name: "Acredito", file: "songs/acredito.mp3", cover: "acredito.jpg" },
    { name: "Sua Presença", file: "songs/sua_presenca.mp3", cover: "sua_presenca.jpg" },
    { name: "Átos 2", file: "songs/atos2.mp3", cover: "atos2.jpg" },
    { name: "Eu Só Quero Tua Presença", file: "songs/eu_so_quero_tua_presenca.mp3", cover: "eu_so_quero_tua_presenca.jpg" },
    { name: "Todavia Me Alegrarei", file: "songs/samuel_messias_todavia_me_alegrarei.mp3", cover: "samuel_messias_todavia_me_alegrarei.jpg" },
    { name: "Tudo A Ver Com Ele", file: "songs/tudo_a_ver_com_ele_central3.mp3", cover: "tudo_a_ver_com_ele_central3.jpg" },
    { name: "Era Eu", file: "songs/era_eu_casa_worship.mp3", cover: "era_eu_casa_worship.jpg" },
    { name: "Lindo És + Só Quero Ver Você", file: "songs/juliano_son_lindo_es_so_quero_ver_voce.mp3", cover: "juliano_son_lindo_es_so_quero_ver_voce.jpg" },
    { name: "Caminho No Deserto", file: "songs/caminho_no_deserto_fernandinho_epaula.mp3", cover: "caminho_no_deserto_fernandinho_epaula.jpg" },
    { name: "Nada Mais", file: "songs/gabriel_guedes_nada_mais.mp3", cover: "gabriel_guedes_nada_mais.jpg" },
    { name: "Em Teus Braços", file: "songs/em_teus_bracos_mauro_henrique.mp3", cover: "em_teus_bracos_mauro_henrique.jpg" },
    { name: "Furioso Oceano", file: "songs/furioso_oceano_jhonas_serra.mp3", cover: "furioso_oceano_jhonas_serra.jpg" },
    { name: "Colossenses E Suas Linhas de Amor", file: "songs/marco_telles_colossenses_e_suas_linhas_de_amor.mp3", cover: "marco_telles_colossenses_e_suas_linhas_de_amor.jpg" },
    { name: "Único", file: "songs/unico.mp3", cover: "unico.jpg" }
];


/* =========================================================
   CONTROLE DE ESTADO
   ========================================================= */

let currentSong = 0; // música atual
let isPlaying = false; // estado do player


/* =========================================================
   PLAY / PAUSE
   ========================================================= */

function playSong() {
    const icon = playBtn.querySelector('i');

    // Atualiza texto e capa
    songName.innerText = songs[currentSong].name;
    cover.src = songs[currentSong].cover;

    // PLAY
    if (!isPlaying) {

        // Define o áudio apenas se for outro
        if (!song.src.includes(songs[currentSong].file)) {
            song.src = songs[currentSong].file;
            song.load();
        }

        song.play().then(() => {
            isPlaying = true;
            icon.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
        }).catch(err => console.error('Erro ao tocar:', err));

    }
    // PAUSE
    else {
        song.pause();
        isPlaying = false;
        icon.classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill');
    }
}


/* =========================================================
   CONTROLES DE NAVEGAÇÃO
   ========================================================= */

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    isPlaying = false;
    playSong();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    isPlaying = false;
    playSong();
}

function playFromList(index) {
    currentSong = index;
    isPlaying = false;
    playSong();
}

// Eventos dos botões
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Próxima música automática
song.addEventListener('ended', nextSong);


/* =========================================================
   TEMPO E BARRA DE PROGRESSO
   ========================================================= */

// Atualiza barra e tempo atual
song.addEventListener('timeupdate', () => {
    if (!song.duration) return;

    const percent = (song.currentTime / song.duration) * 100;
    currentProgress.style.width = `${percent}%`;

    currentTimeEl.innerText = formatTime(song.currentTime);
});

// Duração total
song.addEventListener('loadedmetadata', () => {
    durationEl.innerText = formatTime(song.duration);
});

// Clique na barra
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;

    song.currentTime = (clickX / width) * song.duration;
});


/* =========================================================
   FUNÇÃO AUXILIAR
   ========================================================= */

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}
