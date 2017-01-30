import express from 'express';

const server = express();
const SERVER_MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    console.log(`server running on ${SERVER_MODE}`);
});

server.get('/', (req, res) => {
    res.send('Hello');
});