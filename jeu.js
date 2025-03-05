// Récupération des éléments du DOM
const setupContainer = document.getElementById('setup-container');
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-game');
const playerCountInput = document.getElementById('player-count');
const gameStatus = document.getElementById('game-status');
const playerTurn = document.getElementById('player-turn');
const allumettesContainer = document.getElementById('allumettes-container');
const allumettesInput = document.getElementById('allumettes-input');
const removeButton = document.getElementById('remove-button');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-game');
        
// Variables globales
let nbAllumettes = 50;
let currentPlayer = 1; 
let nbPlayers = 2; // nobmre minimum de joueurs requis pour pouvoir jouer, cf. ligne 84 à 87

// Range minimum et maximum du nombre d'allumettes à retirer
allumettesInput.min = 1;
allumettesInput.max = 6;

// Fonction pour initialiser le jeu
function gameStart() { 
    nbAllumettes = 50;
    currentPlayer = 1; 

    playerTurn.textContent = `Tour du Joueur ${currentPlayer}`;
    playerTurn.style.display = 'block';
    winnerMessage.style.display = 'none';
    allumettesInput.disabled = false;
    removeButton.disabled = false;

    displayMatches(); 
};

// Fonction pour afficher les allumettes
function displayMatches() { 
    allumettesContainer.innerHTML = '';

    // boucle pour créer 50 allumettes (interface graphique)
    for (let i = 0; i < nbAllumettes; i++) {
        const allumette = document.createElement('div');
        allumette.className = 'allumette';
        allumettesContainer.appendChild(allumette);
        }
    gameStatus.textContent = `Il reste ${nbAllumettes} allumette${nbAllumettes > 1 ? 's' : ''}`;
};
   
        
// Fonction pour retirer des allumettes
function pullMatches(number) { 
    if (number >= 1 && number <= 6 && number <= nbAllumettes) {
        nbAllumettes -= number; 
        return true;
    }
    return false;
};
        
// Fonction pour passer au joueur suivant
function nextPlayer() { 
    currentPlayer = currentPlayer % nbPlayers + 1; 
    playerTurn.textContent = `Tour du Joueur ${currentPlayer}`; 
};
        
// Fonction pour vérifier la victoire
function checkWin() { 
    if (nbAllumettes === 0) {
        playerTurn.style.display = 'none';
        winnerMessage.textContent = `Le Joueur ${currentPlayer} a gagné !`; 
        winnerMessage.style.display = 'block';
        restartButton.style.display = 'inline-block';
        allumettesInput.disabled = true;
        removeButton.disabled = true;
        return true;
    }
    return false;
};
        
             
// Configuration du mode multi-joueurs avant de commencer la partie / événement
startButton.addEventListener('click', () => {
    nbPlayers = parseInt(playerCountInput.value); 

        if (nbPlayers < 2) { 
            alert('Il faut au moins 2 joueurs !');
            return;
        }
    setupContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    gameStart(); 
});

// Événements boutons
removeButton.addEventListener('click', () => {
     const pullNb = parseInt(allumettesInput.value); 

         if (pullMatches(pullNb)) { 
            displayMatches(); 
            if (!checkWin()) { 
                nextPlayer(); 
            }
        } else {
            alert('Nombre invalide ! Vous devez retirer entre 1 et 6 allumettes, et pas plus que le nombre restant.');
        }
});
        
restartButton.addEventListener('click', () => {
    setupContainer.style.display = 'block';
    gameContainer.style.display = 'none';
    restartButton.style.display = 'none';
});
        
