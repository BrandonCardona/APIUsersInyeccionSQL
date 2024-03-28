import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import HttpStatus from './controller/user.controller.js';
import userRoutes from './route/user.route.js';
import logger from './util/logger.js';



dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());


app.use('/users', userRoutes);

app.get('/', (req, res)=>{
    res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'User API, V1.0.0'));
});
app.all('*', (req, res)=>{
    res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server'));
});
// console.log(process.env);
app.listen(PORT, ()=> {logger.info(`Server running on: ${ip.address()}:${PORT}`)});

