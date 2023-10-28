const LivingCreature = require("./LivingCreature")                                                                                                  
const random = require("./random");                                                                                                 
                                                                                                    
module.exports = class Bear extends LivingCreature {                                                                                                    
    constructor(x, y, index) {                                                                                                  
        super(x, y, index)                                                                                                  
        this.energy = 5;                                                                                                    
        this.directions = [];                                                                                                   
    }                                                                                                   
    getNewCoordinates() {                                                                                                   
        this.directions = [                                                                                                 
            [this.x - 1, this.y - 1],                                                                                                   
            [this.x, this.y - 1],                                                                                                   
            [this.x + 1, this.y - 1],                                                                                                   
            [this.x - 1, this.y],                                                                                                   
            [this.x + 1, this.y],                                                                                                   
            [this.x - 1, this.y + 1],                                                                                                   
            [this.x, this.y + 1],                                                                                                   
            [this.x + 1, this.y + 1]                                                                                                    
        ];                                                                                                  
    }                                                                                                   
    chooseCell(character) {                                                                                                 
        this.getNewCoordinates()                                                                                                    
        return super.chooseCell(character)                                                                                                  
    }                                                                                                   
    mul() {                                                                                                 
        var newCell = random(this.chooseCell(1));                                                                                                   
        if (newCell) {                                                                                                  
            var newBear = new Bear(newCell[0], newCell[1], this.index);                                                                                                 
            bearArr.push(newBear);                                                                                                  
            matrix[newCell[1]][newCell[0]] = 4;                                                                                                 
        }                                                                                                   
    }                                                                                                   
    eat() {                                                                                                 
        let foods = this.chooseCell(1, 2, 3)                                                                                                    
        let food = random(foods)                                                                                                    
        if (food) {                                                                                                 
            this.energy++;                                                                                                  
            matrix[this.y][this.x] = 0                                                                                                  
            let newX = food[0]                                                                                                  
            let newY = food[1]                                                                                                  
            matrix[food[1]][food[0]] = 4                                                                                                    
            this.x = newX                                                                                                   
            this.y = newY                                                                                                   
            for (var i of grassArr) {                                                                                                   
                if (newX == i.x && newY == i.y) {                                                                                                   
                    grassArr.splice(i, 1);                                                                                                  
                    break;                                                                                                  
                }                                                                                                   
                for (var i of grassEaterArr) {                                                                                                  
                    if (newX == i.x && newY == i.y) {                                                                                                   
                        grassArr.splice(i, 2);                                                                                                  
                        break;                                                                                                  
                    }                                                                                                   
                }                                                                                                   
                for (var i of predatorArr) {                                                                                                    
                    if (newX == i.x && newY == i.y) {                                                                                                   
                        predatorArr.splice(i, 3);                                                                                                   
                        break;                                                                                                  
                    }                                                                                                   
                }                                                                                                   
            }                                                                                                   
            if (this.energy > 6) {                                                                                                  
                this.mul()                                                                                                  
            }                                                                                                   
        }                                                                                                   
        else {                                                                                                  
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
            matrix[newY][newX] = 4                                                                                                  
            this.x = newX                                                                                                   
            this.y = newY                                                                                                   
        }                                                                                                   
                                                                                                        
        if (this.energy <= 0) {                                                                                                 
            this.die()                                                                                                  
        }                                                                                                   
    }                                                                                                   
    die() {                                                                                                 
        matrix[this.y][this.x] = 0;                                                                                                 
        for (var i in bearArr) {                                                                                                    
            if (this.x == bearArr[i].x && this.y == bearArr[i].y) {                                                                                                 
                bearArr.splice(i, 1);                                                                                                   
                break;                                                                                                  
            }                                                                                                   
        }                                                                                                   
    }                                                                                                   
}                                                                                                   
                                                                                                    
                                                                                                    