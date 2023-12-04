const socket = io();


// prompt
let username;
do {
    username = prompt("Enter your Username")
    
} while (!username);

const input = document.querySelector('input');
const chat_area = document.getElementById('chat-area');

input.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
        input.value = '';
    }

});


function sendMessage(message){

    let msg={
        username:username,
        message:message
    }

    // append
    // type 
    // 1. right
    // 2. left
    appendMessage(msg,'right');

    socket.emit('message',msg);
}

function appendMessage(message,type){

    const element = document.createElement('div');
    element.classList.add(type)

    let markup = 
    `
    
    <div class="username">${message.username}</div>
    <p class="message">${message.message}</p>

    `

    element.innerHTML = markup;
    chat_area.appendChild(element);


}


// Recieve broadcasted message

socket.on('message',(msg)=>{
   appendMessage(msg,'left')


})