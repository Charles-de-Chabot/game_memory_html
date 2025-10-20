console.log("Hello, World!");
/* <div class="card">
        <div class="cardBack"></div>
        <div class="cardImage" style="background-image:url(img/12.png)"></div>
      </div> */

      function handlerDomContentLoaded() {
        //Le code du jeu
        console.log("Le jeu peut commencer !");


        // On récupère dans le dom les éléments dont on a besoin
          const elHighScore = document.getElementById("high-score");
          const elBtnResetScore = document.getElementById("btn_reset-score");
          const elCurrentScore = document.getElementById("current-score");
          const elDeck = document.getElementById("deck");
          const elFinalScore = document.getElementById("final-score");
          const elModalOverlay = document.querySelector("modal-win");
          const elBtnPlayAgain = document.getElementById("btn-play-again");
          
      }
// Mise en place de l'écouteur d'événement pour ne lancer le code qu'une fois le DOM entièrement chargé par le navigateur.
document.addEventListener("DOMContentLoaded", handlerDomContentLoaded);      

