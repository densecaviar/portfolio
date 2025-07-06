console.log("Im alive");

const config = {
    type: Phaser.AUTO,
    width: 730,
    height: 1000,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // No gravity for top-down
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
    this.load.image('grass', 'assets/images/grass.jpg');
    this.load.image('centre', 'assets/images/centre.png'); // Load building
    this.load.spritesheet('dude',
        'assets/images/dude.jpg',
        { frameWidth: 64, frameHeight: 64 }
    );
}

function create() {
    this.add.image(350, 500, 'grass').setDisplaySize(game.config.width, game.config.height);

    // Add building (centre) in the middle of the map
    const building = this.physics.add.staticSprite(game.config.width / 2, game.config.height / 2, 'centre');
    building.setOrigin(0.5, 0.5);
    building.setScale(3); // Make the building 3 times bigger
    building.refreshBody(); // Update collision boundaries after scaling
    // Set a smaller collision box (80% of display size)
    const displayWidth = building.displayWidth;
    const displayHeight = building.displayHeight;
    building.body.setSize(displayWidth * 0.8, displayHeight * 0.8);
    building.body.setOffset(displayWidth * 0.1, displayHeight * 0.1);

    player = this.physics.add.sprite(100, 300, 'dude');
    player.setCollideWorldBounds(true);

    // Animations (reuse left/right/turn for now)
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 15 }),
        frameRate: 20
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 0 }], // Idle frame
        frameRate: 1
    })

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    // Enable collision between player and building
    this.physics.add.collider(player, building);

    // Detect overlap to show projects
    this.physics.add.overlap(player, building, () => {
        // Replace this with your own popup/modal logic
        alert('My Projects:\n- Project 1\n- Project 2\n- Project 3');
    }, null, this);
}

function update() {
    player.setVelocity(0);
    let moving = false;

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
        player.anims.play('left', true);
        moving = true;
    } 
    else if (cursors.right.isDown) {
        player.setVelocityX(200);
        player.anims.play('right', true);
        moving = true;
    }
    else if (cursors.up.isDown) {
        player.setVelocityY(-200);
        player.anims.play('up', true);
        moving = true;
    } 
    else if (cursors.down.isDown) {
        player.setVelocityY(200);
        player.anims.play('down', true);
        moving = true;
    }
    if (!moving) {
        player.anims.play('turn'); // Always show frame 0 when idle
    }
}