var Dots = function(game) {
  this.game = game;

  this.boardWidth = 8;
  this.boardHeight = 7;

  this.board = [];
  this.idCount = 0;
  this.selected = null;
  this.scoreList = [];
  this.score = 0;
};


Dots.prototype = {
  create: function() {
    var circSize = 42;
    this.circlebmd = this.game.add.bitmapData(circSize, circSize);
    this.circlebmd.circle(circSize/2,circSize/2,circSize/2,'#FFFFFF');

    this.dots = this.game.add.group();
    this.dots.createMultiple(64, this.circlebmd);
    this.dots.setAll('anchor.x', 0.5);
    this.dots.setAll('anchor.y', 0.5);

    this.linebmd = this.game.add.bitmapData(800, 600);
    this.linebmd.ctx.lineWidth = "4";
    this.linebmd.ctx.strokeColor = "#000000";
    this.linebmd.ctx.stroke();

    this.guideLine = this.game.add.sprite(0, 0, this.linebmd);

    this.colors = [0xff0000, 0x0000ff, 0xffff00, 0x00ffff, 0x00ff00];
  },  
  initialBoard: function() {
    this.board = [];
    for(var i = 0;i < this.boardWidth; i++) {
      var column = [];
      for(var j = 0; j < this.boardHeight; j++) {
        var dot = this.addDot();
        column.push(dot);
      }
      this.board.push(column);
    }
    this.drawBoard();
    return this.board;
  },
  clickDot: function(dot) {
    this.selected = dot;
    this.scoreList.push(dot);
  },
  overDot: function(dot) {
    if (this.selected === null || !this.isAdjacent(this.selected, dot)) {return;} 

    if (this.scoreList[this.scoreList.length - 2] === dot) {
      // If you move your mouse back to you're previous match, deselect you're last match
      // This is so the player can choose a different path 
      this.scoreList.pop();
      this.selected = dot;
      this.looped = false;
    }else if (this.scoreList.indexOf(dot) > -1 && this.scoreList.length > 3 ) {
      // If the Item is in the list (but isn't the previous item) then you've made a loop
      this.looped = true;
    }else if (this.selected.tint === dot.tint ) {
      // console.log('over'+dot._id);
      this.looped = false;
      this.selected = dot; 
      if (this.scoreList.indexOf(dot) === -1) {
        this.scoreList.push(dot);
      }
    }

    this.linebmd.clear();
    this.linebmd.ctx.beginPath();

    // console.log('#'+("00000" + this.selected.tint.toString(16)).substr(-6));

    this.linebmd.ctx.strokeStyle = '#'+("00000" + this.selected.tint.toString(16)).substr(-6);
    this.linebmd.ctx.moveTo(this.scoreList[0].x, this.scoreList[0].y);

    for(var i = 0;i < this.scoreList.length-1;i++) {
      var next = this.scoreList[i+1];
      // console.log('x'+next.x+' y'+next.y);
      this.linebmd.ctx.lineTo(next.x, next.y);
    }
    if (this.looped === true) {
      this.linebmd.ctx.lineTo(dot.x, dot.y);
    }

    this.linebmd.ctx.lineWidth = 4;
    this.linebmd.ctx.stroke();
    this.linebmd.ctx.closePath();

  },
  upDot: function(dot) {
    this.linebmd.clear();

    if (this.looped === true) {
      this.looper();
    }
    this.score += this.scorePoints();
    this.scoreList = [];
    this.selected = null;
    this.drawBoard();
  },
  looper: function() {
     for(var i = 0; i < this.boardWidth; i++) {
      for(var j = 0; j < this.boardHeight; j++) {
        var dot = this.board[i][j];
        // console.log('color'+dot.tint);
        if (this.selected.tint === dot.tint) {
          this.scoreList.push(dot);
        }
      }
    }
    this.looped = false;
  },
  scorePoints: function() {
    if (this.scoreList.length === 1) {return 0;}
    var listIds = [];
    this.scoreList.forEach(function(dot) {
      listIds.push(dot._id);
    },this);

    for(var i = 0; i < this.boardWidth; i++) {
      for(var j = 0; j < this.boardHeight; j++) {
        var dot = this.board[i][j];
        if (listIds.indexOf(dot._id) > -1) {
          dot.kill();
          this.board[i].splice(j,1);
          this.board[i].push(this.addDot());
          j--;
        }
      }
    }
    return this.scoreList.length;
  },
  addDot: function() {
    var num = this.game.rnd.between(0,4);
    var dot = this.dots.getFirstDead();
    dot._id = this.idCount;
    dot.spriteNum = num;
    dot.tint = this.colors[num];
    dot.inputEnabled = true;
    dot.events.onInputDown.add(this.clickDot, this);
    dot.events.onInputUp.add(this.upDot, this);
    dot.events.onInputOver.add(this.overDot, this);
    dot.reset(this.game.world.centerX, -this.game.world.centerY);
    this.idCount++;
    return dot;
  },
  drawBoard: function() {
    // if (this.drawing === true) {return;}
    // this.drawing = true;

    for(var i = 0; i < this.boardWidth;i++) {
      for(var j = 0;j < this.boardHeight;j++) {
        var xpos = i*64 + 80;
        var ypos = 500 - j*64;
        var dot = this.board[i][j];
        dot.scale.x = 1;
        dot.scale.y = 1;
        if (dot.x !== xpos || dot.y !== ypos) {
          var t = this.game.add.tween(dot).to({x: xpos, y: ypos}, 300).start();
        }
      }
    }
    // this.t.onComplete.add(function() {
    //   this.drawing = false;
    // }, this);
  },
  getPosition: function(dot) {
    //Iterate through game board until the the dot is found
    //return it's position in the 2d array

    for(var i = 0;i < this.boardWidth;i++) {
      var j = this.board[i].indexOf(dot);
      if (j > -1) {
        return {i: i, j: j};
      }
    }
    return {};
  },
  isAdjacent: function(firstDot, secondDot) {
    var firstPos = this.getPosition(firstDot);
    var secondPos = this.getPosition(secondDot);

    if (
        (secondPos.i === firstPos.i) && 
        ((secondPos.j === (firstPos.j - 1)) || (secondPos.j === (firstPos.j + 1)))) {
      return true;
    }else if ((secondPos.j === firstPos.j) && 
        ((secondPos.i === (firstPos.i - 1)) || (secondPos.i === (firstPos.i + 1)))) {
      return true;
    }else {
      return false;
    }

  },

};
