// ===== ELEMENTS =====
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBar = document.getElementById('progress-bar');
const currentSongName = document.getElementById('current-song');
const currentArtist = document.getElementById('current-artist');
const albumArt = document.getElementById('current-album-art');
const startBtn = document.getElementById('start-btn');

// ===== SONG LIST =====
const songs = [
    {name:"Jo Tum Mere Ho", artist:"Anuv Jain", src:"audio/audio1.mp3", img:"images/album1.jpg"},
    {name:"Wishes", artist:"Talwiinder", src:"audio/audio2.mp3", img:"images/talwiinder.jpeg"},
    {name:"Ehsaas", artist:"Faheem", src:"audio/audio3.mp3", img:"images/ehsaas.jpeg"},
    {name:"High On You", artist:"Jind Universe", src:"audio/audio4.mp3", img:"images/highonyou.jpg"},
    {name:"Boyfriend", artist:"Karan Aujla", src:"audio/audio5.mp3", img:"images/Boyfriend.jpg"},
    {name:"For A Reason", artist:"Karan Aujla", src:"audio/audio6.mp3", img:"images/For A Reason.jpg"},
    {name:"Humsafar", artist:"Sachet Tandon, Parampara Tandon, Irshad Kamil", src:"audio/audio7.mp3", img:"images/humsafar.jpg"},
    {name:"MF Gabhru", artist:"Karan Aujla", src:"audio/audio8.mp3", img:"images/MF Gabhru.jpg"},
    {name:"Jo Tere Sang", artist:"Mustafa Zahid", src:"audio/audio9.mp3", img:"images/Jo Tere Sang.jpg"},
    {name:"Kamlee", artist:"SARRB", src:"audio/audio10.mp3", img:"images/Kamlee.jpg"},
    {name:"Yeh Fitoor Mera", artist:"Amit Trivedi, Arjit Singh", src:"audio/audio11.mp3", img:"images/Yeh Fitoor Mera.jpg"}
];

let songIndex = 0;
let isPlaying = false;

// ===== FUNCTIONS =====
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

// ===== PROGRESS BAR =====
audio.addEventListener('timeupdate', ()=>{
    const progress = (audio.currentTime/audio.duration)*100;
    progressBar.value = progress || 0;
});
progressBar.addEventListener('input', ()=>{
    audio.currentTime=(progressBar.value/100)*audio.duration;
});
audio.addEventListener('ended', nextSong);

// ===== START BUTTON =====
startBtn.addEventListener('click', ()=>{
    document.querySelector('.album-section').scrollIntoView({behavior:'smooth'});
    if(!isPlaying) playPause();
});

// ===== EVENT LISTENERS =====
playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// ===== PLAYLIST FUNCTIONS =====
function togglePlaylist(header){
    const songsDiv = header.nextElementSibling;
    const icon = header.querySelector("i");
    if(songsDiv.style.maxHeight){ songsDiv.style.maxHeight=null; icon.style.transform="rotate(0deg)";}
    else{ songsDiv.style.maxHeight=songsDiv.scrollHeight+"px"; icon.style.transform="rotate(180deg)";}
}

function playSong(file,title,artist,img){
    audio.src=file; audio.play();
    currentSongName.textContent=title;
    currentArtist.textContent=artist;
    albumArt.src=img;
    const icon = playPauseBtn.querySelector("i");
    icon.classList.replace("fa-play","fa-pause");
    isPlaying=true;
}

// ===== INITIAL LOAD =====
loadSong(songs[songIndex]);


// ELEMENTS
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBar = document.getElementById('progress-bar');
const currentSongName = document.getElementById('current-song');
const currentArtist = document.getElementById('current-artist');
const albumArt = document.getElementById('current-album-art');
const startBtn = document.getElementById('start-btn');

// SONGS
const songs = [
  {name:"Jo Tum Mere Ho", artist:"Anuv Jain", src:"audio/audio1.mp3", img:"images/album1.jpg.jpeg"},
  {name:"Wishes", artist:"Talwiinder", src:"audio/audio2.mp3", img:"images/talwiinder.jpeg"},
  // Add other songs...
];

let songIndex = 0;
let isPlaying = false;

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

audio.addEventListener('timeupdate', ()=>{
  const progress = (audio.currentTime/audio.duration)*100;
  progressBar.value = progress || 0;
});

progressBar.addEventListener('input', ()=>{ audio.currentTime=(progressBar.value/100)*audio.duration; });
audio.addEventListener('ended', nextSong);

startBtn.addEventListener('click', ()=>{
  document.querySelector('.album-section').scrollIntoView({behavior:'smooth'});
  if(!isPlaying) playPause();
});

function playSong(file,title,artist,img){
  audio.src=file; audio.play();
  currentSongName.textContent=title;
  currentArtist.textContent=artist;
  albumArt.src=img;
  const icon = playPauseBtn.querySelector("i");
  icon.classList.replace("fa-play","fa-pause");
  isPlaying=true;
}

// INITIAL LOAD
loadSong(songs[songIndex]);
