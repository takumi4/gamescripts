/**
 * @scene Victory
 *
 */
Crafty.scene('Victory', function(){
    Crafty.e('2D, DOM, Text')
    .attr({x:0, y:0})
    .text('Victory!');

    this.restart_game = this.bind('KeyDown', function(){
        Crafty.scene('Game');
    });

}, function(){
    this.unbind('KeyDown', this.restart_game);
});
