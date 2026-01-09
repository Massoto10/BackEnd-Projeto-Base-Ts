import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-excucao.js';
import { NegociacoesServices } from '../services/negociacoes-services.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { domInjector } from '../decorators/dom-injector.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { MensagemView } from '../views/mensagem-view.js';
import { Negociacoes } from '../models/negociacoes.js';
import { Negociacao } from '../models/negociacao.js';
import { inspect } from '../decorators/inspect.js';
import { imprimir } from '../utils/imprimir.js';

export class NegociacaoController {
    
    @domInjector('#data')
    private inputData: HTMLInputElement;
    
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    
    @domInjector('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();
    private negociacoesServices = new NegociacoesServices();

    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    //dregistra tempo de execução e parâmetros para debug.
    @logarTempoDeExecucao(true)
    @inspect()
    public adiciona(): void {

        const negociacao = Negociacao.trataDadosECriaNegociacao(
            this.inputData.value, 
            this.inputQuantidade.value,
            this.inputValor.value
        );

        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas');
            return ;
        }

        
        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizaView();
    }

    public importarDados(): void {
        this.negociacoesServices.obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {

                return negociacoesDeHoje.filter(negociacoesDeHoje => {
                    
                    // retorna true se não encontrar negociação igual na lista.
                    return !this.negociacoes.lista()
                    .some(negociacao => negociacao
                    .ehIgual(negociacoesDeHoje));
                })
            })
            .then(negociacoesDeHoje => {
                for (let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }

            this.negociacoesView.update(this.negociacoes);
            })
    }

    // valida se é dia útil (segunda a sexta)
    private ehDiaUtil(data: Date) {
        //getDay() retorna o dia da semana de 0 à 6, sendo 0 Domingo e 6 Sábado.
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
 
    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        //retorna o cursor para o campo data
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
