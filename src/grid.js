
function Grid(width, height, drawingElement = 'code') {
    PubSub.call(this);
    this.width = width;
    this.height = height;
    this.environment = new Array(width * height).fill(" ").map((sq, index) => this.isEdge(index) ? "#" : sq );
    this.drawingElement = drawingElement;
    this.environment;
}

Grid.prototype = Object.create(PubSub.prototype);
Grid.prototype.constructor = Grid;

Grid.prototype.isEdge = function(index) {
    return index % this.width ===  0 + this.width - 1 || index < this.width || index > this.height * this.width - this.width || index % this.width === 0; 
}

Grid.prototype.draw = function() {
   let result = this.environment.map((sq, index) => {
        if(index % this.width === 0){
            return `\n#`;
        }
        if(index % this.width ===  0 + this.width - 1 || index < this.width || index > this.height * this.width - this.width ){
            return ` #`;
        }
        return ` ${sq}`;
    }).join("");
   document.getElementById(this.drawingElement).innerHTML = result; ///
}

Grid.prototype.getIndexFromVector = function (vector) {
    return vector.x + (vector.y * this.width);
}

Grid.prototype.getSquare = function (vector) {
    return this.environment[this.getIndexFromVector(vector)];
}

Grid.prototype.setSquare = function (vector, value) {
    if(this.isEdge(this.getIndexFromVector(vector))){
        return;
    }
    this.environment[this.getIndexFromVector(vector)] = value;
}

Grid.prototype.contains = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
           vector.y >= 0 && vector.y < this.height;
  };