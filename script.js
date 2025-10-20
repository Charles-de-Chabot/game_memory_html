console.log("Hello, World!");
/* <div class="card">
        <div class="cardBack"></div>
        <div class="cardImage" style="background-image:url(img/12.png)"></div>
      </div> */

      function handlerDomContentLoaded() {
        //Le code du jeu
        console.log("Le jeu peut commencer !");
        
      }
// Mise en place de l'écouteur d'événement pour ne lancer le code qu'une fois le DOM entièrement chargé par le navigateur.
document.addEventListener("DOMContentLoaded", handlerDomContentLoaded);      
