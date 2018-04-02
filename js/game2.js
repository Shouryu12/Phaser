
var Game = {};


Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet2.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png');
   // game.load.spritesheet('button', 'assets/sprites/basic-buttons-pack.png', 193, 71);
};
//var button;
Game.create = function(){
    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(Game.getCoordinates, this);
    Client.askNewPlayer();
  //  button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

   
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.addText = function(text){
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    text = game.add.text(0, 0, text, style);
};

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}
function actionOnClick () {

    console.log("Baby, you're all that I want When you're lyin' here in my arms I'm findin' it hard to believe We're in heaven");
    //background.visible =! background.visible;

}


