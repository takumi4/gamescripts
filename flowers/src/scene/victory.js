/**
 * @scene Victory
 *
 */
Crafty.scene('Victory', function(){
    Crafty.e('2D, DOM, Text')
    .attr({x:0, y:Game.height() / 2 - 24, w: Game.width()})
    .text('Victory!')
    .css($textCss);

    this.restart_game = this.bind('KeyDown', function(){
        Crafty.scene('Game');
    });

}, function(){
    this.unbind('KeyDown', this.restart_game);
});
