/**
 * @component PlayerCharacter
 *
 */
Crafty.c('PlayerCharacter', {
    init: function(){
        this.requires('Actor, Fourway, Color, Collision, spr_taobao')
        .fourway(4)
        .color('rgba(1,1,1,0)')
        .onHit('Village', this.visitVillage)
        .stopOnSolids();
    },

    stopOnSolids: function(){
        this.onHit('Actor', this.stopMovement);
        return this;
    },

    stopMovement: function(){
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

