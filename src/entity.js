function Entity(grid) {
    this.avatar = " @ ";
    this.grid = grid;
    this.sad = 0; //if it reaches 100; they commit suicide
    this.hungry = 0;
    this.sadMod = .81; //arbitrary
    this.alive = true;
    this.lifespan = 70;
    this.X = 0;
    this.Y = 0;
    this.moveX = 1;
    this.moveY = 1;
    this.startX = 2;
    this.startY = 3;
    this.meet = false;
    this.ate = false;
    this.meal = "";
    this.reproductiveChance = Math.random() * 2;
    this.checkSurroundings = function (element) {
        return grid[this.X + 1][this.Y] === element ||
            grid[this.X - 1][this.Y] === element ||
            grid[this.X][this.Y + 1] === element ||
            grid[this.X][this.Y - 1] === element ||
            grid[this.X + 1][this.Y + 1] === element ||
            grid[this.X - 1][this.Y - 1] === element ||
            grid[this.X - 1][this.Y + 1] === element ||
            grid[this.X + 1][this.Y - 1] === element;
    }
    this.die = function () {
        this.alive = false;
        this.avatar = " † "
        this.moveX = 0;
        this.moveY = 0;
        this.sadMod = 0;
    }
    this.commitSucide = function () {
        this.die();
        this.sad = "/Commited suicide/"
    }
    this.starve = function () {
        this.die();
        this.hungry = "/Starved/";
        this.ate = true;
    }
    this.naturalCauses = function () {
        this.die();
        this.hungry = "/Old age/"
        this.sad = "/Old age/"
    }
    this.morale = function () {
        if (this.sad === "/Commited suicide/") {
            return;
        }

        if (this.checkSurroundings(" † ")) {
            this.sad += Math.random() * 9;
        }

        if (!this.checkSurroundings(this.avatar) && !this.meet) {
            this.sad += Math.random() * 3 * this.sadMod;
        }

        this.sad -= Math.random() * this.sadMod;

        this.sad = this.sad >= 0 ? this.sad : 0;

        if (this.sad > 100) {
            this.commitSucide();
        }
    };
    this.age = function () {
        if (this.lifespan <= 0){
            this.naturalCauses();
        }
        this.lifespan -= Math.random();
    }
    this.hunger = function () {
        if (this.hungry === "/Starved/") {
            return;
        }

        if (!this.ate) {
            this.hungry += Math.random() * 6 * this.sadMod;
        }

        if (this.meal) {
            this.hungry -= this.meal.satiety;
        }

        this.hungry = this.hungry >= 0 ? this.hungry : 0;

        this.ate = this.hungry === 0;

        if (this.hungry > 100) {
            this.starve();
        }
    };

    this.begin = function () {
        this.X = this.startX;
        this.Y = this.startY;
        this.grid[this.X][this.Y] = this.avatar;
    };
    this.update = function () {
        if (!this.alive) {
            console.log("Sadness: " + this.sad + " Hunger: " + this.hungry);
            document.getElementById('data').innerHTML += "Sadness: " + this.sad + " Hunger: " + this.hungry + "<br>"
            return;
        }

        this.hunger();
        this.morale();
        this.age();

        var signX, signY;

        if (Math.random() > 0.5) {
            signX = 1;
        } else {
            signX = -1;
        }

        if (Math.random() > 0.5) {
            signY = 1;
        } else {
            signY = -1;
        }
    
        console.log("Sadness: " + this.sad + " Hunger: " + this.hungry);
        document.getElementById('data').innerHTML += "Sadness: " + this.sad + " Hunger: " + this.hungry + "<br>"

        grid[this.X][this.Y] = "   "

        if (this.X + signX != grid.length - 1 && this.X + signX != 0) {
            this.X += this.moveX * signX;
        }

        if (this.Y + signY != grid.length - 1 && this.Y + signY != 0) {
            this.Y += this.moveY * signY;
        }


        grid[this.X][this.Y] = this.avatar;
    };

}