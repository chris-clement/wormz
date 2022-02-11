
class MoveController {
  static moveWorm = (activeWorm, input) => {
    if (Controller.moveCount >= Controller.moveLimit) {
      return;
    }
    switch(input) {
  
      case LEFT_ARROW: 
        activeWorm.move({ x: -0.1, y:0 }, 10)
        Controller.moveCount += 1;
        break;
      case RIGHT_ARROW: 
        activeWorm.move({ x: 0.1, y:0 }, 10)
        Controller.moveCount += 1;
        break;
      case UP_ARROW:
        activeWorm.move({ x: 0, y:-0.2 }, 10)
        Controller.moveCount += 1;
        break;
    }
    return false;
  }
}