/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
var movement = function(spaces){
    return spaces;
}
var movePlayerSpaces = function(spaces){
    console.log("Cliente esta andando pra valer as " +spaces+" casas");
}
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y){
  Client.socket.emit('click',{x:x,y:y});
  //Client.socket.emit('moveSpaces',{spaces:movement(3)});
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){
        Game.movePlayer(data.id,data.x,data.y);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
    Client.socket.on('moveSpacesResponse',function(data){
        console.log("errr");
        movePlayerSpaces(data.space);
    });
    
});







