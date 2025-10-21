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
  let arrNumCards = []; // Objet litteral qui contient les infos de l'état actuel de la partie
  //RÉGLAGE DU JEU
  const gameConfig = {
    distinctCards : 12, // Nombres d'images différetes du jeu
    timerDelay : 1000 //Durée d'affichage des paire non matché
  }

  //Objet litérale 
  const gameState = {
    arrFound: [],
    arrFlipped: [],
    canPlay: true,
    tries: 0,
    timer : null // timer de retournement des cartes non matché

  };


  //Etape de démarrage
  // TODO : plus tard, récuperation et affichage high-score
  // TODO : implémenter les clicks sur les boutons fixes: elbtnResetScore, elbtnPlayAgain

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

  function getCardDom(numCard) {
    /* <div class="card" data-num-card="[numCard]">
    <div class="cardBack"></div>
    <div class="cardImage" style="background-image:url/[numCard].png"></div>
    </div> 
    */
    const elCard = document.createElement('div');
    elCard.classList.add('card');
    elCard.dataset.numCard = numCard;
    

    //On fabrique l'interieur de elCard
    let cardInnerHTML = '<div class="cardBack"></div>';
    cardInnerHTML += `<div class="cardImage" style="background-image:url(img/${numCard}.png);"></div>`;
    elCard.innerHTMLfinal = cardInnerHTML;

    //Event listener pour le clic de la carte


     
    elCard.addEventListener('click', handlerCardClick);
    
    return elCard;
  }

  //Créer une fonction pour réinitialiser l'interface graphique 
  function initGame() {
    console.log("initialisation du jeu...");

    //remise à zero du current score
    gameState.tries = 0;
    elCurrentScore.textContent = gameState.tries;

    //remise à zero du final score
    elFinalScore.textContent = 'aucun';

    //remise à 0 de la liste des paires trouvées
    gameState.arrFound = [];

    // On vide la liste des carte
    arrNumCards = []; 

    //vidange du deck
    elDeck.innerHTML = '';

    //génération aléatoire d'une liste de paires de cartes
    for (let i = 1; i <= gameConfig.distinctCards; i++) {
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
    for (let numCard of arrNumCards) {
      const elCard = getCardDom(numCard);
      elDeck.append(elCard);
    }


  }

  // gestionnaire de clicks d'une carte
  function handlerCardClick() {
    //console.log("cliqué :", this.dataset.numCard);
    //technique Early Return: on sort de la fonction si on a plus besoin de la suite du code. 
    // On limite l'emboitement de plusieur indentations typiquement généré par des blocs if... else... les uns dans les autres
    //Si on a pas le droit de retourner les cartes OU si la carte cliqué est déja retourné
    if (!gameState.canPlay || this.classList.contains('flipped')) return; // Les accolades sont optionelles lorsque l'on n'a qu'une seul option
    //sinon on continue
    //console.log("cliqué: ", this.dataset.numCard);

    //On réinitialise le timer
    clearTimeout(gameState.timer);
    
    //on retourne la carte cliqué
    this.classList.add('flipped');

    //Si on n'a pas encore retourné de carte
    if (!gameState.arrFlipped.length > 0) {
      //on ajoute l'élément de la carte dnas arrFliped
      gameState.arrFlipped.push(this)
      //on sort
      return;
    
    }
    // sinon on continue 
    //  incrémenter
    gameState.tries ++;
    //on met a jour le score
    elCurrentScore.textContent = gameState.tries

    //On récupère lez numéro des deux cartes 
    const numCard1 = gameState.arrFlipped[0].dataset.numCard;
    const numCard2 = this.dataset.numCard;

    //si les deux cartes son identique
    if (numCard1 === numCard2) {
      //on ajoute le numéro de la carte dans la liste des cartes trouvé
      gameState.arrFound.push(numCard1);
      //On vide arrFlipped pour le prochaine tentative
      gameState.arrFlipped = [];

      //si on trouve les paires => on sort
      if(gameState.arrFound.length < gameConfig.distinctCards) return;

      //sinon gagné
      // On met à jour le score final
      elFinalScore.textContent = gameState.tries;
      //On affiche la modale
      elModalWin.classList.remove('hidden');
    }

    // on continue, on ajoute la carte actuelle à liste des cartes retournées
    gameState.arrFlipped.push(this);

    //On désactive la possibilité de jouer d'autres cartes
    gameState.canPlay = false;

    // on lance un timer qui remet les cartes en place au bout d'un temps défini
    // Dans une fonction => la convezntion dit que une argument seul qui est à coups sur "undefined doit être nommé "_"
    gameState.timer = setTimeout( _ => {
      //pour chaques carte retourné sur cette tentative
      for(let elCard of gameState.arrFlipped) {
        elCard.classList.remove('flipped');
      }
      //on réactive la possibilité de retourner une autre carte 
      gameState.canPlay = true;

      //on réinitialise la liste des cartes retourné pour une nouvelle rentative
      gameState.arrFlipped = [];

    }, gameConfig.timerDelay );


  }
  


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
      idMax--;
    }
  }
  initGame();
}

// Mise en place de l'écouteur d'événement pour ne lancer le code qu'une fois le DOM entièrement chargé par le navigateur.
document.addEventListener("DOMContentLoaded", handlerDomContentLoaded)