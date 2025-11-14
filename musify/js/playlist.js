const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const songTitle = document.getElementById('current-song');
const songArtist = document.getElementById('current-artist');
const albumArt = document.getElementById('current-album-art');

// ===== PLAYLIST DATA =====
const playlists = {
  chill: [
    {title:"Jo Tum Mere Ho", artist:"Anuv Jain", src:"audio/audio1.mp3", img:"images/album1.jpg"},
    {title:"Wishes", artist:"Talwiinder", src:"audio/audio2.mp3", img:"images/talwiinder.jpeg"}
  ],
  workout: [
    {title:"Ehsaas", artist:"Faheem", src:"audio/audio3.mp3", img:"images/ehsaas.jpeg"},
    {title:"High on You", artist:"Jind Universe", src:"audio/audio4.mp3", img:"images/highonyou.jpg"}
  ],
  romance: [
    {title:"Perfect", artist:"Ed Sheeran", src:"audio/perfect.mp3", img:"images/romance.jpg"},
    {title:"Raabta", artist:"Arijit Singh", src:"audio/raabta.mp3", img:"images/album1.jpg"}
  ]
};

let currentPlaylist = [];
let currentIndex = 0;
let isPlaying = false;

// ===== PLAYLIST OPEN FUNCTION =====
function openPlaylist(name) {
  const details = document.getElementById('playlist-details');
  const title = document.getElementById('playlist-title');
  const songList = document.getElementById('song-list');

  details.classList.remove('hidden');
  title.textContent = name.charAt(0).toUpperCase() + name.slice(1) + " Playlist";
  songList.innerHTML = "";

  currentPlaylist = playlists[name];
  currentPlaylist.forEach((song, index) => {
    const div = document.createElement('div');
    div.classList.add('song-item');
    div.textContent = `${song.title} - ${song.artist}`;
    div.onclick = () => playSong(index);
    songList.appendChild(div);
  });
}

// ===== LOAD + PLAY FUNCTION =====
function loadSong(song) {
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  albumArt.src = song.img;
  audio.src = song.src;
}

function playSong(index) {
  currentIndex = index;
  loadSong(currentPlaylist[currentIndex]);
  audio.play();
  isPlaying = true;
  playPauseBtn.querySelector("i").classList.replace("fa-play","fa-pause");
}

// ===== PLAYER CONTROLS =====
function playPause() {
  const icon = playPauseBtn.querySelector("i");
  if (isPlaying) {
    audio.pause();
    icon.classList.replace("fa-pause","fa-play");
    isPlaying = false;
  } else {
    audio.play();
    icon.classList.replace("fa-play","fa-pause");
    isPlaying = true;
  }
}
function nextSong() {
  currentIndex = (currentIndex + 1) % currentPlaylist.length;
  playSong(currentIndex);
}
function prevSong() {
  currentIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  playSong(currentIndex);
}

// ===== PROGRESS BAR =====
audio.addEventListener('timeupdate', ()=>{
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});
progressBar.addEventListener('input', ()=>{
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});
audio.addEventListener('ended', nextSong);

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
