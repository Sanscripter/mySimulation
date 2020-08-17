function Food(grid) {
    this.seedX = Math.random();
    this.seedY = Math.random();
    this.avatar = " * ";
    this.grid = grid;
    this.satiety = 2;
    this.lifespan = 8;
    this.alive = true;
    this.isBreeding = false;
    this.X = Math.ceil(this.seedX * this.grid.length) + 1;
    this.Y = Math.ceil(this.seedY * this.grid.length) + 1;
    this.sproutChance = Math.random();
    this.decay = function () {
        this.lifespan -= Math.random() * 3.5;
        if (this.lifespan <= 0) {
            this.alive = false;
            this.avatar = "   ";
        }
    };
    this.update = function () {
        if (!this.alive) {
            return;
        }
        this.isBreeding = Math.random() > .8 && this.lifespan <= 6;
        this.decay();
        this.grid[this.X][this.Y] = this.avatar;
    };
    this.begin = function () {
      
        if (this.X >= grid.length - 1) {
            this.X = this.grid.length - 2;
        }
        if (this.Y >= grid.length - 1) {
            this.Y = this.grid.length - 2;
        }

        this.grid[this.X][this.Y] = this.avatar;
    };
}