const channel = io('http://localhost:3000/channel') // after port we write namespace
channel.on('connect', () => {
    console.log('connected');
    channel.emit('list', { message: 'send channel list' })
    channel.on('list', (data) => {
        console.log(data);
    })
})
