import Phaser from 'phaser'

var player;
var snowballs;
var igloo;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var gameOverText;

function preload()
{
    // preloads the background of the game
    this.load.image('background', './src/assets/background.png');
    // preloads the platforms/ground
    this.load.image('ground', './src/assets/platform.png');
    // preloads the snowballs
    this.load.image('snowballs', './src/assets/snow.png');
    // preloads the igloo
    this.load.image('igloo', './src/assets/igloo.png');
    // preloads the player and its spritesheet and sets his size
    this.load.spritesheet('dude', './src/assets/Snowman.png', { frameWidth: 64, frameHeight: 96 });
}

function create()
{
    // sets the boundary for camera and for the physical border for MC
    this.cameras.main.setBounds(0, 0, 5000, 600);
    this.physics.world.setBounds(0, 0, 5000, 600);
// add the winter background to keep repeating after the int starting page
    this.add.image(0, 0, 'background').setOrigin(0);
    this.add.image(800, 0, 'background').setOrigin(0).setFlipX(true);
    this.add.image(1600, 0, 'background').setOrigin(0).setFlipX(true);
    this.add.image(2400, 0, 'background').setOrigin(0).setFlipX(true);
    this.add.image(3200, 0, 'background').setOrigin(0).setFlipX(true);
    this.add.image(4000, 0, 'background').setOrigin(0).setFlipX(true);
    this.add.image(4800, 0, 'background').setOrigin(0).setFlipX(true);
    this.add.image(5000, 0, 'background').setOrigin(0).setFlipX(true);
// setting the cursors as the keys to controll and making platforms static unaffected by gravity
    cursors = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup();
// creating all the platforms
    platforms.create(400, 625, 'ground').setScale(2).refreshBody();
    platforms.create(1200, 625, 'ground').setScale(2).refreshBody();
    platforms.create(2000, 625, 'ground').setScale(2).refreshBody();
    platforms.create(2800, 625, 'ground').setScale(2).refreshBody();
    platforms.create(3600, 625, 'ground').setScale(2).refreshBody();
    platforms.create(4400, 625, 'ground').setScale(2).refreshBody();
    platforms.create(5000, 625, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(1800, 400, 'ground');
    platforms.create(3000, 400, 'ground');
    platforms.create(4500, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(1400, 250, 'ground');
    platforms.create(2600, 250, 'ground');
    platforms.create(3800, 250, 'ground');
    platforms.create(4800, 250, 'ground');
    platforms.create(750, 220, 'ground');
// creates the play and sets it so player cannot walk out of boundary and setting the camera to follow said player
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player, true, 0.05, 0.05, 0, 200);
// sets the player to have very little bounce to look more realistic, and sets the boolan for border colliders to true
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
// adds the functionality of the snowballs
    snowballs = this.physics.add.group({
        key: 'snowballs',
        repeat: 50,
        setXY: { x: 0, y: 0, stepX: 120 }
    });
// sets the bounce for all snowballs to be random between the two values 0.4,0.8
    snowballs.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
// adds the functionality for the endgame igloo
    igloo = this.physics.add.group({
        key: 'igloo',
        repeat: 0,
        setXY: { x: 4900, y: 0, stepX: 70 }
    });
        igloo.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
// adds colliders to the player/snowballs/ and igloo with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(snowballs, platforms);
    this.physics.add.overlap(player, snowballs, collectSnowballs, null, this);
    this.physics.add.collider(igloo, platforms);
    this.physics.add.overlap(player, igloo, endGame, null, this);
// scoretext adds a the text
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}

function update()
{
    if (gameOver) {
        return;
    }

// if left arrowkey is down the move at 160 to the left of the x-axis
    if (cursors.left.isDown) {

        player.setVelocityX(-160);

// else if right arrowkey is down the move at 160 to the right of the x-axis
    } else if (cursors.right.isDown) {

        player.setVelocityX(160);
// else do not move at all
    } else {
        player.setVelocityX(0);
    }
// if arrowkey is up and player is touching a platform go up on the Y-axis at 360 velo
    if (cursors.up.isDown && player.body.touching.down) {

        player.setVelocityY(-360);

    }
    // appends the score to the top of the screen and follows the player with the camera
   scoreText.setPosition(player.x, 16);
}
// sets physics for the igloo
function goIgloo(player, igloo)
{
    igloo.disableBody(true, true);
}
// game end function does alot of things, first it freezes/pauses all physics, then it tints our player red, and then it sets gameOver to true and appends the gameOverText and sets the color of text to white
   function endGame(player, igloo) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
    gameOverText = this.add.text(4300, 250, 'Game Over your final score:', { fontSize: '42px', fill: '#fffff' });
    gameOverText.setText('Game Over\n Refresh to play again\n your final score: ' + score);
    gameOverText.setColor('#FFF');

}
// collectSnowballs function sets physics for snowballs as well as gives the player a score of 10 points for each one collected and updates the scoreText in realtime with the built in setText method
function collectSnowballs(player, snowballs)
{
    snowballs.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
// the config for the game sets the view port and the type of physics and gravity
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    // these are the scenes and their keys, with them we can call on each scene/function individually
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
// sets the var of game to a new phaser game and calls the config above
var game = new Phaser.Game(config);
