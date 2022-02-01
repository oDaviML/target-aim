const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    height: 720,
    backgroundColor: '#a1a1a1',
    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
        }
    }
};

const game = new Phaser.Game(config);

let inimigo, spawnAllowed = true, sangue, inimigoMax = 49;
let timedEvent, timedEventTempo, comecar, click;

let inimigosRestantes, inimigosRestantesTexto;
let totalDeTiros = 0, totalDeTirosTexto;
let totalDeInimigos = 50, totalDeInimigosTexto;

let sequencia = 0, sequencia_copia = 0;
let pontuacao = 0, pontuacaoTexto;
let acertos = 0, erros = 0;


function preload() {

    this.load.image('zumbi', './assets/zumbi.png');
    this.load.audio('audio-acerto', './assets/audio/acerto.mp3');
    this.load.audio('audio-erro', './assets/audio/erro.wav');
    this.load.image('sangue', './assets/blood.png');

}

function create() {
    
    this.input.setDefaultCursor('url(./assets/Aim.cur), pointer');
    
    timedEvent = this.time.addEvent({ delay: 800, callback: spawnar, callbackScope: this, repeat: inimigoMax });

    this.initialTime = 0
    timedEventTempo = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

    inimigosRestantes = inimigoMax + 1;
    inimigosRestantesTexto = this.add.text(10, 10, '', { font: '30px calibri', fill: '#000000' });
    inimigosRestantesTexto.setTintFill(0xF90716, 0xFF5403, 0xFFCA03, 0xFFF323);
    
    let erro = this.sound.add('audio-erro', {volume: 0.2});

    this.input.on('pointerdown', function (pointer) {
        if (pointer.leftButtonDown()) {
            totalDeTiros++;
            erro.play();
            erros++;
            pontuacao -= 50;
            acertos--;
            sequencia = 0;
        }
    }, this);
}


function update() {
    inimigosRestantesTexto.setText('Inimigos Restantes: ' + inimigosRestantes);

    if (inimigosRestantes == 0 ) {
        $('#acertos').html(`${acertos}`);
        $('#erros').html(`${erros}`);
        $('#pontuacao').html(`${pontuacao}`);

        localStorage.setItem('acertosLS', acertos);
        localStorage.setItem('errosLS', erros);
        localStorage.setItem('pontuacaoLS', pontuacao);
        localStorage.setItem('segundos', this.initialTime);
        localStorage.setItem('sequencia', sequencia_copia);

        window.location.href = './index.html';
    }
}


function spawnar() {

    let acerto = this.sound.add('audio-acerto', {volume: 0.2});
    let x = Phaser.Math.Between(200, 1100);
    let y = Phaser.Math.Between(150, 700);

    /*
    sombra = this.add.image(x + 2, y + 2, 'zumbi');
    sombra.tint = 0x000000;
    sombra.alpha = 0.6;
    */

    inimigo = this.add.image(x, y, 'zumbi');
    inimigo.setInteractive();

    inimigo.on('pointerdown', function (pointer){
        
        this.destroy();
        acerto.play();
        inimigosRestantes--;
        totalDeTiros++;
        acertos++;
        pontuacao += 100;

        sequencia++;
        if (sequencia > sequencia_copia) {
            sequencia_copia = sequencia;
        }
        console.log("sequencia", sequencia);
        console.log ("sequencia copia", sequencia_copia);
    });
}

function onEvent ()
{
    this.initialTime += 1;
}
