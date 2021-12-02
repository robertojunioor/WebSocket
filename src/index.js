import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(__dirname + '/public'));

io.on('connect', (socket) =>{
    io.to(socket.id).emit({
        status: true,
        message: "Conexão estabelecida com o servidor"
    });

     //Fazendo uma requisão do server aonde "teste" se referencia a rota
    socket.on('teste', (res) =>{
        console.log('MENSAGEM RECEBIDA', res);

        //Enviando a mensagem em broadCast Ou seja, todo mundo vai receber a mensagem.
       socket.broadcast.emit('teste', res);
    })
})

app.get('/',(req, res) =>{
    res.render('index.html');
});


server.listen(3333, () =>{
    
});
