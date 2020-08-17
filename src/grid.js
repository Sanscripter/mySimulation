function Grid(size, drawingElement = 'code') {
    
    this.size = size;

    this.drawingElement = drawingElement;
    
    this.isEdge = function(i, k, array){
        return i == 0 || k == 0 || i == array.length - 1 || k == array[i].length-1 
    }
    
    this.gridMaker = function(){
        let array = Array(this.size).fill(Array(this.size).fill("   "));
        return array.map((line, i) => {
            return line = line.map((char, k) => {
                return  this.isEdge(i, k, array) ? " # " : char;
            })
        })
    };
    
    this.arrays = this.gridMaker();
    
    this.raster = function(){
        return this.arrays.map((line) =>  line.join(''))
    };
    
    this.draw = function(){
        let result = '';
        myGrid.raster().map((line) => result += `\n ${line} ` );
        document.getElementById(myGrid.drawingElement).innerHTML = result;
    };
}
