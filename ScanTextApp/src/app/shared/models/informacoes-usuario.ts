export class InformacoesUsuario {
    
    public perfilUsuario: string;
    public idUsuario: string;

    constructor() {
        this.obterPerfilUsuario();
        this.obterIdUsuario();
    }

    public obterPerfilUsuario(): void {
        try {
            this.perfilUsuario = JSON.parse(localStorage.getItem("token-scan")).role;
        } catch {
            console.log("Erro ao tentar obter o perfil do usuário logado.");
        }
    }

    public obterIdUsuario(): void {
        try {
            this.idUsuario = JSON.parse(localStorage.getItem("token-scan")).id;
        } catch {
            console.log("Erro ao tentar obter o id do usuário logado.");
        }
    }
}