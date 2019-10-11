var socketclient=require("socket.io-client");
socketclient.connect("http://localhost:2000");
var readline=require("readline");
var reader =readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
var username;
var socket =socketclient.connect("http://localhost:2000");
reader.question("What is your name  :" , function(user) {       
    username=user;
    var message =`${user} has joined`
    socket.emit("message",message);
  });
  socket.on("notice",function(message){
      console.log(message);   //use multiple input for line event
  })
  reader.on("line",function(data){
      var message=`${username} : ${data}`;
    socket.emit("message",data); 
 });
 reader.on("line",function(data){
     //public
     //private
     //private name hello
     var sarr =data.split(" ");
     var kind =sarr[0];
     var message ={};
     if (kind === "private") {
         var reciever = sarr[1];
         message.data = `${username}:${sarr.slice(2).join(" ")}`;
         message.kind = "private";
         message.reciever = reciever;
     } else {
         message.data = `${username} :${data}`;
         message.kind = "public";
     }

     socket.emit("message", message);
 })