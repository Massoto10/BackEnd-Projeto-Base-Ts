import { ModeloInterfaces } from '../interfaces/modelo-interfaces.js';
import { Negociacao } from './negociacao.js';

export class Negociacoes implements ModeloInterfaces<Negociacoes> {
    // instancia negociações como um array do tipo Negociação
    private negociacoes: Array<Negociacao> = [];

    // adciona negociação ao array
    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    // retorna um readonly do array de negociações
    public lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    // método prepara a saída dos consoles com os dados das negociações
    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2);
    }

    // Compara as negociações em busca de duplicidade
    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());
    }
}
