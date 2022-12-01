const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 650;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect(); //restituisce un oggetto, restituendo informazioni sulla sua dimensione e posizione in riferimento alla viewport

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'assets/boom.png'
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = 'assets/snd_chicksword_anger_shoot.ogg';
    }
    update() {
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if (this.timer % 10 === 0) {
            this.frame++;
        }
    }
    draw() {
        //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        //3/6/9 argomenti. il primo è l'immagine che vogliamo disegnare nel canvas. poi x, y altezza e larghezza dell'area che vuoi ritagliare dallo sheet. poi destination x, y, width e height. ovvero coordinate che indicano dove vuoi posizionarlo con x e y e che altezza e larghezza deve avere
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width/2, 0 - this.height/2, this.width, this.height)
        ctx.restore();
    }
}

//al click appaiono quadrati sotto il mouse
// window.addEventListener('click', function(e) {
//     ctx.fillStyle = 'lavender';
//     ctx.fillRect(e.x - canvasPosition.left -25, e.y - canvasPosition.top -25, 50, 50);
// });


//mousemove event, letteralmente segue il mouse quindi puoi crearci delle scie
window.addEventListener('click', function(e) {
    createAnimation(e);
});

function createAnimation(e){
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
};
animate();