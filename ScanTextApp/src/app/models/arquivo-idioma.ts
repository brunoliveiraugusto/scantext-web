export class ArquivoIdioma {
    id: string;
    arquivo: string;
    idIdioma: string;
    dataCadastro: Date;
    dataAtualizacao: Date;
    idUsuario: string;
    nomeArquivoBlob: string;
    urlArquivoBlob: string;

    constructor() { 
        this.dataCadastro = new Date();
    }
}