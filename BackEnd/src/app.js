import express from 'express';
import {
    Estatisticas,
    CalcularContas,
    Graficos,
    SimularProcesso, 
    ResultadoEquacao } from '../controllers/test.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const server = express()
server.use(cors());
server.use(express.json());

server.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy!' });
});
server.post('/estatisticas', Estatisticas)
server.post('/calcular-contas', CalcularContas)
server.post('/graficos', Graficos)
server.post('/simular-processo', SimularProcesso)
server.get('/solve',ResultadoEquacao)


server.listen(4000,()=>{
    console.log("Server On !")
})