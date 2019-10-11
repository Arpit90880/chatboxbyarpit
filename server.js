var http=require("http");
var socketio=require("socket.io");
var server=http.createServer();
var socketServer= socketio(server);
socketServer.on("connect",function(socket){
    socket.on("message",function(data){
        //console.log(socket.id);
        //console.log(data);
        if (data.kind === "private") {
            socket.to(db[data.reciever]).emit("notice", data.data);
        } else {
            if (data.kind === "Joining") {
                db[data.user] = socket.id;
                var message = data.data;
            } else if (data.kind === "public") {
                var message = data.data;
            }
            socket.broadcast.emit("notice", message);
}
    });
});
server.listen(2000,function(){
    console.log("server is work");
});
