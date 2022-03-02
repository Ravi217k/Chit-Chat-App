const socket = io("http://localhost:8080");

//get DOM elements in different variables.
const form=document.getElementById('send-container');
const messageinp=document.getElementById('messageinp');
const messagecontainer=document.querySelector(".container");

//taking name of the new user.
const myname=prompt("Enter your name to join");
socket.emit('new-user-joined',myname);

//audio that will play on receiving messages.
var audio=new Audio('ting.wav');


//sending message as per the event
const append=(message,position)=>{
 const messageElement=document.createElement('div');   
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messagecontainer.append(messageElement);
if(position=='left')
setTimeout(() => {
    audio.play();          
  }, 100)
}

//if new user joins
socket.on('user-joined',name=>{
append(`${name} joined the chat`,'right');
});

//if new message is typed/submitted
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message= messageinp.value;
  append(`You: ${message}`,'right');
  socket.emit('send',message);
  messageinp.value='';
});

//if message is received
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
});

//if anyone leaves the chat
socket.on('left',name=>{
    append(`${name} left the chat`,'right');
})