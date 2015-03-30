/*global Game*/

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */


Game.Outro = function(game) {
  this.game = game;
};

Game.Outro.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.ARCADE);
    this.highestScore = JSON.parse(localStorage.getItem('dotsHighestScore'));

    this.game.world.setBounds(0, 0 ,800 ,600);
    this.game.stage.backgroundColor = '#000';

    var circSize = 42;
    this.circlebmd = this.game.add.bitmapData(circSize, circSize);
    this.circlebmd.circle(circSize/2,circSize/2,circSize/2,'#FFFFFF');


    this.colors = [0xff0000, 0x0000ff, 0xffff00, 0x00ffff, 0x00ff00];

    //Setup WASD and extra keys
    wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

    this.MAX_DEPTH = 800;

    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    this.stars.physicsBodyType = Phaser.Physics.ARCADE;
    this.stars.setAll('checkWorldBounds', true);
    this.stars.setAll('outOfBoundsKill', true);

    for(var i = 0; i < 512; i++) {
      this.starFieldSetup();
    }


    this.movesText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY-200, 'minecraftia','In Twenty Moves...', 32);
    this.movesText.align = 'center';
    this.movesText.updateText();
    this.movesText.x = this.game.world.centerX - (this.movesText.textWidth * 0.5);


    this.scoreText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY-100, 'minecraftia','Your Score: '+Game.score, 32);
    this.scoreText.align = 'center';
    this.scoreText.updateText();
    this.scoreText.x = this.game.world.centerX - (this.scoreText.textWidth * 0.5);

    this.highText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY, 'minecraftia','Your Highest Score: '+this.highestScore, 32);
    this.highText.align = 'center';
    this.highText.updateText();
    this.highText.x = this.game.world.centerX - (this.highText.textWidth * 0.5);

    this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.fixedToCamera = true;

    this.clickHereButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'clickHere', function() {
        this.game.state.start('Play');  
    }, this);
    this.clickHereButton.anchor.set(0.5);
    this.clickHereButton.fixedToCamera = true;


  },
  starFieldSetup: function() {
    var xpos = this.game.rnd.between(0, 800);
    var ypos = this.game.rnd.between(0, 600);
    var scale = this.game.rnd.between(1,5)/10;

    var star = this.stars.getFirstExists(false);

    if (star === null) {
      // star = this.stars.create(xpos, ypos, 'star');  
      // star = this.stars.create(xpos, ypos, this.squarebmd);  
      star = this.stars.create(xpos, ypos, this.circlebmd);  
      // star.z = this.game.rnd.between(1, this.MAX_DEPTH);
      star.z = 0;
    }else {
      // console.log('trying');
      xpos = xpos;
      ypos = ypos;
      star.reset(xpos, ypos);
      star.z = 0;
    }
    star.scale.x = star.z/800;
    star.scale.y = star.z/800;
    star.tint = this.colors[this.game.rnd.between(0,4)]; 
    star.checkWorldBounds = true;
    star.outOfBoundsKill = true;
    
    star.rotation = this.game.physics.arcade.angleToXY(star, this.game.world.centerX, this.game.world.centerY);
      
  },
  twitter: function() {
    window.open('http://twitter.com/share?text=My+best+score+is+'+this.highestScore+'+playing+Connect+The+Dots+See+if+you+can+beat+it.+at&via=rantt_&url=http://www.divideby5.com/games/ctd/&hashtags=ConnectTheDots,1GAM', '_blank');
  },

  update: function() {

   this.stars.forEach(function(star) {

     if (star.alive) {
      star.z += 1;

      star.scale.x = star.z/800;
      star.scale.y = star.z/800;
      
      var warpSpeed = this.game.rnd.between(-100,-200);
      this.game.physics.arcade.velocityFromRotation(star.rotation, warpSpeed, star.body.velocity);
     }else {
       this.starFieldSetup();
     }
   },this); 



  },

};
