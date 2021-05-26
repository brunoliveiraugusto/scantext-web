export class ArquivoIdioma {
    arquivo: any[];
    siglaIdioma: string;
    dataCadastro: Date;
    dataAtualizacao: Date;
    idUsuario: string;

    constructor() { 
        this.dataCadastro = new Date();
    }
}