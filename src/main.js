console.log("Im alive")

const config = {
type: Phaser.AUTO, // Automatically choose between WebGL and Canvas for optimized performance  
width: 800,
height: 600,
parent: 'game-container', // The ID of the HTML element where the game canvas will be injected

physics : {
    default: 'arcade', // Using Phaser's arcade physics engine
    arcade: {
        gravity: {y:300}, // apply a downward gravity of 300 pixels/second^2
        debug: false
    }

},
scene: {
    preload:  preload, // function to load assets before game starts
    create: create,    // function to set up the game world once assets are loaded
    update: update     // function that runs continuously, handling game logic and updates
}

};

const game = new Phaser.Game(config);
//preload() to load assets
function preload() {
    //load the sky background image 
this.load.image('sky','assets/images/sky.jpg');
    // load the ground platform image 

    this.load.image('platform','assets/images/ground.png');

    this.load.spritesheet('dude', 
    'assets/images/dude.jpg', 
    {frameWidth: 32, frameHeight: 48}
);

}
// create() to create game objects 
function create(){

    let player;
    let platforms;
    let cursors;

    this.add.image(400,300,'sky');

    platforms = this.physics.add.staticGroup();


    platforms.create(400,568,'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100,450, 'dude');
    
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });



}
//update() runs continuously and updates 
function update(){

}


