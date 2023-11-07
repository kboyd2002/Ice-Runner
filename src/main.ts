import Phaser from 'phaser'

var player;
var snowballs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

function preload()
{
    this.load.image('background', './src/assets/background.png');
    this.load.image('ground', './src/assets/platform.png');
    this.load.image('snowballs', './src/assets/snow.png');
    this.load.spritesheet('dude', './src/assets/Snowman.png', { frameWidth: 64, frameHeight: 96 });
}

function create()
{
    this.cameras.main.setBounds(0, 0, 2000, 1080 * 2);
    this.physics.world.setBounds(0, 0, 2000, 1080 * 2);

    this.add.image(0, 0, 'background').setOrigin(0);
    this.add.image(800, 0, 'background').setOrigin(0).setFlipX(true);
    this.add.image(1600, 0, 'background').setOrigin(0).setFlipX(true);
 

    cursors = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 625, 'ground').setScale(2).refreshBody();
    platforms.create(1200, 625, 'ground').setScale(2).refreshBody();
    platforms.create(2000, 625, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(1800, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(1400, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player, true, 0.05, 0.05, 0, 200); // Updated this line

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    snowballs = this.physics.add.group({
        key: 'snowballs',
        repeat: 30,
        setXY: { x: 15, y: 0, stepX: 70 }
    });

    snowballs.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(snowballs, platforms);
    this.physics.add.overlap(player, snowballs, collectSnowballs, null, this);
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}

function update()
{
    if (gameOver) {
        return;
    }

    if (cursors.left.isDown) {

        player.setVelocityX(-160);

    } else if (cursors.right.isDown) {
        
        player.setVelocityX(160);

    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {

        player.setVelocityY(-360);

    }
}

function collectSnowballs(player, snowballs)
{
    snowballs.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}

var TimerEvent = new Class({
    initialize:
        function TimerEvent(config) {
            this.delay = 3000;
            this.startAt = 0;
            this.repeat = 120000;
            this.loop = false;
        },

    getElapsedSeconds: function () {
        return this.elapsed * 0.001
    }
})


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }

};

var game = new Phaser.Game(config);
