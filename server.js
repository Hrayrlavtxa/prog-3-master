const express = require("express");                           
const app = express();                                        
const server = require('http').Server(app);                   
const io = require('socket.io')(server);                      
                                                              
app.use(express.static("../prog-3-master"));                  
app.get("/", function (req, res) {                            
    res.redirect("index.html");                               
});                                                           
                                                              
server.listen(3001, function () {                             
    console.log("App is running on port 3000");               
});                                                           
                                                              
                                                              
const random = require("./random")                            
const Grass = require("./grass")                              
const GrassEater = require("./grasseater")                    
const Predator = require("./predator")                        
const Bear = require("./bear")                                
                                                              
                                                              
matrix = []                                                   
grassArr = []                                                 
grassEaterArr = []                                            
predatorArr = []                                              
bearArr = []                                                  
const n = 28                                                  
const m = 40                                                  
                                                              
for (let i = 0; i < n; i++) {                                 
    matrix.push([])                                           
    for (let g = 0; g < m; g++) {                             
        matrix[i].push(0)                                     
    }                                                         
}                                                             
                                                              
function createGame() {                                       
    function characters(index, count) {                       
        for (let a = 0; a < count; a++) {                     
            var v = Math.floor(random(n))                     
            var w = Math.floor(random(m))                     
            matrix[v][w] = index                              
        }                                                     
    }                                                         
    characters(1, 600)                                        
    characters(2, 200)                                        
    characters(3, 80)                                         
    characters(4, 20)                                         
    for (var y = 0; y < matrix.length; ++y) {                 
        for (var x = 0; x < matrix[y].length; ++x) {          
            if (matrix[y][x] === 1) {                         
                var gr = new Grass(x, y, 1);                  
                grassArr.push(gr);                            
            }                                                 
            else if (matrix[y][x] === 2) {                    
                var grEa = new GrassEater(x, y, 1);           
                grassEaterArr.push(grEa);                     
            }                                                 
            else if (matrix[y][x] === 3) {                    
                var pre = new Predator(x, y, 3);              
                predatorArr.push(pre);                        
            }                                                 
            else if (matrix[y][x] === 4) {                    
                var be = new Bear(x, y, 3);                   
                bearArr.push(be);                             
            }                                                 
        }                                                     
    }                                                         
}                                                             
                                                              
function drawGame() {                                         
    for (var i in grassArr) {                                 
        grassArr[i].mul();                                    
    }                                                         
    for (var i in grassEaterArr) {                            
        grassEaterArr[i].eat();                               
    }                                                         
    for (var i in predatorArr) {                              
        predatorArr[i].eat();                                 
    }                                                         
    for (var i in bearArr) {                                  
        bearArr[i].eat();                                     
    }                                                         
    io.emit("matrix", matrix)                                 
}                                                             
                                                              
createGame()                                                  
                                                              
let intervalID;                                               
                                                              
function startGame() {                                        
    clearInterval(intervalID)                                 
    intervalID = setInterval(() => {                          
        drawGame()                                            
    }, 200)                                                   
}                                                             
                                                              
io.on("connection", (socket) => {                             
    socket.emit("matrix", matrix)                             
    startGame()                                               
})                                                            
                                                              