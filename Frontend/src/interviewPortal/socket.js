import {io} from 'socket.io-client';
const socket=io('http://localhost:3001')
socket.on('connect',()=>{
    console.log();
    console.log('Connected');
  })
  socket.on('disconnect',()=>{
    console.log('Disconnected');
  })
export default socket;