/*global Game*/

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */

// // Choose Random integer in a range
// function rand (min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// var musicOn = true;


var wKey;
var aKey;
var sKey;
var dKey;

Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {
  preload: function() {
    this.dots = new Dots(this.game);
    this.dots.preload();
  },
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);
    this.game.stage.backgroundColor = '#000000';
    // this.game.stage.backgroundColor = '#dcdcdc';
    
    this.highestScore = JSON.parse(localStorage.getItem('dotsHighestScore'));

    this.game.add.sprite(0, 0, this.circlebmd);

    // // Music
    // this.music = this.game.add.sound('music');
    // this.music.volume = 0.5;
    // this.music.play('',0,1,true);

    //Setup WASD and extra keys
    wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    // muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);

    this.dots.create();
    this.dots.initialBoard();

    this.moveText = this.game.add.bitmapText(Game.w - 120 , 16, 'minecraftia','0/'+this.dots.moveLimit, 32);
    this.scoreText = this.game.add.bitmapText(20 , 16, 'minecraftia','Score: '+this.dots.score, 32);
  },

  update: function() {
    this.scoreText.setText('Score: ' + this.dots.score);
    this.moveText.setText(this.dots.moveCount+'/'+this.dots.moveLimit);

    if (this.dots.moveCount === this.dots.moveLimit) {
      Game.score = this.dots.score;
      if (this.dots.score > this.highestScore) {
        localStorage.setItem('dotsHighestScore', this.dots.score);
      }
      this.game.state.start('Outro');
    }

  },
  // toggleMute: function() {
  //   if (musicOn == true) {
  //     musicOn = false;
  //     this.music.volume = 0;
  //   }else {
  //     musicOn = true;
  //     this.music.volume = 0.5;
  //   }
  // },
  // render: function() {
  //   game.debug.text('Health: ' + tri.health, 32, 96);
  // }
  // render: function() {
  //   this.game.debug.text('this.selected ' + this.dots.selected, 32, 32);
  //   this.game.debug.text('this.scoreList ' + this.dots.scoreList, 32, 64);
  //   this.game.debug.text('this.score' + this.dots.score, 32, 96);
  // }

};
