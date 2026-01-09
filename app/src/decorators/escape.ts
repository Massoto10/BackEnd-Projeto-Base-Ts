/* 
Decorator que escapa possíveis scripts maldosos evitando ataques XSS
Sinaliza a execução do decorator em console.
*/

export function escape(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
)
{
    const metodoOriginal = descriptor.value;

    descriptor.value = function(...args: Array<any>){
        let retorno = metodoOriginal.apply(this, args);
        
        if (typeof retorno === 'string') {
            console.log(`Escape em ação na classe ${this.constructor.name} método ${propertyKey}`);
            
            // Expressão regular para remover o conteúdo nas tags <script>.
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, '');
        
            return retorno
    }
    
    return descriptor;
    }
}