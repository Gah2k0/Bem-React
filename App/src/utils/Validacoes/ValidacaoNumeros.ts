
export function validaNumeros(valor: string): boolean {
    const numeros = new RegExp('^[0-9]*$');
    return numeros.test(valor);
}


