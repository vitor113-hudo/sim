const express = require('express');

const http = require('http');

const path = require('path');

const { Server } = require('socket.io');

const {
    collection,
    addDoc,
    getDocs
} = require('firebase/firestore');

const db = require('./firebase');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

// LIBERA PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

// ROTA PRINCIPAL
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public/index.html'));

});

// SOCKET
io.on('connection', async (socket) => {

    console.log('Usuário conectado');

    // BUSCAR POSTS ANTIGOS
    const querySnapshot = await getDocs(
        collection(db, 'posts')
    );

    let posts = [];

    querySnapshot.forEach((doc) => {

        posts.push(doc.data());

    });

    socket.emit('previousMessage', posts);

    // RECEBER NOVO POST
    socket.on('sendMessage', async (data) => {

        const novoPost = {

            titulo: data.titulo,

            postagem: data.postagem,

            data: Date.now()

        };

        // SALVAR NO FIRESTORE
        await addDoc(
            collection(db, 'posts'),
            novoPost
        );

        // ENVIAR PARA TODOS
        io.emit('receivedMessage', novoPost);

    });

});

// SERVIDOR
server.listen(3000, () => {

    console.log('Servidor rodando...');

});