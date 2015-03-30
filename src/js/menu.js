/*global Game*/
Game.Menu = function(game){
  this.game = game;
};

Game.Menu.prototype =  {
    create: function() {

        this.game.physics.startSystem(Phaser.ARCADE);
        this.game.world.setBounds(0, 0 ,800 ,600);
        this.game.stage.backgroundColor = '#000';

        this.game.load.audio('con1', 'assets/audio/con1.wav');

        this.colors = [0xff0000, 0x0000ff, 0xffff00, 0x00ffff, 0x00ff00];

        var circSize = 42;
        this.circlebmd = this.game.add.bitmapData(circSize, circSize);
        this.circlebmd.circle(circSize/2,circSize/2,circSize/2,'#FFFFFF');

        this.stars = this.game.add.group();
        this.stars.enableBody = true;
        this.stars.physicsBodyType = Phaser.Physics.ARCADE;
        this.stars.setAll('checkWorldBounds', true);
        this.stars.setAll('outOfBoundsKill', true);

        for(var i = 0; i < 512; i++) {
          this.starFieldSetup();
        }

        this.connectText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY-200, 'arcade',"Connect", 64);
        this.connectText.align = 'center';
        this.connectText.updateText();
        this.connectText.x = this.game.world.centerX - (this.connectText.textWidth * 0.5);
        this.connectText.tint = 0xff0000;
        
        this.theText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY-100, 'arcade',"The", 64);
        this.theText.align = 'center';
        this.theText.updateText();
        this.theText.x = this.game.world.centerX - (this.theText.textWidth * 0.5);
        this.theText.tint = 0x00ffff;

        this.dotsText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY, 'arcade',"Dots", 64);
        this.dotsText.align = 'center';
        this.dotsText.updateText();
        this.dotsText.x = this.game.world.centerX - (this.dotsText.textWidth * 0.5);
        this.dotsText.tint = 0xffff00;

        this.instructions = this.game.add.sprite(Game.w/2+200,200,'instructions');
        this.instructions.scale.x = 0.5;
        this.instructions.scale.y = 0.5;

        // Start Message
        this.startText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY+100, 'arcade',"-click to start-", 64);
        this.startText.align = 'center';
        this.startText.updateText();
        this.startText.x = this.game.world.centerX - (this.startText.textWidth * 0.5);
        // this.startText.tint = 0x00ffff;
        this.startText.tint = 0x00ff00;

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

    update: function() {
      //Click to Start
      if (this.game.input.activePointer.isDown){
        this.game.sound.play('con1');
        this.game.state.start('Play');
      }
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

    }
};
