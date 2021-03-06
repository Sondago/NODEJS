const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  // ...
});
io.on("connection", socket => {
    console.log("a user connected :D = ");


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
    socket.on('GroupMessage', data => {
        io.emit(data.id, data.data);
        console.log('GroupMessage data = ', data);
    })

    //Connexion dans un groupe
    socket.on('GroupConnect', data => {
        io.emit(data.id, data.data);
        console.log('GroupConnect data = ', data);
    })

    //Deconnexion dans un groupe
    socket.on('GroupDisconnect', data => {
        io.emit(data.id, data.data);
        console.log('GroupDisconnect data = ', data);
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

    //Nouveaux contenus dans la catégorie age
    socket.on('receivedNewAgeContent', data => {
        io.emit('receivedNewAgeContent', data);
        console.log('new Content Created age', data);
    })

    //Partie Chat Secret
    socket.on('SecretChat', data => {
        io.emit('SecretChat', data.data);
        console.log('Secret Chat Action Received');
        console.log('Secret Chat sended data = ', data);
    })


    //PARTIE NIGHTROOM

    //Action dans le chat
    socket.on('NightRoom', data => {
        io.emit(data.id, data.data);
        console.log('NightRoom Action Received', data);
    })

    //PARIE ANONYM 

    //Action dans le chat
    socket.on('ChatGroup', data => {
        io.emit(data.idGroup, data.data);
        console.log('ChatGroupAnonym Action Received');
        console.log('ChatGroup data = ', data);
    })

    //Action dans une conversation
    socket.on('ChatConversation', data => {
        io.emit(data.idUserToSend+'-chat', data.data);
        console.log('ChatConversation Action Received');
        console.log('ChatConversation sended data = ', data);
    })
});

httpServer.listen(8080, () => console.log("server running"));