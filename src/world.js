function World(topology, legend, width = 1, height = 1) {
    this.legend = legend;

    if(!topology.length){
        this.grid = new Grid(width, height);
        return;
    }

    this.grid = new Grid(topology.fisrt(), map.length);
    grid.map((sq, index) => topology[index])
    // map.forEach(function(line, y) {

    //     for (var x = 0; x < line.length; x++)
    //         grid.setSquare(new Vector(x, y), elementFromChar(legend, line[x]));
    // });
}
