/**
 * @scene Game
 *
 */
Crafty.scene('Game', function(){

    this.occupied = new Array(Game.map_grid.width);

    for(var x=0; x<Game.map_grid.width; x++){
        this.occupied[x] = new Array(Game.map_grid.height);
        for(var y=0; y<Game.map_grid.height; y++){
            this.occupied[x][y] = false;
        }
    }

    this.player = Crafty.e('PlayerCharacter').at(5, 5);
    this.occupied[this.player.at().x][this.player.at().y] = true;




    for(var x=0; x<Game.map_grid.width; x++){
        for(var y=0; y<Game.map_grid.height; y++){
            var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

            if(at_edge){
                Crafty.e('Tree').at(x, y);
                this.occupied[x][y] = true;

            }else if(Math.random() < 0.26 && !this.occupied[x][y]){
                Crafty.e('Bush').at(x, y);
                this.occupied[x][y] = true;
            }
        }

    }

    max_villages = 5;
    for(var x=0; x<Game.map_grid.width; x++){
        for(var y=0; y<Game.map_grid.height; y++){
            if(Math.random() < 0.02){

                if(Crafty('Village').length < max_villages && !this.occupied[x][y]){
                    Crafty.e('Village').at(x, y);
                    //this.occupied[x][y] = true;
                }
            }
        }
    }

    this.show_visited = this.bind('VillageVisited', function(){
        if(!Crafty('Village').length){
            Crafty.scene('Victory');
        }
        return;
        if(Crafty('Village').length){
            Crafty.scene('God');
        }else{
            Crafty.scene('Victory');
        }
    });

}, function(){
    this.unbind('VillageVisited', this.show_visited);
});
