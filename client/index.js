const socket = io('http://localhost:3000')
const messages = []
socket.on('connect', () => {
    console.log('connected');
    socket.emit('ping', { message: 'hello from js' })
    socket.on('pong', (data) => {
        console.log(data.message);
    })
})
socket.on('client-chat', (data) => {
    const {message: msg,roomName,user,time} = data;
    const message = `<div class="${username == user.username ? 'message user' : 'message' }">
                <div class="message-content">
                    ${msg}
                </div>
            </div>`;
    messages.push(message)
    document.querySelector('#msg-div').innerHTML = messages.join('')
})
const username = prompt('username', 'realwerewolf')
const roomName = prompt('please enter room-name', 'nodejs')
const inputMsg = document.querySelector('#msg-input')
const sendBtn = document.querySelector('#send-btn')
const usernameTag = document.querySelector('#username')
if (username) {
    usernameTag.innerHTML = username
} else alert('please enter username')
sendBtn.addEventListener('click', () => {
    if (roomName && username) {
        socket.emit('join-room', {
            roomName,
            user: {
                socketId: socket.id,
                username
            }
        })
        socket.emit('server-chat', {
            roomName,
            user: {
                socketId: socket.id,
                username
            },
            time: new Date().getTime().toString(),
            message: inputMsg.value
        })
    }
})
socket.on('exception', (data) => {
    console.log(data);
})
