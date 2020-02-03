"use strict"

Point.move = function(offset, direction) {
    switch (direction) {
        case Direcrion.LEFT:
            this.x -= offset;
            break;
        case Direcrion.RIGHT:
            this.x += offset;
            break;
        case Direcrion.UP:
            this.y -= offset;
            break;
        case Direcrion.DOWN:
            this.y += offset;
    }
}
Point.clear = function() {
    this.color = "black";
    this.draw();
}

Point.isHit = function(point) {
    return point.x === this.x && point.y === this.y;
}

Figure.draw = function() {
    this.list.forEach(function(item) {
        item.draw();
    });
}

Snake.move = function() {
    let tail = this.list.shift();
    let head = this.getNextPoint();
    this.list.push(head);
    tail.clear();
    head.draw();
}

Snake.getNextPoint = function() {
    let head = this.list[this.list.length - 1];
    let nextPoint = new Point(head.x, head.y, head.color);
    nextPoint.move(1, this.direction);
    return nextPoint;
}

Snake.handleKey = function(key) {
    switch (key) {
        case "ArrowLeft":
            if (snake.direction != Direcrion.RIGHT){
                snake.direction = Direcrion.LEFT;
            }
            break;
        case "ArrowRight":
            if (snake.direction != Direcrion.LEFT){
                snake.direction = Direcrion.RIGHT;
            }
            break;
        case "ArrowUp":
            if (snake.direction != Direcrion.DOWN){
                snake.direction = Direcrion.UP;
            }
            break;
        case "ArrowDown":
            if (snake.direction != Direcrion.UP){
                snake.direction = Direcrion.DOWN;
            }
            break;
        case "Enter":
            if (!play) {
                theGame = setInterval(running, 100);
                play = true;
            }
            break;                
        case "Escape":
            clearInterval(theGame);
            play = false;
    }
}

Snake.eat = function(food) {
    let head = this.getNextPoint();
    if (head.isHit(food)) {
        food.color = head.color;
        this.list.push(food);
        return true;
    } else {
        return false;
    }
}

Snake.isHit = function(figure) {
    let head = this.list[this.list.length - 1];
    for (let point of figure.list) {
        if (point.isHit(head)) {
            return true;
        }
    }
    return false;
}


Snake.isHitTale = function() {
    let head = this.list[this.list.length - 1];
    for (let i = 0; i < this.list.length - 2; i++) {
        if (head.isHit(this.list[i])) {
            return true;
        }
    }
    return false;
}

FoodCreator.createFood = function(snake) {
    let isSnake = true;
    let food;
    while(isSnake) {
        isSnake = false;
        let x = Math.round(Math.random() * (this.mapWidth - 1)) + 1;
        let y = Math.round(Math.random() * (this.mapHeight - 1)) + 1;
        food = new Point(x, y, this.color);
        for (let point of snake.list) {
            if (food.isHit(point)) {
                isSnake = true;
                break;
            }
        }
    }

    return food;
}

function wallsDraw(that) {
    for (let wall of that.list) {
        wall.draw();
    }
}

Walls.isHit = function(snake) {
    for (let wall of this.list) {
        if (snake.isHit(wall)) {
            return true;
        }
    }
    return false;
}

function running() {
    let start = new Date;
    if (walls.isHit(snake) || snake.isHitTale()) {
        clearInterval(theGame);
        play = false;
        steps = 0;
        alert("Game over!!!");
        refreshField();
    }
    if (snake.eat(food)) {
        steps += 1;
        document.getElementById("steps").innerHTML = `You eat ${steps} things`;
        food = foodCreator.createFood(snake);
        food.draw();
    } else {
        snake.move();
    }
    document.getElementById("cicle").innerHTML = `ping = ${Date.now() - start} ms`;
}