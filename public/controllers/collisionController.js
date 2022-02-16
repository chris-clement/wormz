const Bullet = require('../entities/bullet')
const Explosion = require('../entities/explosion')
const Matter = require('matter-js');
const { gameScreen } = require('./screenController');

class CollisionController{  
  
  static findAndDestroyBullet = (pair, game) => {
    game.bulletExists = false
    if(pair.bodyA.label === "bullet") {
      Bullet.destroy(pair.bodyA, game);
    } else {
      Bullet.destroy(pair.bodyB, game);
    }
  }

  static isInCollision = (pair, label) => {
    return pair.bodyA.label === label || pair.bodyB.label === label
  }
  
  static findAndDamageWorm = (pair, game, sound) => {

    if (CollisionController.isInCollision(pair, "wormTwo")) {
      let bulletDamageValue = game.bullets[0].damage
      sound.play();
      game.worm2.reduceHP(bulletDamageValue);
      if (game.isWormDead()) {
        // game.worm2.setImageToDead();
        setTimeout(function() {game.setGameOver()}, 3000);
      }
      
    } else if (CollisionController.isInCollision(pair, "wormOne")) {
      let bulletDamageValue = game.bullets[0].damage
      sound.play();
      game.worm.reduceHP(bulletDamageValue);
      if (game.isWormDead()) {
        // game.worm.setImageToDead();
        setTimeout(function() {game.setGameOver()}, 3000);
      }
    }
  }

  static createExplosion = (pair,game, img) => {
    if(pair.bodyA.label === "bullet") {
      this.explosion = new Explosion({x: pair.bodyA.position.x, y: pair.bodyA.position.y , r: 120, game: game, img: img})
      game.explosions.push(this.explosion)
      CollisionController.destroyTerrain(this.explosion,game)
      CollisionController.findAndDestroyBullet(pair, game);
      Matter.World.remove(game.world, this.explosion.body);
      setTimeout(function(){game.explosions.pop();},500)
    } else if (pair.bodyB.label === "bullet") {
      this.explosion = new Explosion({x: pair.bodyB.position.x, y: pair.bodyB.position.y , r: 120, game: game, img: img})
      game.explosions.push(this.explosion)
      CollisionController.destroyTerrain(this.explosion,game)
      CollisionController.findAndDestroyBullet(pair, game);
      Matter.World.remove(game.world, this.explosion.body);
      setTimeout(function(){game.explosions.pop();},500)
    }
  }

  static destroyTerrain = (explosion,game) => {
    game.terrain.forEach ((piece, index) => {
      // Checks if the terrain is in a certain radius of the explosion and if so destroys it
      if ((Math.abs(piece.body.position.x - explosion.body.position.x) < 25) && (Math.abs(piece.body.position.y - explosion.body.position.y) < 25)) 
      {Matter.World.remove(game.world, piece.body);
        game.terrain.splice(index, 1)}
    })
  }

  static lavaCollision = (pair,game) => {
    if (CollisionController.isInCollision(pair, "wormTwo")) {
      game.worm2.reduceHP(50);
      if (game.isWormDead()) {
        setTimeout(function() {game.setGameOver()}, 700);
      }

    } else if (CollisionController.isInCollision(pair, "wormOne")) {
      game.worm.reduceHP(50);
      if (game.isWormDead()) {
        setTimeout(function() {game.setGameOver()}, 700);
      }
    }
  }
  
  static collision = (event, game, sound, img) => {
    for (const pair of event.pairs) {

      if(CollisionController.isInCollision(pair, "bullet")) {
        CollisionController.findAndDamageWorm(pair, game, sound); 
        CollisionController.createExplosion(pair, game, img);
      }
      else if (CollisionController.isInCollision(pair, "bullet"), CollisionController.isInCollision(pair, "lava"))
      {CollisionController.lavaCollision(pair,game)}
    }
  }
}
module.exports = CollisionController;
