import Phaser from 'phaser'

var player;
var snowballs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;


function preload() {
    this.load.image('background', './assets/background.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('snowballs', './assets/snow.png');
    this.load.image('bullet', './assets/snow.png');
    this.load.spritesheet('dude', './assets/Snowman.png', { frameWidth: 64, frameHeight: 96 });
}

function create() {
    this.physics.world.setBounds(0, 0, 5000, 600);

    this.add.image(400, 300, 'background');
    cursors = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 625, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    snowballs = this.physics.add.group({
        key: 'snowballs',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    snowballs.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(snowballs, platforms);
    this.physics.add.overlap(player, snowballs, collectSnowballs, null, this);

    this.timedEvent = this.time.delayedCall(3000, this.gameOver, [], this)
}


function update() {
    this.remainingTime = this.timedEvent.getRemainingSeconds();
    this.textTime.setText(`Remaining Time: ${Math.round(this.remainingTime).toString()}`);

    if (gameOver) {
        return;
    }
    {


        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);
        }
        else {
            player.setVelocityX(0);
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-360);
        }
    }
}

function collectSnowballs(player, snowballs) {
    snowballs.disableBody(true, true);

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
