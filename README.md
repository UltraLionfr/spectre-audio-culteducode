# Présentation du fichier HTML principal
Le code HTML de la page définit un certain nombre de contrôles pour le lecteur audio, notamment :

   - Barre de navigation : Il y a une barre de navigation simple avec des liens vers l'Accueil et la page À propos.

   - Zone de dépôt : C'est une zone dans laquelle les utilisateurs peuvent glisser-déposer des fichiers audio pour les charger dans le lecteur audio. Il y a également un bouton d'entrée de fichier pour sélectionner les fichiers à charger.

   - Contrôles de lecture : Ce sont des boutons pour jouer, mettre en pause, arrêter et mettre en boucle l'audio. Il y a également un sélecteur de vitesse de lecture et une barre de volume.

   - Barre de progression : Cette barre affiche la progression de la lecture de l'audio.

   - Informations sur le fichier audio : Il y a des éléments pour afficher le nom du fichier audio chargé et le temps écoulé/la durée totale de l'audio.

   - Canvas pour visualiseur : Un élément de toile est utilisé pour afficher une visualisation du spectre audio.

   - Élément audio : C'est l'élément audio HTML qui est utilisé pour lire l'audio.

La page utilise le CSS de Bootstrap pour le style, et elle charge un script JavaScript personnalisé (`main.js`) pour gérer l'interaction de l'utilisateur avec le lecteur audio.

# Documentation du script JavaScript pour le lecteur audio et ses autres fonctions

## Variables globales

Le script utilise les variables globales suivantes :

```javascript
let audioCtx, source, analyser, canvas, canvasCtx, bufferLength, dataArray, dropzone, playBtn, pauseBtn, stopBtn, loopBtn;
```

Ces variables sont utilisées pour stocker des références aux éléments du DOM, à l'audio contexte, à l'analyseur audio, aux boutons de contrôle de lecture, etc.

# Fonctions

Le script implémente plusieurs fonctions, notamment :

`init()`
Cette fonction est appelée au chargement de la page pour initialiser le lecteur audio et ses composants associés, notamment la récupération des éléments du DOM, la création du contexte audio et de l'analyseur, et l'ajout d'écouteurs d'événements.

`handleDragOver(event)` et `handleDrop(event)`
Ces fonctions sont utilisées pour gérer les événements de glisser-déposer sur la zone de dépôt, permettant aux utilisateurs de charger des fichiers audio en les glissant-déposant.

`handleSpeedChange()`
Cette fonction est déclenchée lorsque l'utilisateur change la vitesse de lecture de l'audio.

`loadAudio(file)`
Cette fonction charge le fichier audio spécifié, l'affiche et met à jour l'affichage du temps.

`handlePlay(), handlePause(), handleStop()`
Ces fonctions sont utilisées pour gérer les actions de lecture, de pause et d'arrêt de l'audio.

`handleLoop()`
Cette fonction permet de gérer l'activation et la désactivation de la boucle de lecture.

`handleProgressBarClick(event)`
Cette fonction permet à l'utilisateur de modifier le point de lecture actuel en cliquant sur la barre de progression.

`enableButtons()`
Cette fonction active les boutons de contrôle de lecture.

`animate()`
Cette fonction est utilisée pour animer le spectre audio et mettre à jour le timer et la barre de progression.

### Police utilisée : HARDCOVER.ttf
