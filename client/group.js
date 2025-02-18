const group = io('http://localhost:3000/group') // after port we write namespace
group.on('connect', () => {
    console.log('connected');
    group.emit('list', { message: 'send group list' })
    group.on('list', (data) => {
        console.log(data);
    })
})
