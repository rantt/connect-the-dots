/*
  ScreenShake from jpdev's post @ http://www.html5gamedevs.com/topic/3403-shake-effect/
  Put it in a plugin.
*/

Phaser.Plugin.ScreenShake = function(game, parent) {
  Phaser.Plugin.call(this, game, parent);
  this.shakeWorld = 0;
};

Phaser.Plugin.ScreenShake.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.ScreenShake.prototype.constructor = Phaser.Plugin.ScreenShake;

Phaser.Plugin.ScreenShake.prototype.start = function(count, x, y) {
  this.x = typeof x !== 'undefined' ? x : 20;
  this.y = typeof y !== 'undefined' ? y : 20;

  this.shakeWorld = count;
  console.log(this.shakeWorld);
};

Phaser.Plugin.ScreenShake.prototype.postUpdate = function() {
    if (this.shakeWorld > 0) {
       // var rand1 = this.game.rnd.integerInRange(-20,20);
       // var rand2 = this.game.rnd.integerInRange(-20,20);

      var rand1 = this.game.rnd.integerInRange(-this.x,this.x);
      var rand2 = this.game.rnd.integerInRange(-this.y,this.y);

      this.game.world.setBounds(rand1, rand2, this.game.width + rand1, this.game.height + rand2);
      this.shakeWorld--;

      //Normalize After the Shake
      if (this.shakeWorld == 0) {
          this.game.world.setBounds(0, 0, this.game.width,this.game.height);
      }
    }

};
