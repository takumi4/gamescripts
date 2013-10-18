/**
 * @component Village
 *
 */
Crafty.c('Village', {
    init: function(){
        this.requires('Actor, Color')
        .color('rgb(170, 125, 40)');
    },

    visited: function(){
        this.destroy();
        //this.color('rgb(170, 125, 240)');
        Crafty.trigger('VillageVisited', this);
    }
});
