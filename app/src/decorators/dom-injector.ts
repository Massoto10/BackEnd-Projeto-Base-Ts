/*
Decorator que busca no DOM o elemento do seletor (Id ou Class) informado
E com o getter injeta o elemento na propriedade da classe
Evita repetição de códigos de busca no DOM
*/ 

export function domInjector(seletor: string) {
    return function(target: any, propertyKey:string){
        console.log(`Modificando o prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertyKey} com o seletor ${seletor}`);
        
    let elemento:HTMLElement;

        const getter = function() {
            if (!elemento){
                elemento = <HTMLElement>document.querySelector(seletor);
                console.log(`Buscando elemento do DOM como o seletor ${seletor} para injetar em ${propertyKey}`);
            }
            
            return elemento;
        }

        Object.defineProperty(target, propertyKey, {get: getter});
    }
}