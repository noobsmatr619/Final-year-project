import io from 'socket.io-client';

export const socket = io('http://localhost:5000');
// export const socket = io('https://dmcerp.herokuapp.com');


// interchanging between local and and production socket services 
