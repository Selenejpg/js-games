const canvas = document.getElementById('canvas1');

//getContext può essere chiamato solo su una variabile che si riferisce ad un elemento canvas. Quando passo al suo interno un argomento, come 2D, creerà un'istanza di un oggetto all'interno di un api che contiene le proprietà e i draw in methods di cui abbiamo bisogno
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 600;

let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = './assets/backgroundLayers/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = './assets/backgroundLayers/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = './assets/backgroundLayers/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = './assets/backgroundLayers/layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = './assets/backgroundLayers/layer-5.png';


//quando pagina sarà completamente carica, solo allora esegui codice!
window.addEventListener('load', function() {
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function(e) {
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = gameSpeed;
    });

    class Layer {
        //oggetti simili, ma valori uguali. come risolvere?
        //ogni classe ha un method obbligatorio: constructor. quando la classe viene richiamata, constructor si attiverà, creerà un oggetto vuoto e assegnerà valori e proprietà a quest'oggetto vuoto. Basandoci sui blueprint, sappiamo che constructor si attiverà una sola volta per oggetto, ogni volta che la classe viene richiamata. constructor vuole due argomenti
        constructor(image, speedModifier) {
            //setta x a zero nel nuovo oggetto che stai creando
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 600;
            //crea una proprietà chiamata image in questo nuovo oggetto che stai creando ora e settalo ad image che stiamo passando come argomento del costruttore
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }


        //muove i layers orizzontalmente cambiando this.x e this.x2. resettarà i layers quando si muoveranno offscreen. Facciamo quuel che abbiamo fatto prima ma stavolta lo inseriamo all'interno di una classe riutilizzabile
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.x = Math.floor(this.x - this.speed);
        }

        //si occupa di prendere informazioni dall'oggetto layer e di disegnarle (draw) nel canvas. ogni volta che update runnerà per cambiare la posizione orizzontale di x, draw runnerà di nuovo per ridisegnare l'immagine e la sua posizione
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    };

    //modo per capire come funziona il meccanismo delle animazioni
    // let x = 0;
    // let x2 = 2400;

    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);

    const gameObjects = [layer1, layer2, layer3, layer4, layer5,]

    function animate(){
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        //modo per capire come funziona il meccanismo delle animazioni
        // ctx.drawImage(backgroundLayer4, x, 0);
        // ctx.drawImage(backgroundLayer4, x2, 0);

        // if (x < -2400) x = 2400 + x2 - gameSpeed;
        // else x -= gameSpeed;

        // if (x2 < -2400) x2 = 2400 + x - gameSpeed;
        // else x2 -= gameSpeed;

        gameObjects.forEach(object => {
            object.update();
            object.draw();
        });

        requestAnimationFrame(animate);
    };
    animate();
});

