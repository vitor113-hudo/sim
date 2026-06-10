const socket = io();

// MODAL
let modal = document.getElementById("myModal");

let btn = document.getElementById('btn_post');

let span = document.getElementsByClassName("close")[0];

function renderMessage(message){

    $('.posts_container').prepend(`

        <div class="post_container">

            <h3>${message.titulo}</h3>

            <p>${message.postagem}</p>

        </div>

    `);

}

// NOVO POST
socket.on('receivedMessage', function(message){

    renderMessage(message);

});

// POSTS ANTIGOS
socket.on('previousMessage', function(messages){

    for(message of messages){

        renderMessage(message);

    }

});

// FECHAR
span.addEventListener('click', function(event){

    modal.style.display = "none";

});

// ABRIR
btn.addEventListener('click', function(event){

    event.preventDefault();

    modal.style.display = "block";

});

// postar
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