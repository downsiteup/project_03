// Enemies our player must avoid
var Enemy = function(x,y) {
// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
    this.x += 300*dt;
    if (this.x > 505){
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Actor = function(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Actor.prototype.update = function() {
//Look's up if the player get's in touch with any enemy
    for (var i in allEnemies){
        enemy = allEnemies[i];
        if (this.x < (enemy.x+60) && this.x > (enemy.x - 70) && this.y < (enemy.y+20) && this.y > (enemy.y - 20))
            {
//If it's the case, the player get's position
            this.x = 200;
            this.y = 300;
            }
        }
//If the player has passed without collision, he will be returned back to his position, and a new set of enemies will be produced
    if (this.y < 35){
            this.x = 200;
            this.y = 300;
            generateEnemies();
        }
};

//The player to be displayed
Actor.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The player to be moved
Actor.prototype.handleInput = function(key){
    var tileWidth = 101,
        tileHeight = 83;

    if(key === 'left' && this.x > 35){
        this.x -= tileWidth;
    }
    if(key === 'up' && this.y > 35){
        this.y -= tileHeight;
    }
    if(key === 'right' && this.x < 390){
        this.x += tileWidth;
    }
    if(key === 'down' && this.y < 355){
        this.y += tileHeight;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called actor
var allEnemies;
var actor;

//Set the sequence of the enemies
var generateEnemies = function(){
    allEnemies = [new Enemy(100*Math.random()*2, 50), new Enemy(200*Math.random()*2, 200), new Enemy(300*Math.random()*2, 50),
        new Enemy(400*Math.random()*2, 150)];
};

var init = function() {
    generateEnemies();
    actor = new Actor(200, 300);
};

init();

// This listens for key presses and sends the keys to your
// actor.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    actor.handleInput(allowedKeys[e.keyCode]);
});
