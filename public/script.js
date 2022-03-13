const socket=io();

$('#chatting').hide();

$('#send-btn').click(function(){
    const msgText=$('#inp-msg').val();
    socket.emit('send-msg',{ // socket msg ko emit kr dega
        msg:msgText
    });
    $('#inp-msg').val("");
})
socket.on('recieved-msg',(data)=>{
    $('#chat').append(`<li> <strong> ${data.user}</strong>: ${data.msg}</li>`);
    $("#chat-box").scrollTop($("#chat-box").outerHeight()); // jquery function so that scroll bottom m hi rhe
});


$('#login-btn').click(function(){
    const user=$('#login-inp').val();
    socket.emit('login',{
        user:user
    })
    $('#login-inp').val("");
    $('#login').hide();
    $('#chatting').show();
});
