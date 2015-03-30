/*global Game*/
Game.Menu = function(game){
  this.game = game;
};

Game.Menu.prototype =  {
    create: function() {

        this.colors = [0xff0000, 0x0000ff, 0xffff00, 0x00ffff, 0x00ff00];

        this.connectText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY-200, 'arcade',"Connect", 64);
        this.connectText.align = 'center';
        this.connectText.updateText();
        this.connectText.x = this.game.world.centerX - (this.connectText.textWidth * 0.5);
        this.connectText.tint = 0xff0000;
        
        this.theText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY-100, 'arcade',"The", 64);
        this.theText.align = 'center';
        this.theText.updateText();
        this.theText.x = this.game.world.centerX - (this.theText.textWidth * 0.5);
        this.theText.tint = 0x0000ff;

        this.dotsText = this.game.add.bitmapText(this.game.world.centerX , this.game.world.centerY, 'arcade',"Dots", 64);
        this.dotsText.align = 'center';
        this.dotsText.updateText();
        this.dotsText.x = this.game.world.centerX - (this.dotsText.textWidth * 0.5);
        this.dotsText.tint = 0xffff00;

        // this.title = this.game.add.sprite(Game.w/2,Game.h/2-100,'title');
        // this.title.anchor.setTo(0.5,0.5);
        //
        this.instructions = this.game.add.sprite(Game.w/2+200,200,'instructions');
        this.instructions.scale.x = 0.5;
        this.instructions.scale.y = 0.5;

        // Start Message
        // var text = this.game.add.text(Game.w/2, Game.h/2-50, '~click to start~', { font: '30px Helvetica', fill: '#000' });
        // text.anchor.setTo(0.5, 0.5);

    },
    update: function() {
      //Click to Start
      if (this.game.input.activePointer.isDown){
        this.game.state.start('Play');
      }
    }
};
