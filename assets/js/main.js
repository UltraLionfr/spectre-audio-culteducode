// Variables globales
let audioCtx, source, analyser, canvas, canvasCtx, bufferLength, dataArray, dropzone, playBtn, pauseBtn, stopBtn, loopBtn;

// Fonction d'initialisation
function init() {
  // Récupérer les éléments du DOM
  canvas = document.getElementById('canvas');
  canvasCtx = canvas.getContext('2d');
  dropzone = document.getElementById('dropzone');
  playBtn = document.getElementById('play-btn');
  pauseBtn = document.getElementById('pause-btn');
  stopBtn = document.getElementById('stop-btn');
  loopBtn = document.getElementById('loop-btn');
  document.getElementById('progress-bar-container').addEventListener('click', handleProgressBarClick, false);
  document.getElementById('speed-select').addEventListener('change', handleSpeedChange, false);

  // Modifier la résolution du canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.5; // 50% de la hauteur de la fenêtre

  // Ajouter les écouteurs d'événements
  dropzone.addEventListener('dragover', handleDragOver, false);
  dropzone.addEventListener('drop', handleDrop, false);
  dropzone.addEventListener('dblclick', function () {
    document.getElementById('file-input').click();
  });
  playBtn.addEventListener('click', handlePlay, false);
  pauseBtn.addEventListener('click', handlePause, false);
  stopBtn.addEventListener('click', handleStop, false);
  loopBtn.addEventListener('click', handleLoop, false);

  // Ajouter un écouteur d'événements pour l'élément file-input
  document.getElementById('file-input').addEventListener('change', function () {
    let file = this.files[0];
    loadAudio(file);
  });

  // Récupérer l'élément input range du volume
const volumeRange = document.getElementById('volume-range');

// Ajouter un écouteur d'événements pour le changement de valeur du volume
volumeRange.addEventListener('input', function () {
  // Récupérer la valeur du volume et la convertir en nombre décimal
  let volume = parseFloat(volumeRange.value);

  // Modifier le volume de la source audio
  source.mediaElement.volume = volume;
});

  // Créer le contexte audio
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Créer l'analyseur audio
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;

  // Créer le tableau de données
  bufferLength = 64;
  dataArray = new Uint8Array(bufferLength);

  // Connecter l'analyseur audio
  source = audioCtx.createMediaElementSource(document.getElementById('audio'));
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  // Lancer l'animation
  requestAnimationFrame(animate);
}

// Fonction de gestion du dragover
function handleDragOver(event) {
  event.preventDefault();
}

// Fonction de gestion du drop
function handleDrop(event) {
  event.preventDefault();
  let file = event.dataTransfer.files[0];
  loadAudio(file);
}

// Fonction de gestion de la vitesse
function handleSpeedChange() {
  const speedSelect = document.getElementById('speed-select');
  const speedValue = parseFloat(speedSelect.value);
  document.getElementById('audio').playbackRate = speedValue;
}

// Fonction de chargement du fichier audio
function loadAudio(file) {
  let reader = new FileReader();
  reader.onload = function (event) {
    let audio = document.getElementById('audio');
    audio.src = event.target.result;
    enableButtons();
    // Afficher le nom du fichier
    let fileName = document.getElementById('file-name');
    fileName.textContent = file.name;
  };
  reader.readAsDataURL(file);

  // Ajouter un écouteur d'événements pour détecter lorsque les métadonnées sont chargées
  let audioElement = document.getElementById('audio');
  audioElement.addEventListener('loadedmetadata', function() {
    // Mettre à jour l'affichage du temps
    let timer = document.getElementById('timer');
    let currentTime = audioElement.currentTime;
    let duration = audioElement.duration;
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    timer.textContent =
      (currentMinutes < 10 ? '0' + currentMinutes : currentMinutes) +
      ':' +
      (currentSeconds < 10 ? '0' + currentSeconds : currentSeconds) +
      ' / ' +
      (durationMinutes < 10 ? '0' + durationMinutes : durationMinutes) +
      ':' +
      (durationSeconds < 10 ? '0' + durationSeconds : durationSeconds);
  });
}

  
  // Fonction de gestion du bouton Play
  function handlePlay() {
    document.getElementById('audio').play();
  }
  
  // Fonction de gestion du bouton Pause
  function handlePause() {
    document.getElementById('audio').pause();
  }
  
  // Fonction de gestion du bouton Stop
  function handleStop() {
    document.getElementById('audio').pause();
    document.getElementById('audio').currentTime = 0;
  }
  
// Fonction de gestion du bouton Loop
function handleLoop() {
    let loop = document.getElementById('audio').loop;
    document.getElementById('audio').loop = !loop;
    loopBtn.classList.toggle('active', !loop);
  
    // Mettre à jour le statut de la boucle
    let loopStatus = document.getElementById('loop-status');
    if (!loop) {
      loopStatus.textContent = "Activée";
      loopBtn.classList.add('active');
    } else {
      loopStatus.textContent = "Désactivée";
      loopBtn.classList.remove('active');
    }
  }

  function handleProgressBarClick(event) {
    let progressBarContainer = document.getElementById('progress-bar-container');
    let rect = progressBarContainer.getBoundingClientRect();
    let clickPosition = event.clientX - rect.left;
    let newProgress = clickPosition / rect.width;
    let audioElement = document.getElementById('audio');
    audioElement.currentTime = audioElement.duration * newProgress;
  }
  
  // Fonction d'activation des boutons
  function enableButtons() {
    playBtn.disabled = false;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
    loopBtn.disabled = false;
  }
  
// Fonction d'animation
function animate() {
    // Vérifier si la musique est en train de jouer
    if (!source || source.mediaElement.paused) {
      requestAnimationFrame(animate);
      return;
    }

    // Récupérer les données audio
    analyser.getByteFrequencyData(dataArray);

    // Mettre à jour le timer
    let timer = document.getElementById('timer');
    let audioElement = document.getElementById('audio');
    let currentTime = audioElement.currentTime;
    let duration = audioElement.duration;
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    timer.textContent =
      (currentMinutes < 10 ? '0' + currentMinutes : currentMinutes) +
      ':' +
      (currentSeconds < 10 ? '0' + currentSeconds : currentSeconds) +
      ' / ' +
      (durationMinutes < 10 ? '0' + durationMinutes : durationMinutes) +
      ':' +
      (durationSeconds < 10 ? '0' + durationSeconds : durationSeconds);

    // Effacer le canvas
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculer la moyenne des basses fréquences
    let bassSum = 0;
    let bassCount = 10;

    for (let i = 0; i < bassCount; i++) {
      bassSum += dataArray[i];
    }
    let bassAverage = bassSum / bassCount;

    let progressBar = document.getElementById('progress-bar');
let progress = (currentTime / duration) * 100;
progressBar.style.width = progress + '%';


// Dessiner le spectre audio
let barWidth = (canvas.width / bufferLength) * 1.5; // Diminuer cette valeur pour augmenter l'espacement entre les barres
let barHeight;
let x = 0;
for (let i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] / 2) * 2.5;

    // Créer un dégradé linéaire pour les barres du spectre audio
    let gradient = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
    // Ajouter les couleurs du dégradé en fonction de la fréquence
    gradient.addColorStop(0, "#f64f59");    // environ 0 Hz à 512 Hz
    gradient.addColorStop(0.2, "#ff8484");  // environ 512 Hz à 1024 Hz
    gradient.addColorStop(0.4, "#e8a87c");  // environ 1024 Hz à 1536 Hz
    gradient.addColorStop(0.6, "#ffda77");  // environ 1536 Hz à 2048 Hz
    gradient.addColorStop(0.8, "#01c5c4");  // environ 2048 Hz à 2560 Hz
    gradient.addColorStop(1, "#017b8f");    // environ 2560 Hz à 3072 Hz

    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 3; // Augmenter cette valeur pour augmenter l'espacement entre les barres
}

    // Ajouter l'effet de battement de cœur à la box-shadow du canvas
    let boxShadowIntensity = (bassAverage / 255) * 40; // Ajustez le multiplicateur (40) pour modifier l'intensité de l'ombre
    canvas.style.boxShadow = `0 0 ${boxShadowIntensity}px rgba(255, 0, 255)`;

    // Lancer l'animation
    requestAnimationFrame(animate);
}

// Lancer l'initialisation au chargement de la page
window.addEventListener('load', init);

// Redimensionner le canvas lorsque la fenêtre est redimensionnée
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.5; // 50% de la hauteur de la fenêtre
});
