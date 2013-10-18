/**
 * @component PlayerCharacter
 *
 */
Crafty.c('PlayerCharacter', {
    init: function(){
        this.requires('Actor, Fourway, Color, Collision')
        .fourway(4)
        .color('rgb(20, 75, 40)')
        .stopOnSolids()
        .onHit('Village', this.visitVillage);
    },

    stopOnSolids: function(){
        this.onHit('Tree', this.stopMovement);
        this.onHit('Bush', this.stopMovement);
        return this;
    },

    stopMovement: function(){
        console.log(arguments);
        this._speed = 0;
        if(this._movement){
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    },

    visitVillage: function(data){
        village = data[0].obj;
        village.visited();
    }

});

