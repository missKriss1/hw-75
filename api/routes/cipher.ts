import {Mes} from "../types";
const Vigenere = require('caesar-salad').Vigenere;
import express, { Request, Response } from 'express';

const cipherRouter = express.Router();

cipherRouter.post('/encode', (req: Request, res: Response) => {
    const { message, password: password } = req.body as Mes;
    const vigCipher =   Vigenere.Cipher(password);
    const response = JSON.stringify({message: vigCipher.crypt(message)});
    res.send(response);
});

cipherRouter.post('/decode', (req: Request, res: Response) => {
    const { message, password: password } = req.body as Mes;
    const vigDecipher =   Vigenere.Cipher(password);
    const response = JSON.stringify({message: vigDecipher.crypt(message)});
    res.send(response);
});

export default cipherRouter;
