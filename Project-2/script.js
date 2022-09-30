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

class Layer {

};

//modo per capire come funziona il meccanismo delle animazioni
// let x = 0;
// let x2 = 2400;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //modo per capire come funziona il meccanismo delle animazioni
    // ctx.drawImage(backgroundLayer4, x, 0);
    // ctx.drawImage(backgroundLayer4, x2, 0);
    
    // if (x < -2400) x = 2400 + x2 - gameSpeed;
    // else x -= gameSpeed;

    // if (x2 < -2400) x2 = 2400 + x - gameSpeed;
    // else x2 -= gameSpeed;

    requestAnimationFrame(animate);
};
animate();