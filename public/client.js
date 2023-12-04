const socket = io();


// prompt
let username;
do {
    username = prompt("Enter your Username")
    
} while (!username);

const input = document.querySelector('input');
const chat_area = document.getElementById('chat-area');
const userName = document.getElementById('userName');
const note = document.getElementById('note');
const total_users_online = document.getElementById('total_users_online');



userName.innerHTML = `Welcome!! ${username} `;
note.style.color = "red"
note.innerHTML = "Note: You can chat with the joined members anonymously";


socket.on('total_users_online',(val)=>{
    total_users_online.innerHTML = `Online Users : ${val}`
})


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