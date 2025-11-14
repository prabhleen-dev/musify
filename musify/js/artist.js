// ELEMENTS
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBar = document.getElementById('progress-bar');
const currentSongName = document.getElementById('current-song');
const currentArtist = document.getElementById('current-artist');
const albumArt = document.getElementById('current-album-art');

// SONG LIST
const songs = [
    {name:"Song One", artist:"Cherry Red", src:"audio/audio1.mp3", img:"images/artist1.jpg"},
    {name:"Song Two", artist:"Cherry Red", src:"audio/audio2.mp3", img:"images/artist1.jpg"}
];

let songIndex = 0;
let isPlaying = false;

// FUNCTIONS
function loadSong(song){
    currentSongName.textContent = song.name;
    currentArtist.textContent = song.artist;
    albumArt.src = song.img;
    audio.src = song.src;
}

function playPause(){
    const icon = playPauseBtn.querySelector("i");
    if(isPlaying){ audio.pause(); icon.classList.replace("fa-pause","fa-play"); isPlaying=false; }
    else{ audio.play(); icon.classList.replace("fa-play","fa-pause"); isPlaying=true; }
}

function nextSong(){ songIndex = (songIndex+1)%songs.length; loadSong(songs[songIndex]); audio.play(); isPlaying=true; playPauseBtn.querySelector("i").classList.replace("fa-play","fa-pause"); }
function prevSong(){ songIndex = (songIndex-1+songs.length)%songs.length; loadSong(songs[songIndex]); audio.play(); isPlaying=true; playPauseBtn.querySelector("i").classList.replace("fa-play","fa-pause"); }

// PROGRESS BAR
audio.addEventListener('timeupdate', ()=>{
    const progress = (audio.currentTime/audio.duration)*100;
    progressBar.value = progress || 0;
});
progressBar.addEventListener('input', ()=>{
    audio.currentTime = (progressBar.value/100)*audio.duration;
});
audio.addEventListener('ended', nextSong);

// INITIAL LOAD
loadSong(songs[songIndex]);

// PLAY TRACK FROM TOP TRACKS
function playSong(file,name,artist,img){
    audio.src=file; audio.play();
    currentSongName.textContent=name;
    currentArtist.textContent=artist;
    albumArt.src=img;
    const icon = playPauseBtn.querySelector("i");
    icon.classList.replace("fa-play","fa-pause");
    isPlaying=true;
}

// PLAYER CONTROLS
playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
