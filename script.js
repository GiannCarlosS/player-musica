const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const songName = document.getElementById('song-name');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('previous');
const progressContainer = document.getElementById('progress-bar');
const currentProgress = document.getElementById('current-progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');



nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
song.addEventListener('ended', nextSong);
song.addEventListener('timeupdate', () => {
    if (!song.duration) return;

    const progressPercent = (song.currentTime / song.duration) * 100;
    currentProgress.style.width = `${progressPercent}%`;
});
song.addEventListener('loadedmetadata', () => {
    durationEl.innerText = formatTime(song.duration);
});


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
    }
];

let isPlaying = false;
let currentSong = 0;
let loaded = false;

function playSong() {
    const icon = playBtn.querySelector('i');

    songName.innerText = songs[currentSong].name;
    cover.src = songs[currentSong].cover;

    if (!isPlaying) {
        song.src = songs[currentSong].file;

        song.load(); // 🔑 força carregar

        song.play()
            .then(() => {
                isPlaying = true;
                icon.classList.remove('bi-play-circle-fill');
                icon.classList.add('bi-pause-circle-fill');
            })
            .catch(err => {
                console.log('Erro ao tocar:', err);
            });

    } else {
        song.pause();
        isPlaying = false;
        icon.classList.remove('bi-pause-circle-fill');
        icon.classList.add('bi-play-circle-fill');
    }
}


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


function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loaded = false;

    song.pause();
    song.currentTime = 0;

    const icon = playBtn.querySelector('i');
    icon.classList.remove('bi-pause-circle-fill');
    icon.classList.add('bi-play-circle-fill');

    playSong();
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

song.addEventListener('timeupdate', () => {
    if (!song.duration) return;

    const progressPercent = (song.currentTime / song.duration) * 100;
    currentProgress.style.width = `${progressPercent}%`;

    currentTimeEl.innerText = formatTime(song.currentTime);
});


progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;

    const duration = song.duration;
    song.currentTime = (clickX / width) * duration;
});
