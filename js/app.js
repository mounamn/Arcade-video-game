// Parent Object
function Members(x, y, url) {
    'use strict';
    this.sprite = url; // loading the image
    this.x = x; // Sitting the Enemy initial x coordinate location
    this.y = y; // Sitting the Enemy initial y coordinate location
}


Members.prototype = {
    // Draw the enemy on the screen
    render: function() {
        'use strict';
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    update: function(dt) {
        'use strict';
        //speed of the enemies
        // the dt parameter will ensure the game runs at the same speed for all computers
        var speed = Math.floor(Math.random() * 450) * dt;
        this.x += speed;
    }

};

// Inheritance
function inherit(child, parent) {
    'use strict';
    child.prototype = Object.create(parent.prototype); //clone the prototype
}


// Enemies our player must avoid
function Enemy(x, y, url) {
    'use strict';
    url = 'images/enemy-bug.png';
    Members.call(this, x, y, url); // inherit attributes from Members
}

// Enemy inherited all the attributes and functions from Members
inherit(Enemy, Members);

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    'use strict';
    Members.prototype.update.call(this, dt);
    var canvasWidth = 606; //Canvas width
    // Not move off the screen
    if (this.x > canvasWidth) {
        this.x = Math.floor(Math.random() * 20);
        this.y = enemiesY[(Math.floor(Math.random() * 3))];
    }
    //enemies' collision with the player
    if (this.x < player.x + 50 && this.x + 50 > player.x && this.y < player.y + 50 && 50 + this.y > player.y) {
        player.reset(); //Player's return to the initial position
    }
};
//Player
function Player(x, y, url) {
    'use strict';
    url = 'images/char-boy.png';
    Members.call(this, x, y, url); // inherit attributes from Members
}

// Player inherited all the attributes and functions from Members
inherit(Player, Members);

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    'use strict';
    Members.prototype.update.call(enemy, dt);
};

// Move the player
Player.prototype.handleInput = function(allowedKeys) {
    'use strict';
    switch (allowedKeys) {

        case 'right': // Move the player to the right

            if (this.x < 400) { //No move off screen on the right side
                this.x += 100;
            }
            break;

        case 'left': // Move the player to the left

            if (this.x > 90) { //No move off screen on the left side
                this.x -= 100;
            }
            break;

        case 'up': // Move the player up

            if (this.y > 90) { //No move to the water
                this.y -= 90;
            } else {
                player.reset(); //Player's return to the initial position if he moved to the water
            }
            break;

        case 'down': // Move the player down

            if (this.y < 400) { //No move off screen on the bottom side
                this.y += 90;
            }
            break;
    }

};

//Player's return to the initial position
Player.prototype.reset = function() {
    'use strict';
    player.x = 202;
    player.y = 400;
};

//player's collision with the gem
Player.prototype.collision = function() {
    'use strict';
    if (this.x < gem.x + 50 && this.x + 50 > gem.x && this.y < gem.y + 50 && 50 + this.y > gem.y) {
        gem.x = gemX[(Math.floor(Math.random() * 5))]; //Random x coordinate of the gem
        gem.y = gemY[(Math.floor(Math.random() * 3))]; //Random y coordinate of the gem
    }
};

// Gem
function Gem(x, y, url) {
    'use strict';
    url = 'images/Gem-Orange.png';
    Members.call(this, x, y, url); // inherit attributes from Members
}

// Gem inherited all the attributes and functions from Members
inherit(Gem, Members);

// Update the gem's position
// Parameter: dt, a time delta between ticks
Gem.prototype.update = function(dt) {
    'use strict';
    Members.prototype.update.call(enemy, dt);
};


// Instantiate the objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(202, 400); //Instantiate player
var gem = new Gem(102, 145); //Instantiate the gem
var gemX = [0, 100, 200, 300, 400]; //Possible values of x of gem
var gemY = [60, 145, 230]; //Possible values of y of gem
var enemiesY = [60, 145, 230]; //Possible values of y of the enemies
var allEnemies = [];
var enemy;

// Instantiate the enemies
for (var i = 0; i <= enemiesY.length; i++) {
    enemy = new Enemy(0, enemiesY[i]);
    allEnemies.push(enemy);
};

// This listens for key presses and sends the keys to my Player.handleInput() method
document.addEventListener('keyup', function(e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
