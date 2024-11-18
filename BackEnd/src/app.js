import express from 'express'
import { exibirCalculo } from '../controllers/test.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const server = express()
server.use(cors());
server.use(express.json());


server.get('/userpalpite',exibirCalculo)


server.listen(4000,()=>{
    console.log("Server On !")
})