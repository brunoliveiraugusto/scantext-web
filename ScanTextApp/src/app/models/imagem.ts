import { Linguagem } from "./linguagem";

export class Imagem {
    id: string;
    nome: string;
    size: number;
    formato: string;
    base64: string;
    texto: string;
    linguagem: Linguagem;
}