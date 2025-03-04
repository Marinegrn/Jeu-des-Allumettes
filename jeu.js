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
let joueurActuel = 1;
let nombreJoueurs = 2;

// Range minimum et maximum pour le nombre d'allumettes à retirer
allumettesInput.min = 1;
allumettesInput.max = 6;
        
// Étape 1: Fonction pour retirer des allumettes
function retirerAllumettes(nombre) {
    if (nombre >= 1 && nombre <= 6 && nombre <= nbAllumettes) {
        nbAllumettes -= nombre;
        return true;
    }
    return false;
};
        
// Fonction pour passer au joueur suivant
function joueurSuivant() {
    joueurActuel = joueurActuel % nombreJoueurs + 1;
    playerTurn.textContent = `Tour du Joueur ${joueurActuel}`;
};
        
// Fonction pour vérifier la victoire
function verifierVictoire() {
    if (nbAllumettes === 0) {
        playerTurn.style.display = 'none';
        winnerMessage.textContent = `Le Joueur ${joueurActuel} a gagné !`;
        winnerMessage.style.display = 'block';
        restartButton.style.display = 'inline-block';
        allumettesInput.disabled = true;
        removeButton.disabled = true;
        return true;
    }
    return false;
};
        
// Fonction pour afficher les allumettes
function afficherAllumettes() {
    allumettesContainer.innerHTML = '';

    for (let i = 0; i < nbAllumettes; i++) {
        const allumette = document.createElement('div');
        allumette.className = 'allumette';
        allumettesContainer.appendChild(allumette);
        }
    gameStatus.textContent = `Il reste ${nbAllumettes} allumette${nbAllumettes > 1 ? 's' : ''}`;
};
        
// Fonction pour initialiser le jeu
function initialiserJeu() {
    nbAllumettes = 50;
    joueurActuel = 1;

    playerTurn.textContent = `Tour du Joueur ${joueurActuel}`;
    playerTurn.style.display = 'block';
    winnerMessage.style.display = 'none';
    allumettesInput.disabled = false;
    removeButton.disabled = false;

    afficherAllumettes();
};
        
// Événements
startButton.addEventListener('click', () => {
    nombreJoueurs = parseInt(playerCountInput.value);

        if (nombreJoueurs < 2) {
            alert('Il faut au moins 2 joueurs !');
            return;
        }
    setupContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    initialiserJeu();
});
        
removeButton.addEventListener('click', () => {
     const nombreARetirer = parseInt(allumettesInput.value);

         if (retirerAllumettes(nombreARetirer)) {
            afficherAllumettes();
            if (!verifierVictoire()) {
                joueurSuivant();
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
        
