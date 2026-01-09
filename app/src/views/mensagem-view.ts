/*
View responsável pela mensagem de feedback ao usuário
*/
import { View } from './view.js';

export class MensagemView extends View<string> {

    protected template(model: string): string {
        return `
            <p class="alert alert-info">${model}</p>
        `
    }
}