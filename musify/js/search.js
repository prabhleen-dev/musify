// ELEMENTS
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBar = document.getElementById('progress-bar');
const currentSongName = document.getElementById('current-song');
const currentArtist = document.getElementById('current-artist');
const albumArt = document.getElementById('current-album-art');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

// SONG DATA
const songs = [
    {name:"Jo Tum Mere Ho", artist:"Anuv Jain", src:"audio/audio1.mp3", img:"images/album1.jpg"},
    {name:"Wishes", artist:"Talwiinder", src:"audio/audio2.mp3", img:"images/talwiinder.jpeg"},
    {name:"Ehsaas", artist:"Faheem", src:"audio/audio3.mp3", img:"images/ehsaas.jpeg"}
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

// PLAYER CONTROLS
playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// SEARCH FUNCTIONALITY
searchInput.addEventListener('input', ()=>{
    const query = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = "";

    const filtered = songs.filter(song=> song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query));
    filtered.forEach(song=>{
        const card = document.createElement('div');
        card.classList.add('result-card');
        card.innerHTML = `<img src="${song.img}" alt="${song.name}"><h4>${song.name}</h4><p>${song.artist}</p>`;
        card.addEventListener('click', ()=>{ loadSong(song); audio.play(); const icon=playPauseBtn.querySelector("i"); icon.classList.replace("fa-play","fa-pause"); isPlaying=true; });
        resultsContainer.appendChild(card);
    });

    if(filtered.length===0 && query.length>0){
        resultsContainer.innerHTML = "<p style='color:#ffccff; text-align:center; width:100%'>No results found</p>";
    }
});

// INITIAL LOAD
loadSong(songs[songIndex]);
