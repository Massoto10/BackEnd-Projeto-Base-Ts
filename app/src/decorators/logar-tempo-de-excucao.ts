/*
Decorator que registra o tempo de execução de um método
PADRÃO milissegundo
Declarar como true [Ex. logarTempoDeExecucao(true)] para executar em segundos
*/

export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor)
        {
            const metodoOriginal = descriptor.value;

            descriptor.value = function(...args: Array<any>){
                let divisor = 1;
                let unidade = 'milissegundo';

                if(emSegundos){
                    divisor = 1000;
                    unidade = 'segundos';
                }

                //perfomance.now para medir o tempo de execução
                const t1 = performance.now();
                const retono = metodoOriginal.apply(this, args);
                const t2 = performance.now();

                console.log(`${propertyKey}, Executou em: ${(t2 - t1)/divisor} ${unidade}.`);
                return retono;
            };

            return descriptor;
        }

}