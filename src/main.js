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
        frames: this.anims.generateFrameNumbers('dude',{start: 4, end: 7}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 0}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();


    this.physics.add.collider(player, platforms);

    const projectArea = this.add.rectangle(300,500,150,100,0x0000FF);
    projectArea.setOrigin(0.5);
    this.add.text(projectArea.x, projectArea.y, 'My ML Project', {
        fontSize: '16px',
        fill : '#ffffff',
        align: 'center'
    }).setOrigin(0.5); // Center the text on the rectangle

}

//update() runs continuously and updates 
function update(){

}


