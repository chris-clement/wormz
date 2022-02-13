// Moved to a models folder for now not sure where it should be housed
const MAXMOVES = 5;
class Game {
  constructor({p: p, imgs: imgs, matter: matter, ground: ground, worm: worm}) {
    this.engine = matter.Engine.create();
    this.world = this.engine.world;
    this.bullets = [];
    this.ground = new ground({x: p.width/2, y: p.height-20, w: p.width, h: 180, world: this.world, matter: matter})
    this.worm = new worm({x: (p.windowWidth/10)*2, y: p.windowHeight - 100, options: "wormOne", img: imgs[0], matter: matter});
    this.worm2 = new worm({x: (p.windowWidth/10)*8, y: p.windowHeight - 100, options: "wormTwo", img: imgs[1], matter: matter});
    matter.World.add(this.world, [this.worm.body,this.worm2.body]);
    this.mode = "start";
    this.player1Turn = true;
    this.moveLimit = MAXMOVES;
    this.moveCount = 0;
  }

  changePlayerTurn = () => {
    console.log('player turn changed')
    this.resetMoveLimit();
    this.player1Turn = !this.player1Turn;
  }

  resetMoveLimit = () => {
    console.log(this.moveCount)
    this.moveCount = 0;}
}

module.exports = Game;

