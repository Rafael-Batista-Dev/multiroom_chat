//Importar as configuraçoes do servidor
var app = require("./config/server");

//Parametro da porta
var server = app.listen(80, function() {
  console.log("subiu");
});

var io = require("socket.io").listen(server);

//Varioavel global
app.set("io", io);

/* criar a conexão por websocket */
io.on("connection", function(socket) {
  console.log("Usuário conectou");

  socket.on("disconnect", function() {
    console.log("Usuário desconectou");
  });

  socket.on("msgServer", function(data) {
    /* dialogo */
    socket.emit("msgUser", {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

    socket.broadcast.emit("msgUser", {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

    /* participantes */
    if (parseInt(data.updete_apelido_cli) == 0) {
      socket.emit("grupoParticipantes", { apelido: data.apelido });

      socket.broadcast.emit("grupoParticipantes", {
        apelido: data.apelido
      });
    }
  });
});
