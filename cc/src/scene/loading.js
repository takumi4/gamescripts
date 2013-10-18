/**
 * @scene Loading
 */
Crafty.scene('Loading', function(){
    Crafty.load(['assets/cc.png'], function(){
        Crafty.sprite(16, 'assets/cc.png', {
            spr_tree: [0,0],
            spr_flower: [1, 0],
            spr_taobao: [2, 0]
        });
        Crafty.scene('Game');
    });

    Crafty.e('2D, DOM, Text')
        .text('Loading')
        .attr({x:0, y: Game.height() / 2 - 24, w:Game.width()})
        .css($textCss);

}, function(){
});
