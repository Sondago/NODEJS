const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 8080;

io.on("connection", socket => {
    console.log("a user connected :D");


    //PARTIE MESSAGES 

    //Reception d'un message et renvoie à l'utilisateur concerné
    socket.on("chatMessage", msg => {
        io.emit(msg.userConv, msg.data);
    });

    //Reception d'une conversation active et renvoie à l'utilisateur concerné
    socket.on('convEnabled', data => {
        io.emit(data.id, data.status);
    })
    
    //Reception d'une notification de message en cours et renvoie à l'utilisateur concerné
    socket.on('onWriting', data => {
        io.emit(data.id, data.status)
    })

    //Reception d'une fin de transmission d'un utilisateur et notifie l'utilisateur concerné
    socket.on('disconnect', id => {
        console.log('Utilisateur deconnecté')
        io.emit(id, false);
    });

    //PARTIE GROUPES

    //Reception d'un message dans un groupe et renvoie aux utilisateurs du groupe
    socket.on("chatMessageEventChat", msg => {
        io.emit(msg.userConv, msg.data);
    });

    //Reception d'un groupe active et renvoie aux utilisateurs du groupe
    socket.on('convEnabledEventChat', data => {
        io.emit(data.id, data.status);
    })

    //Reception d'une notification de message en cours et renvoie aux utilisateurs du groupe
    socket.on('onWritingEventChat', data => {
        io.emit(data.id, data.status);
    })


    //PARTIES JEU (TICTACTOE)
    socket.on('TicTacToe', data => {
        io.emit(data.id, data.data);
        console.log('TicTacToe receive = ' + data)
    })


    //PARTIES CHAT BAN

    //Action dans le chat
    socket.on('ChatBan', data => {
        io.emit(data.id, data.data);
        console.log('ChatBan Action Received');
    })

    //PARTIES NOUVEAUX CONTENUS
    socket.on('receivedNewContent', data => {
        io.emit('receivedNewContent', data);
        console.log('new Content Created');
    })

    //PARIES ANONYM 

    //Action dans le chat
    socket.on('ChatGroup', data => {
        io.emit(data.idGroup, data.data);
        console.log('ChatGroupAnonym Action Received');
        console.log('ChatGroup data = ', data);
    })
});

server.listen(port, () => console.log("server running on port:" + port));