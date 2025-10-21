console.log("Hello, World!");


function handlerDomContentLoaded() {
  //Le code du jeu
  console.log("Le jeu peut commencer !");


  // On récupère dans le dom les éléments dont on a besoin
  const elHighScore = document.getElementById("high-score");
  const elBtnResetScore = document.getElementById("btn-reset-score");
  const elCurrentScore = document.getElementById("current-score");
  const elDeck = document.getElementById("deck");
  const elFinalScore = document.getElementById("final-score");
  const elModalWin = document.getElementById("modal-win");
  const elBtnPlayAgain = document.getElementById("btn-play-again");


  /* On peut déclarer plusieurs constantes avezc la même "const"
  Ex: const TOTO = 5, TRUC = 10, MACHIN = 54
  On peu l'écrire de manière:
  const
    TOTO = 5,
    TRUC = 10,
    MACHIN = 54
  */

  //Variables de fonctionnement de jeu
  let arrNumCards = [];

  //Etape de démarrage
  // TODO : plus tard, récuperation et affichage high-score
  // TODO : implémenter les clicks sur les boutons fixes: elbtnResetScore, elbtnPlayAgain

  function getCardDom (numCard) {
    /* <div class="card">
        <div class="cardBack"></div>
        <div class="cardImage" style="background-image:url/[numCard].png"></div>
      </div> 
    */
    const elCard = document.createElement('div');
    elCard.classList.add('card');

    //On fabrique l'interieur de elCard
    let cardInnerHTML = '<div class="cardBack"></div>'; 
    cardInnerHTML += `<div class="cardImage" style="background-image:url(img/${numCard}.png);"></div>`;
    elCard.innerHTML = cardInnerHTML;

    //Event listener pour le clic de la carte
    elCard.addEventListener('click', function() {
      elCard.classList.toggle('flipped');
    })
      
  


    return elCard;
  }

  //Créer une fonction pour réinitialiser l'interface graphique 
  function initGame() {
    console.log("initialisation du jeu...");

    //remise à zero du current score
    elCurrentScore.textContent = 0;
    
    //remise à zero du final score
    elFinalScore.textContent = 'aucun';

    //vidange du deck
    elDeck.innerHTML = '';

    //génération aléatoire d'une liste de paires de cartes
    for (let i = 1; i <= 12; i++) {
      //on ajoute 2 fois i à la fin du tableau
      arrNumCards.push(i, i)
      console.log(arrNumCards);
    }

    //on melange les nombres de la liste
    shuffleArray(arrNumCards);
    console.log(arrNumCards);
    
    //on parcour la liste pour fabriquer les cartes et les afficher

    //Boucle pour parcourir un tableau => for (... ; ... ; ...)

    //for ( let i = 0; i < arrNumCards.length; i++ ) {console.log(arrNumCards[i]);}

    //Boucle pour parcourir nu tableau dans son itégralié => for(... in ...)
    //for( let i in arrNumCards) {console.log(arrNumCards[i]);}

    
    //Boucle pour parcourir nu tableau dans son itégralié => Array.forEach()
    //arrNumCards.forEach( numCard => { console.log(numCard); });
    
    //Boucle pour parcourir nu tableau dans son itégralié => for(... of ...)
    for( let numCard of arrNumCards) {
    const elCard = getCardDom(numCard);
    elDeck.append(elCard);
    }

  
  }

  //initialisation du jeu:

  //Créer les cartes

  //dispose les cartes de manières aléatoire sur le deck
  //quand le joueur cicks sur une carte elle se tertourne

  //quand il click sur une deuxieme elle se retourbe aussi 
  //si les deux cartes sont pareille elles restent retournées.
  //si elles sont différentes elle se retourne face caché.
  //A chaque fois que l'utilisateur retourne deux cartes current-score ++
  //quand le joueur a retourné toutes les cartes => sauvegarde son current-score, affiche la modale de victoire
  //envoie son current-score dans => high-score si high-score nul ou si current-score < high-score 
  //si le joueur clicks sur rejouer une nouvelle partie commence.


  //ecouteur de click su elBtnResetScore
  elBtnResetScore.addEventListener('click', function () {
    //TODO effacer le high score de la "memoire"

    //on reinitialise l'affichage
    elHighScore.textContent = '';
  });

  //ecouteur de click su elBtnPlayAgain
  elBtnPlayAgain.addEventListener('click', function () {
    // on cache la modale de victoire
    elModalWin.classList.add("hidden");
    // on reinitialise le jeu
    initGame();
  })

  // fonction utilitaire de mélange aléatoire d'un tableau
  function shuffleArray(arr) {
    //on récupere l'index max de arr
    let idMax = arrNumCards.length - 1;

    //Boucle de lecture inversé de arr
    while (idMax > 0) {
      //Génération d'un id aléatoire de 0 à (idMax -1)
      let idRandom = Math.floor(Math.random() * idMax);
      //On récupère les valeurs associer aux 2 indices
      let valueAtMax = arr[idMax];
      let ValueAtRandom = arr[idRandom];

      //on echange les place des deux valeurs dans le tableau
      arr[idMax] = ValueAtRandom;
      arr[idRandom] = valueAtMax;
      //forme courte, moins lisible 
      //on donne à gauche une liste de position dans le tableau et à droite la liste des valeurs dans le meme ordre à associer
      // *** [arr[idMax], arr[idRandom]] = [ValueAtRandom, valueAtMax]; ***

      //décrémente l'idMax avec lequel on travail 
      idMax --;
    }
  }
    initGame();
}

  // Mise en place de l'écouteur d'événement pour ne lancer le code qu'une fois le DOM entièrement chargé par le navigateur.
  document.addEventListener("DOMContentLoaded", handlerDomContentLoaded)