export class ArquivoIdioma {
    arquivo: string;
    idIdioma: string;
    dataCadastro: Date;
    dataAtualizacao: Date;
    idUsuario: string;

    constructor() { 
        this.dataCadastro = new Date();
    }
}