import { ModeloInterfaces } from "../interfaces/modelo-interfaces.js";


export class Negociacao implements ModeloInterfaces<Negociacao>{
    constructor(
        private _data: Date, 
        public readonly quantidade: number, 
        public readonly valor: number
    ) {
    }
    
    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    // método estático responsável por tratar os dados de entrada 
    // e instantciar um objeto do tipo Negociação
    public static trataDadosECriaNegociacao(dataString: string, quantidadeString: string, valorString: string): Negociacao {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    // método prepara a saída dos consoles com os dados da negociação
    public paraTexto(): string {
        return `
            Data: ${this.data}
            Quantidade: ${this.quantidade}
            Valor: ${this.valor}`;
    }

    // Compara as negociações em busca de duplicidade
    public ehIgual(negociacao: Negociacao): boolean {
        return  this.data.getDate() === negociacao.data.getDate() &&
                this.data.getMonth() === negociacao.data.getMonth() &&
                this.data.getFullYear() === negociacao.data.getFullYear();
    }
}