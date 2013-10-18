/**
 * @component Grid
 *
 */
Crafty.c('Grid', {
    init: function(){
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        });
    },

    at: function(x, y){
        if( !x && !y){
            return {
                x: this.x / Game.map_grid.tile.width,
                y: this.y / Game.map_grid.tile.height
            };
        }else{
            this.attr({
                x: x * Game.map_grid.tile.width,
                y: y * Game.map_grid.tile.height
            });
            return this;
        }
    }
});


