// ELEMENTS
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBar = document.getElementById('progress-bar');
const currentSongName = document.getElementById('current-song');
const currentArtist = document.getElementById('current-artist');
const albumArt = document.getElementById('current-album-art');

// GENRE SONGS (example)
const songs = [
    {name:"Pop Song 1", artist:"Pop Artist", src:"audio/audio1.mp3", img:"images/genre_pop.jpg"},
    {name:"Rock Song 1", artist:"Rock Artist", src:"audio/audio2.mp3", img:"images/genre_rock.jpg"}
];

let songIndex = 0;
let isPlaying = false;

// LOAD SONG
function loadSong(song){
    currentSongName.textContent = song.name;
    currentArtist.textContent = song.artist;
    albumArt.src = song.img;
    audio.src = song.src;
}

// PLAY / PAUSE
function playPause(){
    const icon = playPauseBtn.querySelector("i");
    if(isPlaying){ audio.pause(); icon.classList.replace("fa-pause","fa-play"); isPlaying=false; }
    else{ audio.play(); icon.classList.replace("fa-play","fa-pause"); isPlaying=true; }
}

// NEXT / PREV SONG
function nextSong(){ songIndex=(songIndex+1)%songs.length; loadSong(songs[songIndex]); audio.play(); isPlaying=true; playPauseBtn.querySelector("i").classList.replace("fa-play","fa-pause"); }
function prevSong(){ songIndex=(songIndex-1+songs.length)%songs.length; loadSong(songs[songIndex]); audio.play(); isPlaying=true; playPauseBtn.querySelector("i").classList.replace("fa-play","fa-pause"); }

// PROGRESS BAR
audio.addEventListener('timeupdate', ()=>{
    const progress=(audio.currentTime/audio.duration)*100;
    progressBar.value=progress||0;
});
progressBar.addEventListener('input', ()=>{ audio.currentTime=(progressBar.value/100)*audio.duration; });
audio.addEventListener('ended', nextSong);

// INITIAL LOAD
loadSong(songs[songIndex]);

// PLAY SONG WHEN GENRE CLICKED
function playGenre(genre){
    const genreSong = songs.find(s=>s.name.toLowerCase().includes(genre.toLowerCase()));
    if(genreSong){ loadSong(genreSong); audio.play(); const icon=playPauseBtn.querySelector("i"); icon.classList.replace("fa-play","fa-pause"); isPlaying=true; }
}

// PLAYER CONTROLS
playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
