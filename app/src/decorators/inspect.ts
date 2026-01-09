/*
Decorator que registra informações da execução de um método (Útil para Debug)
Inspecionando: Método, Parâmetros e Retorno
*/

export function inspect(){
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor)
        {
            const metodoOriginal = descriptor.value;

            descriptor.value = function(...args: Array<any>){
                const retorno = metodoOriginal.apply(this, args);

                console.log(`--- Método: ${propertyKey}`);
                console.log(`--- Parâmetros: ${JSON.stringify(args)}`);
                console.log(`--- Retorno: ${JSON.stringify(retorno)}`);

                return retorno;
            }

            return descriptor;
        }
}