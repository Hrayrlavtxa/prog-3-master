const LivingCreature = require("./LivingCreature")
const random = require("./random");

module.exports = class Flash extends LivingCreature {
  constructor(x, y, index) {
    super(x, y, index)
    this.energy = 8;
    this.directions = [];
  }

  getNewCoordinates() {
    this.directions = [
      [this.x, this.y - 1], ,
      [this.x, this.y + 1],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates()
    return super.chooseCell(character)
  }

  mul() {
    var newCell = random(this.chooseCell(1));
    if (newCell) {
      var newflash = new Flash(newCell[0], newCell[1], this.index);
      flashArr.push(newflash);
      matrix[newCell[1]][newCell[0]] = 2;
    }
  }

  eat() {
    let foods = this.chooseCell(1)
    foods.push(...this.chooseCell(2))
    foods.push(...this.chooseCell(3))
    let food = random(foods)
    if (food) {
      matrix[this.y][this.x] = 0
      let newX = food[0]
      let newY = food[1]
      matrix[food[1]][food[0]] = 0
      this.x = newX
      this.y = newY
      for (var i in grassArr, predatorArr, grassEaterArr) {
        if (newX == grassArr[i].x && newY == grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        } else if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        } else if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
          predatorArr.splice(i, 1);
          break;
        }
      }
      if (this.energy > 12) {
        this.mul()
      }
    } else {
      this.move()
    }
  }

  move() {
    this.energy--
    let emptyCells = this.chooseCell(0)
    let newCell = random(emptyCells)
    if (newCell) {
      let newX = newCell[0]
      let newY = newCell[1]
      matrix[this.y][this.x] = 0
      matrix[newY][newX] = 2
      this.x = newX
      this.y = newY
    }

  }

  die() {
    matrix[this.y][this.x] = 0;
    for (var i in grassEaterArr) {
      if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
        grassEaterArr.splice(i, 1);
        break;
      }
    }
  }
}