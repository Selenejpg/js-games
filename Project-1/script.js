let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
});
//targhettiziamo canvas uno richiamandolo tramite id
const canvas = document.getElementById('canvas1');
//diamo al canvas "getContext", funzione che permette di accedere ai tag per le funzioni 2d usate per disegni
const ctx = canvas.getContext('2d');

//diamo al canvas altezza e larghezza definita in modo da non creare distorsioni nell'immagine
//stesse dimensioni fisse vanno date allo style css
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//carichiamo la sprite del nostro doggo. Image function equivale ad un tag img
const playerImage = new Image();
playerImage.src = './assets/images/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

//let frameX = 0;
let frameY = 0;
//settiamo il frame di partenza a 0, incrementandolo possiamo passare a quello successivo
let gameFrame = 0;
//il valore che attribuiamo a stagger rallenta i frame di tot
const staggerFrames = 5;

const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7, 
    },
    {
        name: 'jump',
        frames: 7, 
    },
    {
        name: 'fall',
        frames: 7, 
    },
    {
        name: 'run',
        frames: 9, 
    },
    {
        name: 'dizzy',
        frames: 11, 
    },
    {
        name: 'sit',
        frames: 5, 
    },
    {
        name: 'roll',
        frames: 7, 
    },
    {
        name: 'bite',
        frames: 7, 
    },
    {
        name: 'ko',
        frames: 12, 
    },
    {
        name: 'gethit',
        frames: 4, 
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});

//animation loop
function animate() {
    //ripuliamo lo spazio del rettangolo con questa funzione. Bisogna sempre specificare 4 argomenti 
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //riempiamo il rettangolo con fillRect(). anche questa ha bisogno di 4 argomenti.
    // ? ctx.fillRect(x,50,100,100);

    //la condizione animerà il doggo ma meglio;
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    //animiamo in modo più controllato la nostra image. potremo aggiungere 3/5 o 9 argomenti qui in base al tipo di controllo che desideriamo. Sotto la reference con descrizione dei nove argomenti che è possibile inserire:
    //ctx.drawImage(playerImage, sourcex, sourcey, sourcewidth, sourceheight, destinationx, destinationy, destinationwidth, destinationheight))
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    
    //la condizione if animerà il nostro doggo;
    // if (gameFrame % staggerFrames == 0) {
    //     if (frameX < 6) frameX++;
    //     else frameX = 0;
    // }

    gameFrame++;

    //questa funzione richiamerà la funzione che gli passiamo, in questo caso la funzione che abbiamo creato, animate. se gli chiediamo di richiamare la funzione genitore, cioè la funzione che la contiene, questa la richiamerà all'infinito generando un loop!
    requestAnimationFrame(animate);
};
animate();