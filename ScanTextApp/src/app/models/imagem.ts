import { Linguagem } from "./linguagem";

export class Imagem {
    id: string;
    nome: string;
    size: number;
    formato: string;
    base64: string;
    texto: string;
    meanConfidence: number;
    linguagem: Linguagem;
    dataCadastro: Date;
    dataAtualizacao: Date;
    urlImagemBlob: string;
}
