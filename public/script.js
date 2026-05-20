const socket = io();

// MODAL
let btn = document.getElementById('btn_post');

let modal = document.getElementById("myModal");

let span = document.getElementsByClassName("close")[0];

// ABRIR
btn.addEventListener('click', function (event) {

    event.preventDefault();

    modal.style.display = "block";

});

// FECHAR
span.addEventListener('click', function(event){

    modal.style.display = "none";

});

// RENDERIZAR
function renderMessage(message){

    $('.posts_container').prepend(`

        <div class="post_container">

            <h3>${message.titulo}</h3>

            <p>${message.postagem}</p>

        </div>

    `);

}

// POSTS ANTIGOS
socket.on('previousMessage', function(messages){

    for(message of messages){

        renderMessage(message);

    }

});

// NOVO POST
socket.on('receivedMessage', function(message){

    renderMessage(message);

});

// ENVIAR POST
$('#frm_post').submit(function(event){

    event.preventDefault();

    let titulo = $('#txt_titulo').val();

    let postagem = $('#txt_post').val();

    if(titulo.length && postagem.length){

        let messageObject = {

            titulo: titulo,

            postagem: postagem

        };

        socket.emit('sendMessage', messageObject);

        $('#txt_titulo').val('');

        $('#txt_post').val('');

        modal.style.display = "none";

    }

});