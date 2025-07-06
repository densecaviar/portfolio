console.log("Im alive");

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
let platforms;
let cursors;

function preload() {
    // --- Changes for new image dimensions and types ---

    // Sky image: Now sky.jpg as per your input
    // The original sky image was 736x1104, so it's taller than the game canvas.
    // We'll scale it to fill the entire game width/height in create().
    this.load.image('sky', 'assets/images/sky.jpg');

    // Ground image: Now ground.png as per your input
    // The original ground image was 1350x860. It's very large.
    // We'll scale it down to fit the game width and a reasonable platform height in create().
    this.load.image('ground', 'assets/images/ground.png');

    // Dude spritesheet: Now dude.jpg (assuming you have this file)
    // IMPORTANT: Spritesheets typically need transparency, which JPGs don't support.
    // If your character has a background color that you want to be transparent,
    // you might see a solid box around them. A .PNG file with transparency is ideal for spritesheets.
    // However, for loading, we'll use dude.jpg as per your specified path.
    // New frame dimensions: 256x256 pixels, 16 images (4x4 grid) => 256/4 = 64 pixels per frame.
    this.load.spritesheet('dude',
        'assets/images/dude.jpg', // Changed to .jpg as per your input
        { frameWidth: 64, frameHeight: 64 } // Corrected frame dimensions based on 256x256 / 4 images
    );
}

function create() {
    // Add the sky background
    // We use .setDisplaySize() to stretch the sky image to fit the 800x600 game canvas.
    this.add.image(400, 300, 'sky').setDisplaySize(game.config.width, game.config.height);

    // Create platforms group
    platforms = this.physics.add.staticGroup();

    // Create the continuous ground platform
    // We position it at y=550 (center) with a display height of 100 pixels,
    // making its bottom edge at 550 + 50 = 600 (the bottom of the screen).
    // We stretch its display width to fill the entire game width (800 pixels).
    platforms.create(400, 550, 'ground').setDisplaySize(game.config.width, 100).refreshBody();

    // Create the player sprite
    // Adjusted initial Y position to account for the ground being slightly higher (y=550 instead of 568)
    player = this.physics.add.sprite(100, 400, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // --- Corrected Player Animations based on 4x4 grid (0-indexed frames) ---
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }), // Second row (frames 4, 5, 6, 7)
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 0 }], // Assuming frame 0 is the idle/front-facing pose (first frame)
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }), // Third row (frames 8, 9, 10, 11)
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

    const projectArea = this.add.rectangle(300, 500, 150, 100, 0x0000FF);
    projectArea.setOrigin(0.5);
    this.add.text(projectArea.x, projectArea.y, 'My ML Project', {
        fontSize: '16px',
        fill: '#ffffff',
        align: 'center'
    }).setOrigin(0.5);
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}